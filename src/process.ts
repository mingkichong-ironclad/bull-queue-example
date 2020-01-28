import * as BullQueue from 'bull';
import { queue, queue2, queue3, QUEUE_NAME, REDIS_HOST, REDIS_PORT, REDIS_URL } from './queue';
import Arena = require('bull-arena');
import * as BullBoard from 'bull-board';

const LOCAL_LISTENING_PORT = 56789;
const DEBUG_STRING = 'DEBUG';
const TIMEOUT_DURATION = 50;

console.log("Waiting for jobs ...");

processQueueJobs(queue);
processQueueJobs(queue2);
processQueueJobs(queue3);

function processQueueJobs(bullQueue: BullQueue.Queue){
  bullQueue.process((job) => {
    return new Promise<BullQueue.Job>(function(resolve, reject) {
      console.log(`Queue: ${bullQueue.name} -- ID: ${job.id}`);
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
      bullQueue.count().then((itemsCount) => {
        console.log(`Remaining items in the queue: ${itemsCount}`);
        console.log("\n");
      });
    });
  });
}
