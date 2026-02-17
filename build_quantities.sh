#!/bin/sh

set -e

generateQuantityTraining() {
  cpus=$(nproc)

  echo "Generating quantity training images."
  cd trainer
  find quantities -type f | xargs -P$cpus rm
  rm -r quantities || true
  mkdir quantities

  pipenv clean
  pipenv install

  pipenv run python generate_quantities.py | xargs -L1 -P$cpus magick -limit thread 1

  echo "Copying each training png to jpg."
  find quantities/* -type d | xargs -I@ -n1 -P$cpus sh -c "cd @; magick mogrify -quality 89 -format jpg -strip *.png"

  cd ..
}

buildClassifier() {
  echo "Building quantity classifier."
  cd trainer
  pipenv clean
  pipenv install

  [ -e /usr/lib/wsl/lib/libcuda.so ] && export LD_LIBRARY_PATH=/usr/lib/wsl/lib
  if [ -e $CONDA_PREFIX/lib/ ]
  then
    export LD_LIBRARY_PATH=$CONDA_PREFIX/lib
    export XLA_FLAGS=--xla_gpu_cuda_data_dir=$CONDA_PREFIX
  fi

  CUDNN_PATH=$(dirname $(pipenv run python -c "import nvidia.cudnn;print(nvidia.cudnn.__file__)"))
  export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$CUDNN_PATH/lib
  export TF_FORCE_GPU_ALLOW_GROWTH=true

  rm -r quantity-model-tf || true
  pipenv run python train_quantity.py 0.20 0.005 quantities/

  echo "Training complete, assembling results."
  rm -r ../includes/quantities || true
  mkdir -p ../includes/quantities
  mv class_names.json ../includes/quantities/class_names.json

  cd convert
  pipenv clean
  pipenv install
  pipenv run tensorflowjs_converter --input_format tf_saved_model --output_format=tfjs_graph_model ../quantity-model-tf ../../includes/quantities
  cd ..

  pipenv run python sort_json.py ../includes/quantities/model.json

  cd ..
}

generateQuantityTraining
buildClassifier

