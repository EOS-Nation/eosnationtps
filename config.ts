import * as fs from "fs";
import * as path from "path";
import dotenv from 'dotenv';

dotenv.config();
const envFilepath = path.join(__dirname, ".env")

// EOSIO network
export const httpEndpoint = process.env.EOSIO_HTTP_ENDPOINT || 'https://api.eosn.io'
export const chainId = process.env.EOSIO_CHAIN_ID || 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'

// EOS Nation TPS settings
export let EOSNATIONTPS_MSG = process.env.EOSNATIONTPS_MSG || 'EOS Nation TPS #eos888'
export let EOSNATIONTPS_INTERVAL_SECONDS = Number(process.env.EOSNATIONTPS_INTERVAL_SECONDS || 3);
export let EOSNATIONTPS_ACTIONS = Number(process.env.EOSNATIONTPS_ACTIONS || 25);
export let EOSNATIONTPS_QUEUE = Number(process.env.EOSNATIONTPS_QUEUE || 5);
export let EOSNATIONTPS_TRANSACTIONS = Number(process.env.EOSNATIONTPS_TRANSACTIONS || 25);
export let EOSNATIONTPS_START_TIME = Number(process.env.EOSNATIONTPS_START_TIME || Date.UTC(2018, 7, 8, 8));

// User Crendentials (Private)
export const actor = process.env.EOSIO_ACTOR;
export const permission = process.env.EOSIO_PERMISSION;
export const keyProvider = process.env.EOSIO_KEY_PROVIDER;

// Validate Credentials
if (fs.existsSync(envFilepath)) {
    if (!actor || actor === "<ACCOUNT NAME>") { throw new Error("[EOSIO_ACTOR] is required"); }
    if (!permission) { throw new Error("[EOSIO_PERMISSION] is required"); }
    if (!keyProvider || keyProvider === "<PRIVATE KEY>") { throw new Error("[EOSIO_KEY_PROVIDER] is required"); }
}

// Debug
if (JSON.parse(process.env.EOSNATIONTPS_DEBUG || "false")) {
    EOSNATIONTPS_MSG = 'EOS Nation TPS Debug'
    EOSNATIONTPS_INTERVAL_SECONDS = 3
    EOSNATIONTPS_ACTIONS = 1
    EOSNATIONTPS_QUEUE = 1
    EOSNATIONTPS_TRANSACTIONS = 1
    EOSNATIONTPS_START_TIME = Date.now()
}

if (!fs.existsSync(envFilepath)) {
    fs.writeFileSync(envFilepath, `# EOSIO Network
EOSIO_HTTP_ENDPOINT = "${httpEndpoint}"
EOSIO_CHAIN_ID = "${chainId}"

# EOS Nation TPS settings
EOSNATIONTPS_MSG = "${EOSNATIONTPS_MSG}"
EOSNATIONTPS_ACTIONS = ${EOSNATIONTPS_ACTIONS}
EOSNATIONTPS_INTERVAL_SECONDS = ${EOSNATIONTPS_INTERVAL_SECONDS}
EOSNATIONTPS_QUEUE = ${EOSNATIONTPS_QUEUE}
EOSNATIONTPS_TRANSACTIONS = ${EOSNATIONTPS_TRANSACTIONS}

# UTC 8/8/8 = 1533711600000
EOSNATIONTPS_START_TIME = ${EOSNATIONTPS_START_TIME}

# DEBUG mode
# When true: set all values to 1 & start time to now
# When false: values are not changed
EOSNATIONTPS_DEBUG = false

# User Credentials (Private)
EOSIO_ACTOR = "<ACCOUNT NAME>"
EOSIO_PERMISSION = "active"
EOSIO_KEY_PROVIDER = "<PRIVATE KEY>"
`)
}