#!/bin/sh

set -e

if [ -z "${1}" ]
then
  echo 'Expecting 1 argument with path to Foxhole data files.' >> /dev/stderr
  exit 1
fi

warLocation=$(cd "${1}"; pwd)
version='inferno'

parseCatalog() {
  echo "Parsing catalog. (downloading / updating npm packages)"
  cd catalog
  npm install
  echo "Parsing catalog."
  mkdir -p ../includes/foxhole/${version}/
  node parse.js "${warLocation}" ../includes/foxhole/${version}/catalog.json
  cd ..
}

generateIconTraining() {
  echo "Generating icon training images."
  cd catalog
  rm -r training || true

  cpus=$(nproc)
  rangeMax=$(expr ${cpus} - 1)
  seq 0 $rangeMax | xargs -I@ -n1 -P$cpus node generate_training.js ~/foxhole ../includes/foxhole/inferno/catalog.json training @ $cpus

  # Textured Icons mod uses the same icon for both ATRPGW and ATRPGTW. This
  # confuses the model, and the icon looks more like ATRPGW, so ignore the
  # ATRPGTW icon.
  rm training/ATRPGTW*/textured-icons-*.png || true

  ./find-duplicates.sh $cpus

  cd ..
}

saveIconCatalog() {
  echo "Saving training samples into icon catalog."
  iconPath=includes/foxhole/${version}/icons
  rm -r $iconPath || true
  mkdir -p $iconPath

  iconNames=$(ls catalog/training)
  for name in $iconNames
  do
    if [ -d "catalog/training/$name" ]
    then
      cp "catalog/training/$name/64-0.png" "$iconPath/$name.png"
    fi
  done

  find $iconPath -type f | xargs -P16 -n1 optipng -strip all -quiet
}

buildClassifier() {
  echo "Building icon classifier."
  cd trainer
  pipenv install

  [ -e /usr/lib/wsl/lib/libcuda.so ] && export LD_LIBRARY_PATH=/usr/lib/wsl/lib

  pipenv run python train.py 50 rgb 0.05 0.01 ../catalog/training/

  rm -r ../includes/foxhole/${version}/classifier || true
  mkdir -p ../includes/foxhole/${version}/classifier
  mv class_names.json ../includes/foxhole/${version}/classifier/class_names.json

  #pipenv run python train.py 16 grayscale 0.05 0.05 quantity_training

  pipenv run tensorflowjs_converter --input_format keras --output_format=tfjs_graph_model model.h5 ../includes/foxhole/${version}/classifier

  pipenv run python sort_json.py ../includes/foxhole/${version}/classifier/model.json

  cd ..
}

parseCatalog
generateIconTraining
saveIconCatalog
buildClassifier

