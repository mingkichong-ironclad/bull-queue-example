import * as Queue from 'bull';
import * as Bull_Board from 'bull-board';
import * as Express from 'express';

const QUEUE_NAME = 'Bull Queue Example';
const REDIS_URL = 'redis://127.0.0.1:6379';
const LOCAL_LISTENING_PORT = 56789;

const IS_ERROR = true;
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

console.log("===   Submit JOB   ===");
console.log(new Date().toLocaleString());
let promise = queue.add({ job_key: "job_value" });
console.log("======================\n");

queue.process((job) => {
  return new Promise<Queue.Job>(function(resolve, reject) {
    console.log("===   PROCESS JOB   ===");
    console.log(new Date().toLocaleString());
    console.log("============================\n");
    console.log(job.data);
    console.log("\n");
    setTimeout(() => {
      if (IS_ERROR) {
        reject(job);
      }
      resolve(job);
      console.log("===   Promise DONE   ===");
      console.log(new Date().toLocaleString());
      console.log("========================\n");
    }, TIMEOUT_DURATION);
  });
});

console.log("===   WAITING FOR JOB TO RETURN   ===");
console.log(new Date().toLocaleString());
console.log("=====================================\n");


setTimeout(() => {
  promise.then((job) => {
    console.log("===   JOB RETURNED   ===");
    console.log(new Date().toLocaleString());
    console.log("========================\n");
    console.log(job.data);
    console.log("\n");
    console.log("===   JOB RETURNED DONE  ===");
    console.log(new Date().toLocaleString());
    console.log("============================\n");
  });
}, TIMEOUT_DURATION);
