# EOS Nation TPS (All Time High)

![image](https://user-images.githubusercontent.com/550895/43689837-11f3c534-98ce-11e8-9d0c-98f78f25922c.png)

## Intentation

- [x] Start firing at precisely 8h00, 8th UTC
- [x] Each transaction will contain 50 or more actions (bulk actions per each 1 transaction)
- [x] Each script will "queue" multiple transactions and run concurrently (firing all at the same time)
- [x] Script will run at every 10 second bursts (or every UTC minute), that way we can sync all scripts on the same UTC second

## 1. Create Custom Permissions

```bash
$ cleos set account permission "<ACCOUNT>" eosnationtps "<PUBLIC KEY>" active -p <ACCOUNT>@active
$ cleos set action permission "<ACCOUNT>" eosnationtps action eosnationtps
```

## 2. Push a transaction

```bash
$ cleos push action eosnationtps action '["Hello World"]' -p <ACCOUNT>@eosnationtps
```

## 3. Install

```
$ git clone https://github.com/EOS-Nation/eosnationtps.git
$ cd eosnationtps
$ npm install
```

## 4. Set up environment variables

Add/edit the `.env` file.

```env
# EOSIO Network
EOSIO_HTTP_ENDPOINT = "https://api.eosn.io"
EOSIO_CHAIN_ID = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"

# EOS Nation TPS settings
EOSNATIONTPS_MSG = "Test EOS Nation TPS"
EOSNATIONTPS_ACTIONS = 50
EOSNATIONTPS_INTERVAL_SECONDS = 1
EOSNATIONTPS_QUEUE = 5
EOSNATIONTPS_TIMEZONE = 'America/Toronto'
EOSNATIONTPS_START_TIME = 1533502545997

# User Credentials (Private)
EOSIO_KEY_PROVIDER = <PRIVATE KEY>
EOSIO_ACTOR = <ACCOUNT>
EOSIO_PERMISSION = <PERMISSION>
```

## 5. Start

```
$ npm start
```