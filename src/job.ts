import * as Express from 'express';
import { queue, sendData, getMockData } from './queue';

const app = Express();

const LISTEN_PORT = 3000;

app.get('/jobs', (req, res) => {
  sendData(queue, getMockData("jobs.ts")).then((returnString)=>{
    console.log(returnString);
    res.send(returnString);
  });
});

app.listen(LISTEN_PORT, () => console.log(`Listening on port ${LISTEN_PORT}!`));
