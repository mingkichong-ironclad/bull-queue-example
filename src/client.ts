import { queues, sendData, getMockData } from './queue';
import * as Path from 'path';

const thisFileName = Path.basename(__filename);
let queueIndex = parseInt(process.argv[2]) - 1;
if(isNaN(queueIndex) || queueIndex < 0 || queueIndex > queues.length-1){
  queueIndex = Math.floor(Math.random() * queues.length);
}

const queue = queues[queueIndex];
const promise = sendData(queue, getMockData(thisFileName)).then((returnString) => {
  console.log(returnString);
  queue.close();
});

const proc = process;
promise.finally(() => proc.exit(0));
