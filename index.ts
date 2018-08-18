import * as d3 from 'd3-queue';
import { CronJob, timeout } from "cron";
import chalk from "chalk";
import * as config from "./config";
import { pushAction } from "./src/actions";
import * as logging from "./src/logging";
import { getBlockNumber } from "./src/utils"

logging.introduction()
let active = false
const q = d3.queue(config.EOSNATIONTPS_QUEUE);

/**
 * Executes concurrently bulk actions on a timed interval
 */
new CronJob(`*/${config.EOSNATIONTPS_INTERVAL_SECONDS} * * * * *`, async () => {
    if (!active) {
        const head_block_num = await getBlockNumber(config.EOSIO_HTTP_ENDPOINT_SECONDARY)

        // Connection issue
        if (head_block_num === null) {
            console.warn(chalk.red(`connection issue with ${config.EOSIO_HTTP_ENDPOINT_SECONDARY}`))
        }
        // Not Block Number
        else if (head_block_num < config.EOSNATIONTPS_START_BLOCK_NUMBER) {
            const diffBlock = config.EOSNATIONTPS_START_BLOCK_NUMBER - head_block_num
            console.warn(chalk.yellow(`patience... starting in ${diffBlock} blocks`))
        } else {
            active = true
        }
    }

    // Send all transactions to queue
    if (active) {
        for (let i = 0; i < config.EOSNATIONTPS_TRANSACTIONS; ++i) {
            q.defer(pushAction);
        }
    }
}, () => {}, true)
