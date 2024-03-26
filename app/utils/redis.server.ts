import * as redis from "redis";

import { BottleData, NotesData, SettingData } from "~/types/redis";

export function generateCode(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (error) => console.log(`Redis Error: ${error}`));

export async function saveToRedis(data: BottleData | SettingData | NotesData) {
  await client.connect();
  await client.set(`f-${data.redisId}`, JSON.stringify(data));
  await client.quit();
}

export async function getDataFromRedis(redisId: string) {
  await client.connect();
  const data = await client.get(`f-${redisId}`);
  await client.quit();

  if (!data) {
    return null;
  }

  const formData = JSON.parse(data);
  return formData;
}

export async function deleteDataFromRedis(redisId: string) {
  await client.connect();
  await client.del(`f-${redisId}`);
  await client.quit();
}
