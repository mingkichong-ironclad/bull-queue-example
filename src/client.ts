import { queue, sendData, getMockData } from './queue';
import * as Path from 'path';

const thisFileName = Path.basename(__filename);

sendData(queue, getMockData(thisFileName)).then((returnString)=>{
  console.log(returnString);
  queue.close();
});
