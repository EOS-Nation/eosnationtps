#!/usr/bin/env bash

ACCOUNT=${1:-eosnationtps}

# https://developers.eos.io/eosio-cleos/reference#cleos-set-contract
cleos set contract $ACCOUNT . eosnationtps.wasm abi/eosnationtps.abi -p $ACCOUNT@active
