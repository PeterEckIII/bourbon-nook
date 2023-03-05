import { redirect, json } from "@remix-run/server-runtime";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import SettingForm from "~/components/Form/SettingForm";
import {
  getAnyDataFromRedis,
  requireAnyFormData,
  saveAnyDataToRedis,
} from "~/utils/redis.server";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
import type { RedisFormData, SettingErrors } from "~/utils/types";
import { settingSchema, handleFormData } from "~/utils/newHelpers.server";
import { requireUserId } from "~/session.server";
import { getBottle } from "~/models/bottle.server";
import { generateCode } from "~/utils/helpers.server";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const rid = url.searchParams.get("rid");
  const bid = url.searchParams.get("bid");

  if (typeof rid !== "undefined" && rid !== "" && rid !== null) {
    const data = await getAnyDataFromRedis(rid);
    return data;
  } else if (typeof bid !== "undefined" && bid !== "" && bid !== null) {
    const bottle = await getBottle(bid);
    if (!bottle) {
      console.log(`NO BOTTLE FROM DB!!`);
      return redirect(`/reviews/new/bottle`);
    } else {
      const newRedisObject: RedisFormData = {
        userId,
        redisId: generateCode(6),
        bottleId: bottle.id,
        imageUrl: bottle.imageUrl || "",
        name: bottle.name || "",
        status: bottle.status,
        type: bottle.type || "",
        distiller: bottle.distiller || "",
        producer: bottle.producer || "",
        country: bottle.country || "",
        region: bottle.region || "",
        price: bottle.price || "",
        age: bottle.age || "",
        year: bottle.year || "",
        batch: bottle.batch || "",
        alcoholPercent: bottle.alcoholPercent || "",
        proof: bottle.proof || "",
        size: bottle.size || "",
        color: bottle.color || "",
        finishing: bottle.finishing || "",
        openDate: bottle.openDate || "",
        killDate: bottle.killDate || "",
      };
      try {
        await saveAnyDataToRedis(newRedisObject);
        return json<RedisFormData>(newRedisObject);
      } catch (error) {
        console.log(`ERROR SAVING REDIS DATA: ${error}`);
        return redirect(`/reviews/new/bottle`);
      }
    }
  } else {
    console.log(`No situation matched this route`);
    return redirect(`/reviews/new/bottle`);
  }
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const { result, errors, formData } = await handleFormData(
    request,
    settingSchema
  );

  const redisFormId = formData.get("redisId")?.toString();
  if (typeof redisFormId === "undefined" || !redisFormId) {
    throw new Error(`Could not find an rid in the URL`);
  }
  const rid = redisFormId;

  const redisObject = await getAnyDataFromRedis(rid);
  if (!redisObject) {
    return json<SettingErrors>({
      general: `We couldn't find the saved data. Please re-input it`,
    });
  }

  try {
    redisObject.date = result.date;
    redisObject.setting = result.setting;
    redisObject.glassware = result.glassware;
    redisObject.restTime = result.restTime;
    redisObject.nose = result.nose;
    redisObject.palate = result.palate;
    redisObject.finish = result.finish;
    redisObject.thoughts = result.thoughts;

    await saveAnyDataToRedis(redisObject);
    return redirect(`/reviews/new/notes?rid=${redisObject.redisId}`);
  } catch (error) {
    console.log(`Error saving Redis data: ${JSON.stringify(error, null, 2)}`);
    return json<SettingErrors>(errors as SettingErrors);
  }
};

export default function NewSettingRoute() {
  const redisData = useTypedLoaderData<RedisFormData | null>();
  const errors = useTypedActionData<SettingErrors>();

  return (
    <>
      <SettingForm data={redisData || null} errors={errors} />
    </>
  );
}
