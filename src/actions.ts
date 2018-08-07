import * as config from "../config";
import * as counters from "./counters";
import { eos } from "./eos";

/**
 * Create Bulk Actions
 *
 * @param {string} msg Message
 * @param {number} total Total Actions
 * @returns {Array<object>} Array of Actions
 */
export function createActions(msg: string, total: number) {
    const actions = [];
    while (actions.length < total) {
        const nonce = randomNumber();
        actions.push({
            account: 'eosnationtps',
            name: 'action',
            authorization: [{
                actor: config.actor,
                permission: config.permission,
            }],
            data: {
                msg: `${msg} (${nonce})`,
            }
        });
    }
    return actions;
}

/**
 * Push single action
 *
 * @param {function} callback D3 Queue callback
 * @returns {Promise<void>}
 */
export async function pushAction(callback: any) {
    const actions = createActions(config.EOSNATIONTPS_MSG, config.EOSNATIONTPS_ACTIONS)
    try {
        await eos.transaction({actions})
        counters.setActions(counters.actions + actions.length);
        counters.setTransactions(counters.transactions + 1);
        callback(null);
    } catch (e) {
        if (e) { console.error(e); }
        counters.setErrors(counters.errors + 1);
        callback(null);
    }
}

/**
 * Generate Random Number
 *
 * @returns {number}
 */
export function randomNumber() {
    return Math.round(Math.random() * 10000)
}