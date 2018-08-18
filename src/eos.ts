const Eos = require('eosjs');
import {httpEndpoint, chainId, keyProvider} from "../config";

// Setup EOSIO
const logger = { log: null, error: null }
export const eos = new Eos({httpEndpoint, chainId, keyProvider, logger})
