#!/usr/bin/env bash

# https://github.com/EOSIO/eosio.wasmsdk
eosio-cpp -o eosnationtps.wasm eosnationtps.cpp

# Will be replaced soon with "eosio-cpp"
eosiocpp -g abi/eosnationtps.abi eosnationtps.cpp
