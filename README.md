# Bull Queue with Web GUI Example

This is an example code of integrating [`bull`](https://www.npmjs.com/package/bull) with web GUIs, [`bull-arena`](https://www.npmjs.com/package/bull-arena) and [`bull-board`](https://www.npmjs.com/package/bull-board)

## Files

- [`queue.ts`](./src/queue.ts): Module for initialising a queue using bull. It consists of redis config parameters and a `sendData` function to generate mock up data to be sent for processing by the queue.
- [`process.ts`](./src/process.ts): Implementation of the queue processing logic. It returns a promise. Each job has a 50-50 chance of being a success or a failure.
- [`ui.ts`](./src/ui.ts): Configure bull-arena and bull-board. Listening on port 56789.
- [`client.ts`](./src/client.ts): A node.js app to send a mock up job to the queue
- [`job.ts`](./src/job.ts): A web UI app to send a mock up job to the queue

## Usage

1. Start `redis-server` on your local machine to listen on `port 6379`
2. Enter `yarn` and `./run.sh` to compile `src/*.ts` to `compiled/*.js` and run process.js
3. On a new CLI, enter `node compiled/ui.js` to start the bull queue UIs and use a browser to go to `http://localhost:56789/admin/arena/` for bull-arena and `http://localhost:56789/admin/board` for bull-board
4. Submit a single job to the bull queue either by using command line `node compiled/client.js` or run `node compiled/job.js` to start an express server and do a HTTP GET request on `http://localhost:3000/jobs`
