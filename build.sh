#!/bin/sh

set -e

if [ -z "${1}" ]
then
  echo 'Expecting 1 argument with path to Foxhole data files.' >> /dev/stderr
  exit 1
fi

warLocation=$(cd "${1}"; pwd)
version='naval'

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

  # Textured Icons mod uses the same icon for both FieldMGAmmo and MGAmmo. This
  # confuses the model, and the icon looks more like MGAmmo, so ignore the
  # FieldMGAmmo icon.
  rm training/FieldMGAmmo*/textured-icons-*.png || true

  ./find-duplicates.sh $cpus

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

  pipenv run python train.py 50 rgb 0.05 0.01 ../catalog/training/

  echo "Training complete, assembling results."
  rm -r ../foxhole/${version}/classifier || true
  mkdir -p ../foxhole/${version}/classifier
  mv class_names.json ../foxhole/${version}/classifier/class_names.json

  #pipenv run python train.py 16 grayscale 0.05 0.05 quantity_training

  pipenv run tensorflowjs_converter --input_format keras --output_format=tfjs_graph_model model.keras ../foxhole/${version}/classifier

  pipenv run python sort_json.py ../foxhole/${version}/classifier/model.json

  cd ..
}

parseCatalog
generateIconTraining
saveIconCatalog
buildClassifier

