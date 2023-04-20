import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import { useTransition } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { createBottle, editBottle } from "~/models/bottle.server";
import type { BottleStatus } from "@prisma/client";
import {
  useTypedActionData,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import type { ImageActionData } from "~/routes/services/image";
import { generateCode } from "~/utils/helpers.server";
import { getBottle } from "~/models/bottle.server";
import BottleForm from "~/components/Form/BottleForm";
import type { BottleErrors, RedisFormData } from "~/utils/types";
import { bottleSchema, handleFormData } from "~/utils/newHelpers.server";
import {
  getAnyDataFromRedis,
  requireAnyFormData,
  saveAnyDataToRedis,
} from "~/utils/redis.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const rid = url.searchParams.get("rid");
  if (rid !== "" && typeof rid === "string") {
    const data = await getAnyDataFromRedis(rid);
    if (typeof data === "undefined") {
      return null;
    } else {
      return data;
    }
  } else {
    return null;
  }
};

export const action = async ({ request }: ActionArgs) => {
  // Handle user auth
  const redirectIfLoggedOut = new URL(request.url);
  const userId = await requireUserId(request);
  invariant(userId, "No user in session");
  if (!userId || typeof userId === "undefined") {
    redirect(`/login?redirectTo=${redirectIfLoggedOut}`);
  }

  const { result, errors, formData } = await handleFormData(
    request,
    bottleSchema
  );
  console.log(`Results: ${JSON.stringify(result, null, 2)}`);
  const status = formData.get("status")?.toString();

  const redisFormId = formData.get("redisId")?.toString();

  let rid = "";

  if (typeof redisFormId !== "string" || redisFormId === "") {
    rid = generateCode(6);

    const newRedisObject: RedisFormData = {
      userId,
      redisId: rid,
      status: status as BottleStatus,
      name: result.name,
      type: result.type,
      distiller: result.distiller,
      producer: result.producer,
      country: result.country,
      region: result.region,
      price: result.price,
      age: result.age,
      year: result.year,
      batch: result.batch,
      alcoholPercent: result.alcoholPercent,
      proof: result.proof,
      size: result.size,
      color: result.color,
      finishing: result.finishing,
      imageUrl: result.imageUrl,
      openDate: result.openDate,
      killDate: result.killDate,
    };

    try {
      const newBottle = await createBottle({
        userId,
        ...result,
      });
      console.log(`NEW BOTTLE: ${JSON.stringify(newBottle, null, 2)}`);

      newRedisObject.bottleId = newBottle.id;
      await saveAnyDataToRedis(newRedisObject);
      return redirect(`/reviews/new/setting?rid=${rid}`);
    } catch (error) {
      console.log(`Error submitting bottle: ${JSON.stringify(error, null, 2)}`);
      return json<BottleErrors>(errors as BottleErrors);
    }
  } else {
    rid = redisFormId;

    const savedRedisObject = await getAnyDataFromRedis(rid);
    if (!savedRedisObject || !savedRedisObject.bottleId) {
      throw new Error(
        `Couldn't find the saved information to populate this form. Please refresh the page`
      );
    }

    const savedRecord = await getBottle(savedRedisObject.bottleId);
    invariant(savedRecord);
    if (savedRecord.id === savedRedisObject.bottleId) {
      const updatedBottle = {
        userId,
        id: savedRecord.id,
        status: status as BottleStatus,
        name: result.name,
        type: result.type,
        distiller: result.distiller,
        producer: result.producer,
        country: result.country,
        region: result.region,
        price: result.price,
        age: result.age,
        year: result.year,
        batch: result.batch,
        barrel: result.barrel,
        alcoholPercent: result.alcoholPercent,
        proof: result.proof,
        size: result.size,
        color: result.color,
        finishing: result.finishing,
        imageUrl: result.imageUrl,
        openDate: result.openDate,
        killDate: result.killDate,
      };

      try {
        const newResult = await editBottle(updatedBottle);
        await saveAnyDataToRedis({
          redisId: rid,
          bottleId: newResult.id,
          ...updatedBottle,
        });
        return redirect(`/reviews/new/setting?rid=${rid}`);
      } catch (error) {
        console.log(`Error editing bottle: ${error}`);
        return null;
      }
    } else {
      console.log(
        `The record from the DB has id ${savedRecord.id}, which DOESN'T match the redis object id of ${savedRedisObject.bottleId}`
      );

      try {
        const newBottle = await createBottle({
          userId,
          id: savedRecord.id,
          status: status as BottleStatus,
          name: result.name,
          type: result.type,
          distiller: result.distiller,
          producer: result.producer,
          country: result.country,
          region: result.region,
          price: result.price,
          age: result.age,
          year: result.year,
          batch: result.batch,
          barrel: result.barrel,
          alcoholPercent: result.alcoholPercent,
          proof: result.proof,
          size: result.size,
          color: result.color,
          finishing: result.finishing,
          imageUrl: result.imageUrl,
          openDate: result.openDate,
          killDate: result.killDate,
        });
        await saveAnyDataToRedis({
          redisId: rid,
          bottleId: newBottle.id,
          ...result,
        });
        return redirect(`/reviews/new/setting?rid=${rid}`);
      } catch (error) {
        throw new Error(
          `Couldn't save bottle to database: ${JSON.stringify(error, null, 2)}`
        );
      }
    }
  }
};

export default function NewBottleRoute() {
  const redisData = useTypedLoaderData<typeof loader>();
  const errors = useTypedActionData<BottleErrors>();

  const transition = useTransition();
  const formIsSubmitting = transition.type === "actionSubmission";

  // image fetcher
  const imageFetcher = useTypedFetcher<ImageActionData>();
  const imageIsSubmitting = imageFetcher.type === "actionSubmission";
  const submissionSuccessful =
    imageFetcher.type === "done" &&
    typeof imageFetcher.data.imageSrc !== "undefined";

  return (
    <BottleForm
      data={redisData || null}
      errors={errors}
      imageFetcher={imageFetcher}
      formIsSubmitting={formIsSubmitting}
      imageIsSubmitting={imageIsSubmitting}
      submissionSuccessful={submissionSuccessful}
    />
  );
}
