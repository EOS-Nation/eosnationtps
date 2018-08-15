#!/usr/bin/env bash

# https://github.com/EOSIO/eosio.wasmsdk
eosio-cpp -o eosnationtps.wasm src/eosnationtps.cpp

# Will be replaced soon with "eosio-cpp"
eosiocpp -g abi/eosnationtps.abi src/eosnationtps.cpp
