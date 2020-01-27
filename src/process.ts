import { queue, QUEUE_NAME, REDIS_HOST, REDIS_PORT, REDIS_URL } from './queue';
import { Job } from 'bull';
import Arena = require('bull-arena');
import * as BullBoard from 'bull-board';

const LOCAL_LISTENING_PORT = 56789;
const DEBUG_STRING = 'DEBUG';
const TIMEOUT_DURATION = 500;

console.log("Waiting for jobs ...");

queue.process((job) => {
  return new Promise<Job>(function(resolve, reject) {
    console.log(job.data);
    console.log("\n");
    setTimeout(() => {
      if (Math.floor(Math.random() + 0.5)) {
        reject("FAILED");
      }
      else {
        resolve(job.data);
        job.progress(100);
      }
    }, TIMEOUT_DURATION);
    queue.count().then((itemsCount) => {
      console.log(`Remaining items in the queue: ${itemsCount}`);
      console.log("\n");
    });
  });
});
