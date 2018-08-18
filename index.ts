import * as d3 from 'd3-queue';
import { CronJob } from "cron";
import chalk from "chalk";
import * as config from "./config";
import { pushAction } from "./src/actions";
import * as logging from "./src/logging";
import { getBlockNumber } from "./src/utils"

logging.introduction()
let active = false
let blockNumber = 0

/**
 * Executes concurrently bulk actions on a timed interval
 */
new CronJob(`*/${config.EOSNATIONTPS_INTERVAL_SECONDS} * * * * *`, async () => {
    const q = d3.queue(config.EOSNATIONTPS_QUEUE);
    if (!active) {
        blockNumber = await getBlockNumber(config.httpEndpoint)
    }

    if (active || blockNumber >= config.EOSNATIONTPS_START_BLOCK_NUMBER) {
        for (let i = 0; i < config.EOSNATIONTPS_TRANSACTIONS; ++i) {
            q.defer(pushAction);
        }
    } else {
        const diffBlock = config.EOSNATIONTPS_START_BLOCK_NUMBER - blockNumber
        console.warn(chalk.yellow(`patience... starting in ${diffBlock} blocks`))
    }
}, () => {}, true)
