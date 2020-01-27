import { queue, sendData, getMockData } from './queue';

sendData(queue, getMockData("client.ts")).then((returnString)=>{
  console.log(returnString);
  queue.close();
});
