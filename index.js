const d3 = require('d3-queue');
const { CronJob } = require('cron');
const Eos = require('eosjs');
const dotenv = require('dotenv');
dotenv.config();

// EOSIO network
const httpEndpoint = process.env.EOSIO_HTTP_ENDPOINT || 'https://api.eosn.io'
const chainId = process.env.EOSIO_CHAIN_ID || 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'

// EOS Nation TPS settings
const EOSNATIONTPS_MSG = process.env.EOSNATIONTPS_MSG || 'EOS Nation TPS #eos888'
const EOSNATIONTPS_INTERVAL_SECONDS = process.env.EOSNATIONTPS_INTERVAL_SECONDS || 10;
const EOSNATIONTPS_ACTIONS = process.env.EOSNATIONTPS_ACTIONS || 50;
const EOSNATIONTPS_QUEUE = process.env.EOSNATIONTPS_QUEUE || 25;
const EOSNATIONTPS_TIMEZONE = process.env.EOSNATIONTPS_TIMEZONE || 'America/Toronto';
const EOSNATIONTPS_START_TIME = Number(process.env.EOSNATIONTPS_START_TIME || Date.UTC(2018, 7, 8, 7));

// User Crendentials (Private)
const actor = process.env.EOSIO_ACTOR;
const permission = process.env.EOSIO_PERMISSION;
const keyProvider = process.env.EOSIO_KEY_PROVIDER;


// EOSIO
const logger = { log: null, error: null }
const eos = new Eos({httpEndpoint, chainId, keyProvider, logger})

// Single Action
const action = {
    account: 'eosnationtps',
    name: 'action',
    authorization: [{
        actor,
        permission
    }],
    data: {
        msg: EOSNATIONTPS_MSG,
    }
}

// Create bulk actions
const actions = []
while (actions.length < EOSNATIONTPS_ACTIONS) {
    actions.push(action);
}

new Date(2018, 8, 8, 8)

// Counters
let total_actions = 0;
let total_transactions = 0;
let total_errors = 0;

// Push single action
async function pushAction(callback) {
    callback(null);
    try {
        // await eos.transaction({actions})
        total_actions += actions.length;
        total_transactions += 1;
        callback(null);
    } catch (e) {
        total_errors += 1;
        callback(null);
    }
}
// Print EOS Nation TPS Settings
process.stderr.write(`
EOS Nation TPS
==============

Created with ❤️ by EOS Nation (eosnationftw)

EOSIO Settings
--------------
HTTP Endpoint: ${httpEndpoint}
Chain ID: ${chainId}

App Settings
------------
Message: ${EOSNATIONTPS_MSG}
Intervals (seconds): ${EOSNATIONTPS_INTERVAL_SECONDS}
Bulk Actions: ${EOSNATIONTPS_ACTIONS}
Queued Transactions: ${EOSNATIONTPS_QUEUE}
Start time (UTC): ${EOSNATIONTPS_START_TIME}

User Settings
-------------
Actor: ${actor}
Permission: ${permission}

Logging
-------
`)

// Executes concurrently bulk actions on a timed interval
new CronJob(`*/${EOSNATIONTPS_INTERVAL_SECONDS} * * * * *`, async () => {
    const q = d3.queue();
    if (Date.now() >= EOSNATIONTPS_START_TIME) {
        for (let i = 0; i < EOSNATIONTPS_QUEUE; ++i) {
            q.defer(pushAction);
        }
        q.awaitAll((error) => {
            if (error) throw error;
            const time = Date.now();

            // Logging
            process.stdout.write(JSON.stringify({
                time,
                actor,
                permission,
                actions: total_actions,
                transactions: total_transactions,
                errors: total_errors,
            }) + '\n');

            // Reset Counters
            total_actions = 0
            total_transactions = 0
            total_errors = 0
        });
    } else {
        process.stderr.write("patience... it's not time yet\n")
    }
}, () => {}, true, EOSNATIONTPS_TIMEZONE)
