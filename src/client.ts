import { queue, sendData } from './queue';

sendData(queue, "client.ts").then((returnString)=>{
  console.log(returnString);
  queue.close();
});
