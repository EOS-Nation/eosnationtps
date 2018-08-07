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
Bulk Actions: ${config.EOSNATIONTPS_ACTIONS}
Queued Transactions: ${config.EOSNATIONTPS_QUEUE}
Start time (UTC): ${config.EOSNATIONTPS_START_TIME}

User Settings
-------------
Actor: ${config.actor}
Permission: ${config.permission}

Logging
-------
`)
}