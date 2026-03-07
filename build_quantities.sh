#!/bin/sh

set -e

if [ -z "${1}" ]
then
  echo 'Expecting 1 argument with path to Foxhole font file.' >> /dev/stderr
  exit 1
fi

font="${1}"

generateQuantityTraining() {
  cpus=$(nproc)

  echo "Generating quantity training images."
  cd trainer
  find quantities/* -type d | xargs -n1 -P$cpus rm -r || true
  rm -r quantities || true
  mkdir quantities

  pipenv clean
  pipenv install

  pipenv run python generate_quantities.py --font "$font"

  echo "Copying each training png to jpg."
  find quantities/* -type d | xargs -I@ -n1 -P$cpus sh -c "cd @; magick mogrify -quality 89 -format jpg -strip *.png"

  echo "Resizing each training image to 21x16px."
  cd ../native; cargo build --release --bin batch_resizer; cd ../trainer
  find quantities/* -type d \
    | xargs -n1 -P$cpus ../native/target/release/batch_resizer grayscale 21 16

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
  pipenv run python train_quantity.py 0.2 0.005 quantities/

  echo "Training complete, assembling results."
  rm -r ../includes/quantities || true
  mkdir -p ../includes/quantities
  mv class_names.json ../includes/quantities/class_names.json

  pipenv run python -m tf2onnx.convert --saved-model quantity-model-tf --output ../includes/quantities/model.onnx --opset 18

  cd ..
}

generateQuantityTraining
buildClassifier

