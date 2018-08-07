import * as d3 from 'd3-queue';
import { CronJob } from "cron";
import chalk from "chalk";
import moment from "moment";
import * as config from "./config";
import * as counters from "./src/counters";
import { pushAction } from "./src/actions";
import * as logging from "./src/logging";

logging.introduction()

/**
 * Executes concurrently bulk actions on a timed interval
 */
new CronJob(`*/${config.EOSNATIONTPS_INTERVAL_SECONDS} * * * * *`, () => {
    const q = d3.queue(config.EOSNATIONTPS_QUEUE);
    const now = Date.now();

    if (now >= config.EOSNATIONTPS_START_TIME) {
        for (let i = 0; i < config.EOSNATIONTPS_TRANSACTIONS; ++i) {
            q.defer(pushAction);
        }
    } else {
        const startTime = moment(config.EOSNATIONTPS_START_TIME).fromNow()
        console.warn(chalk.yellow(`patience... starting ${startTime}`))
    }
}, () => {}, true)
