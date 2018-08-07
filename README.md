# EOS Nation TPS (All Time High)

![image](https://user-images.githubusercontent.com/550895/43689837-11f3c534-98ce-11e8-9d0c-98f78f25922c.png)

## Scope of project

- [x] Activate at precisely 8h00, 8th UTC, 2018 (1533715200000 time)
- [x] Queue multiple transactions (25 transactions)
- [x] Execute multiple requests concurently (5 requests)
- [x] Each transaction contains multiple actions (25 actions)
- [x] Iterate over a specific timed intervals (3 seconds)
- [x] Add custom message with random nonce (`EOS Nation TPS #eos888 (nonce)`)
- [x] Allow the use of custom permissions (`eosnationtps`)

## 1. Install

This applicaiton requires [NodeJS](https://nodejs.org/en/download/) to be installed.

```
$ git clone https://github.com/EOS-Nation/eosnationtps.git
$ cd eosnationtps
$ npm install
```

## 2. Set up environment variables

Add/edit the `.env` file.

```conf
# EOSIO Network
EOSIO_HTTP_ENDPOINT = "https://api.eosn.io"
EOSIO_CHAIN_ID = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"

# EOS Nation TPS settings
EOSNATIONTPS_MSG = "EOS Nation TPS #eos888"
EOSNATIONTPS_ACTIONS = 25
EOSNATIONTPS_INTERVAL_SECONDS = 3
EOSNATIONTPS_QUEUE = 5
EOSNATIONTPS_TRANSACTIONS = 25

# UTC 8/8/8 = 1533715200000
EOSNATIONTPS_START_TIME = 1533715200000

# DEBUG mode
# When true: set all values to 1 & start time to now
# When false: values are not changed
EOSNATIONTPS_DEBUG = false

# User Credentials (Private)
EOSIO_ACTOR = "<ACCOUNT NAME>"
EOSIO_PERMISSION = "active"
EOSIO_KEY_PROVIDER = "<PRIVATE KEY>"
```

## 3. Start

```
$ npm start
```

![image](https://user-images.githubusercontent.com/550895/43799960-ee4a2a70-9a5c-11e8-874a-8fdfc4edef6f.png)

## Extras

### Create Custom Permissions

```bash
$ cleos set account permission "<ACCOUNT>" eosnationtps "<PUBLIC KEY>" active -p <ACCOUNT>@active
$ cleos set action permission "<ACCOUNT>" eosnationtps action eosnationtps
```

## Testing

### Push a test transaction

```bash
$ cleos push action eosnationtps action '["Hello World"]' -p <ACCOUNT>@eosnationtps
```
