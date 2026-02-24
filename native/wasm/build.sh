#!/bin/sh

set -e

TARGET_PATH=../../includes/wasm

wasm-pack build --target web "$@"

rm -r $TARGET_PATH || true
mkdir $TARGET_PATH

cp pkg/fiw.js $TARGET_PATH
cp pkg/fiw_bg.wasm $TARGET_PATH
