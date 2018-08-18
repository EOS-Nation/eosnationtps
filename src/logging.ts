import * as config from "../config";

// Print EOS Nation TPS Settings
export function introduction() {
    process.stderr.write(`
EOS Nation TPS
==============

Created with ❤️ by EOS Nation (eosnationftw)

EOSIO Settings
--------------
HTTP Endpoint: ${config.httpEndpoint}
Chain ID: ${config.chainId}

App Settings
------------
Message: ${config.EOSNATIONTPS_MSG}
Intervals (seconds): ${config.EOSNATIONTPS_INTERVAL_SECONDS}
Actions per transaction: ${config.EOSNATIONTPS_ACTIONS}
Transactions per interval: ${config.EOSNATIONTPS_TRANSACTIONS}
Max Queue: ${config.EOSNATIONTPS_QUEUE}
Start block number: ${config.EOSNATIONTPS_START_BLOCK_NUMBER}

User Settings
-------------
Actor: ${config.actor}
Permission: ${config.permission}

Logging
-------
`)
}