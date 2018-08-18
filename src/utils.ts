import { GetInfo } from "../types/get_info"
import axios from "axios";

/**
 * Get Info
 *
 * @param {string} [api = httpEndpoint] EOSIO HTTP endpoint API
 * @return {Promise<GetInfo>} Get Info
 * await getInfo()
 * // {
 * //   "server_version": "d9ad8eec",
 * //   "head_block_num": 8592,
 * //   "last_irreversible_block_num": 8591,
 * //   "head_block_id": "00002190e805475db152be7d3f4f1a075efaed42827cd551b0e23c7feabbedac",
 * //   "head_block_time": "2018-04-27T17:40:34",
 * //   "head_block_producer": "eosio"
 * // }
 */
export async function getInfo(api: string): Promise<GetInfo | null> {
    try {
        const url = api + "/v1/chain/get_info"
        const {data} = await axios.get(url)
        return data
    } catch (e) {
        return null;
    }
}

/**
 * Get Head Block Number
 *
 * @param {string} [api = httpEndpoint] EOSIO HTTP endpoint API
 * @return {Promise<number|null>} Head Block Number
 * await getBlockNumber() //=> 11000000
 */
export async function getBlockNumber(api: string) {
    const info = await getInfo(api)
    if (info) { return info.head_block_num }
    return null
}

/**
 * Generate Random Number
 *
 * @returns {number}
 */
export function randomNumber() {
    return Math.round(Math.random() * 10000)
}