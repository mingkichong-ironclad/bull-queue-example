import * as Express from 'express';
import { Queue } from 'bull';
import { queues, NUM_OF_QUEUES, sendData, getMockData } from './queue';
import * as Path from 'path';

const thisFileName = Path.basename(__filename);
const app = Express();

const LISTEN_PORT = 3000;

app.get('/jobs/', (req, res) => {
  sendDataToQueue(queues[0], req, res);
});

for(let i = 0; i < NUM_OF_QUEUES; i++){
  app.get('/jobs/'+(i+1), (req, res) => {
    sendDataToQueue(queues[i], req, res);
  });
}

function sendDataToQueue(bullQueue: Queue, req, res){
  sendData(bullQueue, getMockData(thisFileName)).then((returnString) => {
    console.log(returnString);
    res.send(returnString);
  });
}

app.listen(LISTEN_PORT, () => console.log(`Listening on port ${LISTEN_PORT}!`));
