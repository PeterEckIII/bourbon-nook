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

export const loader = async ({ request }: LoaderArgs) => {
  const redisObject = await requireAnyFormData(request);
  return redisObject;
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
