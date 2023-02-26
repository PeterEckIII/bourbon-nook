import { Form, Link } from "@remix-run/react";
import { json, redirect } from "@remix-run/server-runtime";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";
import { z } from "zod";
import NoteInput from "~/components/UI/Inputs/NoteInput";
import type { RedisFormData } from "~/utils/types";
import { handleFormData, noteSchema } from "~/utils/newHelpers.server";
import {
  getAnyDataFromRedis,
  requireAnyFormData,
  saveAnyDataToRedis,
} from "~/utils/redis.server";
import Button from "~/components/UI/Button";
import type { NoteErrors } from "~/utils/types";

export const loader = async ({ request }: LoaderArgs) => {
  const redisObject = await requireAnyFormData(request);
  return redisObject;
};

export const action = async ({ request }: ActionArgs) => {};

export default function NotesRoute() {
  const data = useTypedLoaderData<RedisFormData | null>();
  const errors = useTypedActionData<NoteErrors>();
  return (
    <div className="m-4 w-full rounded-xl bg-white p-6">
      <Form method="post">
        <input type="hidden" name="redisId" value={data?.redisId} />
        <input type="hidden" name="bottleId" value={data?.bottleId} />
        <NoteInput
          name="coffee"
          labelName="Coffee"
          emoji="☕"
          defaultValue={data?.coffee}
          error={errors?.coffee}
        />
        <NoteInput
          labelName="Tobacco Leaf"
          emoji="🍁"
          name="tobacco"
          defaultValue={data?.tobacco}
          error={errors?.tobacco}
        />
        <NoteInput
          name="leather"
          labelName="Leather"
          defaultValue={data?.leather}
          error={errors?.leather}
        />
        <NoteInput
          labelName="Oak"
          emoji="🪵"
          name="oak"
          defaultValue={data?.oak}
          error={errors?.oak}
        />
        <NoteInput
          labelName="Toasted"
          emoji="🍞"
          name="toasted"
          defaultValue={data?.toasted}
          error={errors?.toasted}
        />
        <NoteInput
          labelName="Smokey"
          emoji="💨"
          name="smokey"
          defaultValue={data?.smokey}
          error={errors?.smokey}
        />
        <NoteInput
          labelName="Peanut"
          emoji="🥜"
          name="peanut"
          defaultValue={data?.peanut}
          error={errors?.peanut}
        />
        <NoteInput
          labelName="Almond"
          name="almond"
          defaultValue={data?.almond}
          error={errors?.almond}
        />
        <NoteInput
          labelName="Pecan"
          name="pecan"
          defaultValue={data?.pecan}
          error={errors?.pecan}
        />
        <NoteInput
          labelName="Walnut"
          name="walnut"
          defaultValue={data?.walnut}
          error={errors?.walnut}
        />
        <NoteInput
          labelName="Oily"
          emoji="🛢️"
          name="oily"
          defaultValue={data?.oily}
          error={errors?.oily}
        />
        <NoteInput
          labelName="Floral"
          emoji="🌹"
          name="floral"
          defaultValue={data?.floral}
          error={errors?.floral}
        />
        <NoteInput
          labelName="Cherry"
          emoji="🍒"
          name="cherry"
          defaultValue={data?.cherry}
          error={errors?.cherry}
        />
        <NoteInput
          labelName="Strawberry"
          emoji="🍓"
          name="strawberry"
          defaultValue={data?.strawberry}
          error={errors?.strawberry}
        />
        <NoteInput
          name="raspberry"
          labelName="Raspberry"
          defaultValue={data?.raspberry}
          error={errors?.raspberry}
        />
        <NoteInput
          name="blackberry"
          labelName="Blackberry"
          defaultValue={data?.blackberry}
          error={errors?.blackberry}
        />
        <NoteInput
          labelName="Blueberry"
          emoji="🫐"
          name="blueberry"
          defaultValue={data?.blueberry}
          error={errors?.blueberry}
        />
        <NoteInput
          labelName="Apple"
          emoji="🍎"
          name="apple"
          defaultValue={data?.apple}
          error={errors?.apple}
        />
        <NoteInput
          labelName="Banana"
          emoji="🍌"
          name="banana"
          defaultValue={data?.banana}
          error={errors?.banana}
        />
        <NoteInput
          labelName="Grape"
          emoji="🍇"
          name="grape"
          defaultValue={data?.grape}
          error={errors?.grape}
        />
        <NoteInput
          labelName="Stone Fruit"
          emoji="🍑"
          name="stone"
          defaultValue={data?.stone}
          error={errors?.stone}
        />
        <NoteInput
          labelName="Citrus"
          emoji="🍋"
          name="citrus"
          defaultValue={data?.citrus}
          error={errors?.citrus}
        />
        <NoteInput
          labelName="Tropical"
          emoji="🍍"
          name="tropical"
          defaultValue={data?.tropical}
          error={errors?.tropical}
        />
        <NoteInput
          name="corn"
          defaultValue={data?.corn}
          emoji="🌽"
          labelName="Corn"
          error={errors?.corn}
        />
        <NoteInput
          name="rye"
          labelName="Rye"
          defaultValue={data?.rye}
          error={errors?.rye}
        />
        <NoteInput
          name="wheat"
          labelName="Wheat"
          defaultValue={data?.wheat}
          error={errors?.wheat}
        />
        <NoteInput
          name="malt"
          emoji="🍺"
          defaultValue={data?.malt}
          labelName="Malt"
          error={errors?.malt}
        />
        <NoteInput
          name="dough"
          emoji="🥖"
          defaultValue={data?.dough}
          labelName="Dough / Bread"
          error={errors?.dough}
        />
        <NoteInput
          labelName="Vanilla"
          emoji="🍦"
          name="vanilla"
          defaultValue={data?.vanilla}
          error={errors?.vanilla}
        />
        <NoteInput
          labelName="Caramel"
          emoji="🍮"
          name="caramel"
          defaultValue={data?.caramel}
          error={errors?.caramel}
        />
        <NoteInput
          name="molasses"
          labelName="Molasses"
          defaultValue={data?.molasses}
          emoji="🥞"
          error={errors?.molasses}
        />
        <NoteInput
          name="butterscotch"
          labelName="Butterscotch"
          defaultValue={data?.butterscotch}
          emoji="🧈"
          error={errors?.butterscotch}
        />

        <NoteInput
          labelName="Honey"
          emoji="🍯"
          name="honey"
          defaultValue={data?.honey}
          error={errors?.honey}
        />
        <NoteInput
          labelName="Chocolate"
          emoji="🍫"
          name="chocolate"
          defaultValue={data?.chocolate}
          error={errors?.chocolate}
        />
        <NoteInput
          name="toffee"
          labelName="Toffee"
          defaultValue={data?.toffee}
          emoji="🍬"
          error={errors?.toffee}
        />
        <NoteInput
          labelName="Powdered Sugar"
          emoji="🥄"
          name="sugar"
          defaultValue={data?.sugar}
          error={errors?.sugar}
        />
        <NoteInput
          name="pepper"
          labelName="Black Pepper"
          defaultValue={data?.pepper}
          error={errors?.pepper}
        />
        <NoteInput
          name="cinnamon"
          labelName="Cinnamon"
          defaultValue={data?.cinnamon}
          error={errors?.cinnamon}
        />
        <NoteInput
          name="bakingSpice"
          labelName="Baking Spice"
          defaultValue={data?.bakingSpice}
          error={errors?.bakingSpice}
        />
        <NoteInput
          name="herbal"
          labelName="Herbal"
          defaultValue={data?.herbal}
          emoji="🌿"
          error={errors?.herbal}
        />
        <NoteInput
          name="mint"
          labelName="Mint"
          defaultValue={data?.mint}
          error={errors?.mint}
        />
        <NoteInput
          labelName="Value for Money"
          name="value"
          defaultValue={data?.value}
          emoji="💰"
          error={errors?.value}
        />
        <NoteInput
          labelName="Overall Rating"
          name="overallRating"
          defaultValue={data?.overallRating}
          emoji="💯"
          error={errors?.overallRating}
        />
        <div className="space-between flex">
          <div>
            <Link to={`/tester/new/setting?rid=${data?.redisId}`}>
              <Button callToAction="Back" type="button" />
            </Link>
          </div>
          <div>
            <Button type="submit" callToAction="Next" />
          </div>
        </div>
      </Form>
    </div>
  );
}
