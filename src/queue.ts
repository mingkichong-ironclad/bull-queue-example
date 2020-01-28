import * as BullQueue from 'bull';

export const NUM_OF_QUEUES = 50;
export const QUEUE_NAME_PREFIX = 'Bull Queue Example';
export const REDIS_HOST = "127.0.0.1";
export const REDIS_PORT = 6379;
const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const queues: Array<BullQueue.Queue> = [];

for(let i = 0; i < NUM_OF_QUEUES; i++){
  queues.push(new BullQueue(QUEUE_NAME_PREFIX + "--"+ (i+1), REDIS_URL));
}

export async function sendData(bullQueue: BullQueue.Queue, data: MockData) {
  const queueJob = await bullQueue.add(data);
  return JSON.stringify(queueJob.data);
}

export interface MockData {
  origin: string,
  date: string,
  epoch: number,
}

export function getMockData(origin: string): MockData {
  const date = new Date();
  return {
    origin: origin,
    date: date.toLocaleString(),
    epoch: date.getTime()
  };
}
