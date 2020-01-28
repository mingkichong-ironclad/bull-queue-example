import { queues, sendData, getMockData } from './queue';
import * as Path from 'path';

const thisFileName = Path.basename(__filename);

const queue = queues[0]; // only send to the first queue
sendData(queue, getMockData(thisFileName)).then((returnString)=>{
  console.log(returnString);
  queue.close();
});
