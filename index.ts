import * as d3 from 'd3-queue';
import { CronJob, timeout } from "cron";
import chalk from "chalk";
import * as config from "./config";
import { pushAction } from "./src/actions";
import * as logging from "./src/logging";
import { getInfo } from "./src/utils"

logging.introduction()
const q = d3.queue(config.EOSNATIONTPS_QUEUE);

/**
 * Executes concurrently bulk actions on a timed interval
 */
new CronJob(`*/${config.EOSNATIONTPS_INTERVAL_SECONDS} * * * * *`, async () => {
    const {head_block_num, head_block_producer} = await getInfo(config.httpEndpoint)

    // Not Block Number
    if (head_block_num < config.EOSNATIONTPS_START_BLOCK_NUMBER) {
        const diffBlock = config.EOSNATIONTPS_START_BLOCK_NUMBER - head_block_num
        console.warn(chalk.yellow(`patience... starting in ${diffBlock} blocks`))
    // Not Block Producer
    } else if (head_block_producer !== config.EOSNATIONTPS_BLOCK_PRODUCER) {
        console.warn(chalk.yellow(`patience... waiting for ${config.EOSNATIONTPS_BLOCK_PRODUCER}`))
    }
    // Send all transactions to queue
    else {
        for (let i = 0; i < config.EOSNATIONTPS_TRANSACTIONS; ++i) {
            q.defer(pushAction);
        }
    }
}, () => {}, true)
