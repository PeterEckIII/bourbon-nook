import { assertNonNullable } from "~/utils/helpers.server";
import * as dotenv from "dotenv";
import * as redis from "redis";
import type { CustomFormData, SavedRedisData } from "./helpers.server";
import type { RedisFormData } from "~/utils/types";

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis client error", err));

export const saveToRedis = async (data: SavedRedisData) => {
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

export const getAnyDataFromRedis = async (
  id: string
): Promise<RedisFormData | null> => {
  await client.connect();
  const data = await client.get(`f-${id}`);
  await client.quit();

  if (!data) {
    return null;
  }
  return JSON.parse(data) as RedisFormData;
};

export const saveAnyDataToRedis = async (data: RedisFormData) => {
  await client.connect();
  await client.set(`f-${data.redisId}`, JSON.stringify(data));
  await client.quit();
};

export const requireAnyFormData = async (
  request: Request
): Promise<RedisFormData | null> => {
  const url = new URL(request.url);

  try {
    const rid = url.searchParams.get("rid");
    assertNonNullable(rid);
    const redisData = await getAnyDataFromRedis(rid);
    if (!redisData) {
      throw new Error(`No form data!`);
    }
    return redisData;
  } catch (error) {
    return {
      redisId: "",
      bottleId: "",
      status: "CLOSED",
      userId: "",
      name: "",
      type: "",
      distiller: "",
      producer: "",
      country: "",
      region: "",
      price: "",
      age: "",
      year: "",
      batch: "",
      alcoholPercent: "",
      proof: "",
      size: "",
      color: "",
      finishing: "",
      openDate: "",
      killDate: "",
      imageUrl: "",
    };
  }
};

export const requireFormData = async (
  request: Request
): Promise<CustomFormData> => {
  // Get ID from search params
  const url = new URL(request.url);

  try {
    const id = url.searchParams.get("id");
    assertNonNullable(id);

    // Get cached form data from Redis
    const formData = await getDataFromRedis(id);

    if (!formData) {
      throw Error("No Data Found");
    }

    return formData;
  } catch (error) {
    return {
      redisId: "",
      status: "CLOSED",
      userId: "",
      name: "",
      type: "",
      distiller: "",
      producer: "",
      country: "",
      region: "",
      price: "",
      age: "",
      year: "",
      batch: "",
      alcoholPercent: "",
      proof: "",
      size: "",
      color: "",
      finishing: "",
      imageUrl: "",
    };
  }
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

type RedisRouteDataProps = {
  id: string;
};

export const handleRedisData = async ({ id }: RedisRouteDataProps) => {
  const redisData = await getAnyDataFromRedis(id);
  if (!redisData) {
    throw new Error(`No data saved for this form`);
  }
};
