import { queue, QUEUE_NAME, REDIS_HOST, REDIS_PORT, REDIS_URL } from './queue';
import * as Queue from 'bull';
import Arena = require('bull-arena');
import * as BullBoard from 'bull-board';
import * as Express from 'express';
import * as _ from 'lodash';

const REDIS_CONFIG = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

const LOCAL_LISTENING_PORT = 56789;

const IS_ERROR = true;
const DEBUG_STRING = 'DEBUG';
const IS_DEBUG = _.includes(process.argv.splice(2), DEBUG_STRING);
const TIMEOUT_DURATION = 500;

queue.process((job) => {
  return new Promise<Queue.Job>(function(resolve, reject) {
    dPrint("===   PROCESS JOB   ===");
    dPrint(new Date().toLocaleString());
    dPrint("============================\n");
    console.log(job.data);
    console.log("\n");
    setTimeout(() => {
      if (IS_ERROR) {
        reject(job);
      }
      resolve(job);
      dPrint("===   Promise DONE   ===");
      dPrint(new Date().toLocaleString());
      dPrint("========================\n");
    }, TIMEOUT_DURATION);
    queue.count().then((job) => {
      console.log(`Remaining items in the queue: ${job}`);
    });
  });
});

function dPrint(msg: any) {
  if (IS_DEBUG) {
    console.log(msg);
  }
}
