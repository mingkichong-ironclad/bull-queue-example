# Node.js Bull Queue with Web GUI Example

This is an example code of integrating [`bull`](https://www.npmjs.com/package/bull) with web GUIs, [`bull-arena`](https://www.npmjs.com/package/bull-arena) and [`bull-board`](https://www.npmjs.com/package/bull-board)

## Files

- [`NUM_QUEUES`](./conf/NUM_QUEUES) Defines the number of queues.
- [`queue.ts`](./src/queue.ts): A module for initialising queues using bull. It consists of redis config parameters and a `sendData` function to send mock up data (generated by `getMockData`) for processing by a specific queue.
- [`process.ts`](./src/process.ts): Implementation of the queue processing logic. It returns a promise. Each job has a 50-50 chance of being a success or a failure.
- [`ui.ts`](./src/ui.ts): Configures bull-arena and bull-board. Starts an express server to listen for http traffic on port 56789.
- [`client.ts`](./src/client.ts): A node.js app to send a mock up job to the queue 1.
- [`job.ts`](./src/job.ts): A web UI app to send a mock up job to the queue. Start an express server to listen on port 3000.

## Usage

1. Start `redis-server` on your local machine to listen on `port 6379`.
2. Enter `yarn` and `./run.sh` to compile `src/*.ts` to `compiled/*.js` and run process.js.
3. On a new CLI, enter `node compiled/ui.js` to start the bull queue UIs and use a browser to go to `http://localhost:56789/admin/arena/` for bull-arena and `http://localhost:56789/admin/board` for bull-board.
4. Submit a single job to the bull queue either by (1) using command line `node compiled/client.js`, or (2) run `node compiled/job.js` to start an express server, then submit an HTTP GET request to `http://localhost:3000/jobs` to the first queue or `http://localhost:3000/jobs/{queue_number}` to a specific queue.
