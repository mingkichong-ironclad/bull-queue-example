import * as Queue from 'bull';

const QUEUE_NAME = 'Bull Queue Example';
const REDIS_URL = 'redis://127.0.0.1:6379';

const IS_ERROR = true;
const TIMEOUT_DURATION = 2000;

const queue = new Queue(QUEUE_NAME, {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

let promise;

console.log("===   Submit JOB   ===");
console.log(new Date().toLocaleString());
promise = queue.add({ job_key: "job_value" });
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
