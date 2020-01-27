import * as BullQueue from 'bull';

export const QUEUE_NAME = 'Bull Queue Example';
export const QUEUE_NAME_2 = 'Bull Second Queue Example';
export const QUEUE_NAME_3 = 'Bull Third Queue Example';
export const REDIS_HOST = "127.0.0.1";
export const REDIS_PORT = 6379;
export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const queue = new BullQueue(QUEUE_NAME, REDIS_URL);
export const queue2 = new BullQueue(QUEUE_NAME_2, REDIS_URL);
export const queue3 = new BullQueue(QUEUE_NAME_3, REDIS_URL);

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
