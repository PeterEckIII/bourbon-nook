import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import NoteForm from "~/components/Form/NoteForm";
import {
  getAnyDataFromRedis,
  requireAnyFormData,
  saveAnyDataToRedis,
} from "~/utils/redis.server";
import type { CustomFormData } from "~/utils/helpers.server";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
import type { NoteErrors, RedisFormData } from "~/utils/types";
import { handleFormData, noteSchema } from "~/utils/newHelpers.server";

export const loader = async ({ request }: LoaderArgs) => {
  const redisObject = await requireAnyFormData(request);
  return redisObject;
};

export const action = async ({ request }: ActionArgs) => {
  const { result, errors, formData } = await handleFormData(
    request,
    noteSchema
  );

  if (Object.keys(errors).length > 0) {
    return json<NoteErrors>(errors);
  }

  const redisFormId = formData.get("redisId")?.toString();
  if (typeof redisFormId === "undefined" || !redisFormId) {
    throw new Error(`Could not find an rid in the URL`);
  }

  const rid = redisFormId;

  const redisObject = await getAnyDataFromRedis(rid);
  if (!redisObject) {
    return json<NoteErrors>({
      general: `We couldn't find the saved data. Please re-input it`,
    });
  }

  try {
    redisObject.pepper = Number(result.pepper);
    redisObject.bakingSpice = Number(result.bakingSpice);
    redisObject.cinnamon = Number(result.cinnamon);
    redisObject.herbal = Number(result.herbal);
    redisObject.mint = Number(result.mint);
    redisObject.cherry = Number(result.cherry);
    redisObject.strawberry = Number(result.strawberry);
    redisObject.raspberry = Number(result.raspberry);
    redisObject.blackberry = Number(result.blackberry);
    redisObject.blueberry = Number(result.blueberry);
    redisObject.apple = Number(result.apple);
    redisObject.banana = Number(result.banana);
    redisObject.grape = Number(result.grape);
    redisObject.stone = Number(result.stone);
    redisObject.citrus = Number(result.citrus);
    redisObject.tropical = Number(result.tropical);
    redisObject.coffee = Number(result.coffee);
    redisObject.tobacco = Number(result.tobacco);
    redisObject.leather = Number(result.leather);
    redisObject.oak = Number(result.oak);
    redisObject.toasted = Number(result.toasted);
    redisObject.smokey = Number(result.smokey);
    redisObject.peanut = Number(result.peanut);
    redisObject.almond = Number(result.almond);
    redisObject.pecan = Number(result.pecan);
    redisObject.walnut = Number(result.walnut);
    redisObject.oily = Number(result.oily);
    redisObject.floral = Number(result.floral);
    redisObject.corn = Number(result.corn);
    redisObject.rye = Number(result.rye);
    redisObject.wheat = Number(result.wheat);
    redisObject.malt = Number(result.malt);
    redisObject.dough = Number(result.dough);
    redisObject.vanilla = Number(result.vanilla);
    redisObject.caramel = Number(result.caramel);
    redisObject.molasses = Number(result.molasses);
    redisObject.butterscotch = Number(result.butterscotch);
    redisObject.honey = Number(result.honey);
    redisObject.chocolate = Number(result.chocolate);
    redisObject.toffee = Number(result.toffee);
    redisObject.sugar = Number(result.sugar);
    redisObject.overallRating = Number(result.overallRating);
    redisObject.value = Number(result.value);

    await saveAnyDataToRedis(redisObject);
    return redirect(`/reviews/new/confirm?rid=${rid}`);
  } catch (error) {
    console.log(`Error saving Redis data: ${JSON.stringify(error, null, 2)}`);
    return json<NoteErrors>(errors as NoteErrors);
  }
};

export default function NewNotesRoute() {
  const data = useTypedLoaderData<RedisFormData | null>();
  const errors = useTypedActionData<NoteErrors | null>();

  return (
    <div className="flex justify-center">
      <NoteForm data={data} errors={errors} />
    </div>
  );
}
