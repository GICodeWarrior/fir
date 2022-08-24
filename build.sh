#!/bin/sh

set -e

if [ -z "${1}" ]
then
  echo 'Expecting 1 argument with path to Foxhole data files.' >> /dev/stderr
  exit 1
fi

warLocation=$(cd "${1}"; pwd)

parseCatalog() {
  cd catalog
  npm install
  rm -r training || true
  node parse.mjs "${warLocation}" > ../includes/catalog.json
  cd ..
}

buildClassifier() {
  cd trainer
  pipenv install

  pipenv run python train.py
  mv class_names.json ../includes/class_names.json

  pipenv run tensorflowjs_converter --input_format keras --output_format=tfjs_graph_model model.h5 ../includes/classifier

  pipenv run python sort_json.py ../includes/classifier/model.json

  cd ..
}

parseCatalog
buildClassifier

