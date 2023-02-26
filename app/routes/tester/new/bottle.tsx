import { useTransition } from "@remix-run/react";
import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import {
  useTypedActionData,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import { createBottle, editBottle, getBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { generateCode } from "~/utils/helpers.server";
import type { ComboData, RedisFormData } from "~/utils/types";
import { getAnyDataFromRedis, saveAnyDataToRedis } from "~/utils/redis.server";
import { z } from "zod";
import { handleFormData, bottleSchema } from "~/utils/newHelpers.server";
import type { bottle, BottleStatus } from "@prisma/client";
import invariant from "tiny-invariant";
import type { BottleErrors } from "~/utils/types";
import BottleForm from "~/components/Form/BottleForm";
import { useEffect, useState } from "react";
import type { ImageData } from "~/utils/types";
import useDebounce from "~/utils/useDebounce";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const rid = url.searchParams.get("rid");
  if (typeof rid !== "string" || !rid) {
    return null;
  }
  const redisData = await getAnyDataFromRedis(rid);
  if (!redisData) {
    return null;
  }
  return redisData;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const { result, errors, formData } = await handleFormData(
    request,
    bottleSchema
  );

  const redisFormId = formData.get("redisId")?.toString();

  let rid = "";

  if (typeof redisFormId !== "string" || redisFormId === "") {
    rid = generateCode(6);

    const newRedisObject: RedisFormData = {
      userId,
      redisId: rid,
      status: result.status as BottleStatus,
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
      return redirect(`/tester/new/setting?rid=${rid}`);
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
        status: result.status as BottleStatus,
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
        const newResult = await editBottle(updatedBottle);
        await saveAnyDataToRedis({
          redisId: rid,
          bottleId: newResult.id,
          ...updatedBottle,
        });
        return redirect(`/tester/new/setting?rid=${rid}`);
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
          status: result.status as BottleStatus,
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
        });
        await saveAnyDataToRedis({
          redisId: rid,
          bottleId: newBottle.id,
          ...result,
        });
        return redirect(`/tester/setting?rid=${rid}`);
      } catch (error) {
        throw new Error(
          `Couldn't save bottle to database: ${JSON.stringify(error, null, 2)}`
        );
      }
    }
  }
};

export default function TesterBottleRoute() {
  const [value, setValue] = useState<{} | bottle | string>("");
  const [query, setQuery] = useState<string>("");
  const queryTerm = useDebounce(value, 400);

  const errors = useTypedActionData<BottleErrors>();
  const redisData = useTypedLoaderData<RedisFormData | null>();

  const imageFetcher = useTypedFetcher<ImageData>();
  const combo = useTypedFetcher<ComboData>();
  const { data: comboData, load } = combo;

  let bottles = comboData?.bottles || [];

  if (typeof value === "undefined") {
    throw new Error(`Something bad happened`);
  }

  const transition = useTransition();
  const formIsSubmitting = transition.type === "actionSubmission";

  const imageIsSubmitting = imageFetcher.type === "actionSubmission";
  const submissionSuccessful =
    imageFetcher.type === "done" &&
    typeof imageFetcher.data.imageSrc !== "undefined";

  useEffect(() => {
    function getInitialData() {
      load(`/services/combo`);
    }
    getInitialData();
  }, [load]);

  useEffect(() => {
    function getFilteredBottles() {
      load(`/services/combo?query=${queryTerm}`);
    }
    getFilteredBottles();
  }, [load, queryTerm]);

  return (
    <BottleForm
      data={redisData || null}
      errors={errors}
      imageFetcher={imageFetcher}
      imageIsSubmitting={imageIsSubmitting}
      submissionSuccessful={submissionSuccessful}
      formIsSubmitting={formIsSubmitting}
    />
  );
}
