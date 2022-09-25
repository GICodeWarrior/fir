#!/bin/sh

set -e

if [ -z "${1}" ]
then
  echo 'Expecting 1 argument with path to Foxhole data files.' >> /dev/stderr
  exit 1
fi

warLocation=$(cd "${1}"; pwd)
branch='_devbranch'

parseCatalog() {
  cd catalog
  npm install
  rm -r training || true
  node parse.mjs "${warLocation}" > ../includes/catalog"${branch}".json
  cd ..
}

buildClassifier() {
  cd trainer
  pipenv install

  [ -e /usr/lib/wsl/lib/libcuda.so ] && export LD_LIBRARY_PATH=/usr/lib/wsl/lib

  pipenv run python train.py 24 rgb 0.05 0.01 ../catalog/training/

  rm -r ../includes/classifier"${branch}" || true
  mkdir -p ../includes/classifier"${branch}"
  mv class_names.json ../includes/classifier"${branch}"/class_names.json

  #pipenv run python train.py 16 grayscale 0.05 0.05 quantity_training

  pipenv run tensorflowjs_converter --input_format keras --output_format=tfjs_graph_model model.h5 ../includes/classifier"${branch}"

  pipenv run python sort_json.py ../includes/classifier"${branch}"/model.json

  cd ..
}

parseCatalog
buildClassifier

