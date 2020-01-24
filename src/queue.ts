import * as BullQueue from 'bull';

export const QUEUE_NAME = 'Bull Queue Example';
export const REDIS_HOST = "127.0.0.1";
export const REDIS_PORT = 6379;
export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const queue = new BullQueue(QUEUE_NAME, REDIS_URL);

export async function sendData(bullQueue: BullQueue.Queue) {
  const date = new Date();
  const data = { origin: "client.ts", date: date, epoch: date.getTime() };
  const queueJob = await bullQueue.add(data);
  return JSON.stringify(queueJob.data);
}
