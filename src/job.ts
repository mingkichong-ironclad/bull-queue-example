import * as Express from 'express';
import * as Queue from 'bull';

const app = Express();

const LISTEN_PORT = 3000;
const QUEUE_NAME = 'Bull Queue Example';
const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = 6379;
const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

const queue = new Queue(QUEUE_NAME, REDIS_URL);

app.get('/jobs', (req, res) => {
  const date = new Date();
  const data = { date: date, epoch: date.getTime() };
  queue.add(data);
  const returnString = JSON.stringify(data) + ' sent.\n';
  res.send(returnString);
  console.log(returnString);
});

app.listen(LISTEN_PORT, () => console.log(`Listening on port ${LISTEN_PORT}!`));
