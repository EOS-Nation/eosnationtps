import * as d3 from 'd3-queue';
import { CronJob } from "cron";
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
        q.awaitAll((errors) => {
            // if (errors) { throw error; }
            const time = Date.now();

            // Logging
            process.stdout.write(JSON.stringify({
                time,
                actor: config.actor,
                permission: config.permission,
                actions: counters.actions,
                transactions: counters.transactions,
                errors: counters.errors,
            }) + '\n');
        });
    } else {
        const startTime = moment(config.EOSNATIONTPS_START_TIME).fromNow()
        process.stderr.write(`patience... starting ${startTime}\n`)
    }
}, () => {}, true)
