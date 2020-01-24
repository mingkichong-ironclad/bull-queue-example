import { queue, sendData } from './queue';

sendData(queue).then((returnString)=>{
  console.log(returnString);
  queue.close();
});
