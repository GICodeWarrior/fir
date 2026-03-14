#!/bin/sh

RUSTFLAGS="-C target-cpu=native" cargo run --release --bin fis_test airborne-63 ../../fir-spec/
