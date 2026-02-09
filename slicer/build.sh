#!/bin/sh

set -e

TARGET_PATH=../includes/slicer

wasm-pack build --target web

rm -r $TARGET_PATH || true
mkdir $TARGET_PATH

cp pkg/fis.js $TARGET_PATH
cp pkg/fis_bg.wasm $TARGET_PATH
