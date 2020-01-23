import * as Queue from 'bull';
import * as Arena from 'bull-arena';
import * as Bull_Board from 'bull-board';
import * as Express from 'express';
import * as _ from 'lodash';

const QUEUE_NAME = 'Bull Queue Example';
const REDIS_URL = 'redis://127.0.0.1:6379';
const LOCAL_LISTENING_PORT = 56789;

const IS_ERROR = true;
const DEBUG_STRING = 'DEBUG';
const IS_DEBUG = _.includes(process.argv.splice(2), DEBUG_STRING);
const TIMEOUT_DURATION = 2000;

const app = Express();

const queue = new Queue(QUEUE_NAME, {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

// bull-board setup
Bull_Board.setQueues([queue]);
app.use('/admin/queues', Bull_Board.UI);

app.listen(LOCAL_LISTENING_PORT, () => console.log("Server started on port " + LOCAL_LISTENING_PORT)); // http://localhost:56789/

dPrint("===   Submit JOB   ===");
dPrint(new Date().toLocaleString());
let promise = queue.add({ job_key: "job_value" });
dPrint("======================\n");

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
  });
});

dPrint("===   WAITING FOR JOB TO RETURN   ===");
dPrint(new Date().toLocaleString());
dPrint("=====================================\n");

setTimeout(() => {
  promise.then((job) => {
    dPrint("===   JOB RETURNED   ===");
    dPrint(new Date().toLocaleString());
    dPrint("========================\n");
    console.log("Processed");
    console.log(job.data);
    console.log("\n");
    dPrint("===   JOB RETURNED DONE  ===");
    dPrint(new Date().toLocaleString());
    dPrint("============================\n");
  });
}, TIMEOUT_DURATION);

function dPrint(msg: any) {
  if (IS_DEBUG) {
    console.log(msg);
  }
}
