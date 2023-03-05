import { v4 as uuid } from "uuid";
import type {
  LinksFunction,
  ActionArgs,
  LoaderArgs,
} from "@remix-run/server-runtime";
import { redirect, json } from "@remix-run/server-runtime";
import { createReview } from "~/models/review.server";
import { requireUserId } from "~/session.server";
import {
  deleteFormData,
  getAnyDataFromRedis,
  requireAnyFormData,
} from "~/utils/redis.server";
import ConfirmForm from "~/components/Form/ConfirmForm/ConfirmForm";
import CollapsedStyles from "~/styles/collapsed.css";
import type { RedisFormData } from "~/utils/types";
import ValidationMessage from "~/components/UI/ValidationMessage";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: CollapsedStyles,
      as: "style",
    },
    {
      rel: "stylesheet",
      href: CollapsedStyles,
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const formData = await requireAnyFormData(request);
  return formData;
};

interface ActionData {
  error?: string;
}

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const form = await request.formData();

  const redisFormId = form.get("redisId")?.toString();

  if (!redisFormId || typeof redisFormId === "undefined") {
    console.log(`NO REDIS FORM ID!`);
    return json<ActionData>({
      error: `We couldn't find the saved data. Please re-input it`,
    });
  }

  const rid = redisFormId;

  const redisObject = await getAnyDataFromRedis(rid);
  if (!redisObject) {
    console.log(`NO STORED REDIS OBJECT`);
    return json<ActionData>({
      error: `We couldn't find the saved data. Please re-input it`,
    });
  }

  const reviewId = uuid();

  const today = new Date();

  try {
    const newReview = await createReview({
      id: reviewId,
      updatedAt: today,
      createdAt: today,
      bottleId: redisObject.bottleId as string,
      userId,
      date: redisObject.date as string,
      setting: redisObject.setting as string,
      glassware: redisObject.glassware as string,
      restTime: redisObject.restTime as string,
      nose: redisObject.nose as string,
      palate: redisObject.palate as string,
      finish: redisObject.finish as string,
      thoughts: redisObject.thoughts as string,
      cherry: redisObject.cherry as number,
      strawberry: redisObject.strawberry as number,
      raspberry: redisObject.raspberry as number,
      blackberry: redisObject.blackberry as number,
      blueberry: redisObject.blueberry as number,
      apple: redisObject.apple as number,
      banana: redisObject.banana as number,
      grape: redisObject.grape as number,
      stone: redisObject.stone as number,
      citrus: redisObject.citrus as number,
      tropical: redisObject.tropical as number,
      pepper: redisObject.pepper as number,
      bakingSpice: redisObject.bakingSpice as number,
      cinnamon: redisObject.cinnamon as number,
      herbal: redisObject.herbal as number,
      mint: redisObject.mint as number,
      coffee: redisObject.coffee as number,
      tobacco: redisObject.tobacco as number,
      leather: redisObject.leather as number,
      oak: redisObject.oak as number,
      toasted: redisObject.toasted as number,
      smokey: redisObject.smokey as number,
      peanut: redisObject.peanut as number,
      almond: redisObject.almond as number,
      pecan: redisObject.pecan as number,
      walnut: redisObject.walnut as number,
      oily: redisObject.oily as number,
      floral: redisObject.floral as number,
      corn: redisObject.corn as number,
      rye: redisObject.rye as number,
      wheat: redisObject.wheat as number,
      malt: redisObject.malt as number,
      dough: redisObject.dough as number,
      vanilla: redisObject.vanilla as number,
      caramel: redisObject.caramel as number,
      molasses: redisObject.molasses as number,
      butterscotch: redisObject.butterscotch as number,
      honey: redisObject.honey as number,
      chocolate: redisObject.chocolate as number,
      toffee: redisObject.toffee as number,
      sugar: redisObject.sugar as number,
      overallRating: redisObject.overallRating as number,
      value: redisObject.value as number,
    });
    if (newReview) {
      await deleteFormData(rid);
      return redirect(`/reviews/${newReview.id}/comments`);
    }
  } catch (error) {
    console.log(`Error submitting review data: ${error}`);
    return redirect(`/reviews/new/confirm?rid=${rid}`);
  }
};

export default function NewConfirmationRoute() {
  const data = useTypedLoaderData<RedisFormData>();
  const actionData = useTypedActionData<ActionData>();

  return (
    <div className="w-full">
      <h1>Confirm your Review</h1>
      {actionData?.error ?? (
        <ValidationMessage error={actionData?.error} isSubmitting={false} />
      )}
      <ConfirmForm data={data} />
    </div>
  );
}
