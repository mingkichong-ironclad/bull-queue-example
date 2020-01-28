import Arena = require('bull-arena');
import * as BullBoard from 'bull-board';
import * as Express from 'express';

import { queues, NUM_OF_QUEUES, QUEUE_NAME_PREFIX, REDIS_HOST, REDIS_PORT } from './queue';

const LOCAL_LISTENING_PORT = 56789;

const app = Express();

const queueConfigs: Array<any> = [];

for (let i = 0; i < NUM_OF_QUEUES; i++) {
  queueConfigs.push({
    name: queues[i].name,
    hostId: REDIS_HOST,
    redis: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  });
}

// bull-arena setup
// check out complete example from https://github.com/tsukakei/express-bull-arena-example
const arenaConfig = Arena(
  {
    queues: queueConfigs,
  },
  {
    disableListen: true,
  }
);
app.use('/admin/arena', arenaConfig);

// bull-board setup
BullBoard.setQueues(queues);
app.use('/admin/board', BullBoard.UI);

app.listen(LOCAL_LISTENING_PORT, () => console.log("Server started on port " + LOCAL_LISTENING_PORT)); // http://localhost:56789/admin/{arena|board}
