import * as redis from "redis";
import type { CustomFormData } from "./helpers.server";

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis client error", err));

export const saveToRedis = async (data: CustomFormData) => {
  await client.connect();
  await client.set(`f-${data.redisId}`, JSON.stringify(data));
  await client.quit();
};

export const getDataFromRedis = async (
  id: string
): Promise<CustomFormData | null> => {
  // Get data from redis
  await client.connect();
  const data = await client.get(`f-${id}`);
  await client.quit();

  if (!data) {
    return null;
  }

  const formData = JSON.parse(data) as CustomFormData;

  return formData;
};

export const requireFormData = async (
  request: Request
): Promise<CustomFormData> => {
  // Get ID from search params
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (typeof id !== "string" || !id) {
    throw Error("Issue getting id");
  }

  // Get cached form data from Redis
  const formData = await getDataFromRedis(id);

  if (!formData) {
    throw Error("No Data Found");
  }

  return formData;
};

export const pollForKeys = async () => {
  await client.connect();
  for await (const key of client.scanIterator()) {
    console.log(`Redis Key: ${key}`);
  }
  await client.quit();
};

export const deleteFormData = async (id: string) => {
  await client.connect();
  await client.del(`f-${id}`);
  await client.quit();
};
