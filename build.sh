#!/bin/sh

set -e

if [ -z "${1}" ]
then
  echo 'Expecting 1 argument with path to Foxhole data files.' >> /dev/stderr
  exit 1
fi

warLocation=$(cd "${1}"; pwd)
version='airborne-63'

parseCatalog() {
  echo "Parsing catalog. (downloading / updating npm packages)"
  cd catalog
  npm install
  echo "Parsing catalog."
  mkdir -p ../foxhole/${version}/
  node parse.js "${warLocation}" ../foxhole/${version}/catalog.json
  cd ..
}

generateIconTraining() {
  echo "Generating icon training images."
  cd catalog
  rm -r training || true

  cpus=$(nproc)
  rangeMax=$(expr ${cpus} - 1)
  seq 0 $rangeMax | xargs -I@ -n1 -P$cpus node generate_training.js "${warLocation}" ../foxhole/${version}/catalog.json training @ $cpus

  ./find-duplicates.sh $cpus

  echo "Copying each training png to jpg."
  find training/* -type d | xargs -I@ -n1 -P$cpus sh -c "cd @; mogrify -quality 89 -format jpg *.png"

  cd ..
}

saveIconCatalog() {
  echo "Saving training samples into icon catalog."
  iconPath=foxhole/${version}/icons
  rm -r $iconPath || true
  mkdir -p $iconPath

  iconNames=$(ls catalog/training)
  for name in $iconNames
  do
    if [ -d "catalog/training/$name" ]
    then
      cp "catalog/training/$name/64-0-0.png" "$iconPath/$name.png"
    fi
  done

  find $iconPath -type f | xargs -P16 -n1 optipng -strip all -quiet
}

buildClassifier() {
  echo "Building icon classifier."
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

  rm -r model-tf || true
  pipenv run python train.py 100 rgb 0.20 0.005 ../catalog/training/

  echo "Training complete, assembling results."
  rm -r ../foxhole/${version}/classifier || true
  mkdir -p ../foxhole/${version}/classifier
  mv class_names.json ../foxhole/${version}/classifier/class_names.json

  #pipenv run python train.py 16 grayscale 0.05 0.05 quantity_training

  cd convert
  pipenv clean
  pipenv install
  pipenv run tensorflowjs_converter --input_format tf_saved_model --output_format=tfjs_graph_model ../model-tf ../../foxhole/${version}/classifier
  cd ..

  pipenv run python sort_json.py ../foxhole/${version}/classifier/model.json

  cd ..
}

parseCatalog
generateIconTraining
saveIconCatalog
buildClassifier

