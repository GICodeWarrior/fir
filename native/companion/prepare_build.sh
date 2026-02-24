#!/bin/sh

set -e

cd ..

dirs='target/debug
target/release'

for d in $dirs
do
  mkdir -p $d
  cd $d

  mkdir model-icon
  cd model-icon
  find ../../../../trainer/model-tf -mindepth 1 -maxdepth 1 | xargs -n1 ln -s
  ln -s ../../../../foxhole/airborne-63/classifier/class_names.json
  cd ..

  mkdir model-quantity
  cd model-quantity
  find ../../../../trainer/quantity-model-tf -mindepth 1 -maxdepth 1 | xargs -n1 ln -s
  ln -s ../../../../includes/quantities/class_names.json
  cd ..

  cd ../../
done
