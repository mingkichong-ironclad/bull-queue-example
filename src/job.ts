import * as Express from 'express';
import { Queue } from 'bull';
import { queue, queue2, queue3, sendData, getMockData } from './queue';
import * as Path from 'path';

const thisFileName = Path.basename(__filename);
const app = Express();

const LISTEN_PORT = 3000;

app.get('/jobs', (req, res) => {
  sendDataToQueue(queue, req, res);
});

app.get('/jobs/1', (req, res) => {
  res.redirect("/jobs");
});

app.get('/jobs/2', (req, res) => {
  sendDataToQueue(queue2, req, res);
});

app.get('/jobs/3', (req, res) => {
  sendDataToQueue(queue3, req, res);
});

function sendDataToQueue(bullQueue: Queue, req, res){
  sendData(bullQueue, getMockData(thisFileName)).then((returnString) => {
    console.log(returnString);
    res.send(returnString);
  });
}

app.listen(LISTEN_PORT, () => console.log(`Listening on port ${LISTEN_PORT}!`));
