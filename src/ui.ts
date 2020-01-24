import Arena = require('bull-arena');
import * as BullBoard from 'bull-board';
import * as Express from 'express';
import * as OS from 'os';

import { queue, QUEUE_NAME, REDIS_HOST, REDIS_PORT, REDIS_URL } from './queue';

const REDIS_CONFIG = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};
const LOCAL_LISTENING_PORT = 56789;

const app = Express();

// bull-arena setup
// check out complete example from https://github.com/tsukakei/express-bull-arena-example
const arenaConfig = Arena(
  {
    queues: [
      {
        name: QUEUE_NAME,
        hostId: REDIS_HOST,
        redis: REDIS_CONFIG,
      },
    ],
  },
  {
    disableListen: true,
  }
);
app.use('/admin/arena', arenaConfig);

// bull-board setup
BullBoard.setQueues([queue]);
app.use('/admin/board', BullBoard.UI);

app.listen(LOCAL_LISTENING_PORT, () => console.log("Server started on host: " + OS.hostname + ", port " + LOCAL_LISTENING_PORT)); // http://localhost:56789/
