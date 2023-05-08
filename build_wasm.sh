#!/bin/bash

set -e

# Build the Go code into a WebAssembly binary using tinygo
tinygo build -o ./next/public/main.wasm -target wasm ./go/main.go
