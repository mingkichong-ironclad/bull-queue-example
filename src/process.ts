import * as BullQueue from 'bull';
import { queues, NUM_OF_QUEUES } from './queue';
import * as BullBoard from 'bull-board';

const LOCAL_LISTENING_PORT = 56789;
const DEBUG_STRING = 'DEBUG';
const TIMEOUT_DURATION = 50;

console.log("Waiting for jobs ...");

for(let i = 0; i < NUM_OF_QUEUES; i++){
  processQueueJobs(queues[i]);
}

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
