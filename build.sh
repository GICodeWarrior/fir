#!/bin/sh

set -e

warLocation=$(cd "${1}"; pwd)

parseCatalog() {
  cd catalog
  npm install
  rm -r training
  node parse.mjs "${warLocation}" > ../includes/catalog.js
  cd ..
}

buildClassifier() {
  cd trainer
  pipenv install

  pipenv run python train.py
  mv class_names.js ../includes/class_names.js

  pipenv run tensorflowjs_converter --input_format keras --output_format=tfjs_graph_model model.h5 ../includes/classifier
  cd ..
}

parseCatalog
buildClassifier

