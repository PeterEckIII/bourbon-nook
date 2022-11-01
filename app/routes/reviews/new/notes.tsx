import {
  useActionData,
  useLoaderData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import type { ContextType } from "~/routes/reviews/new";
import NotesForm from "~/components/Form/NotesForm/NotesForm";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import type { CustomFormData } from "~/utils/helpers.server";

interface ActionData {
  error?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const redisId = formData.get("id")?.toString();
  // SPICE
  const pepper = Number(formData.get("pepper")?.toString());
  const bakingSpice = Number(formData.get("bakingSpice")?.toString());
  const cinnamon = Number(formData.get("cinnamon")?.toString());
  const herbal = Number(formData.get("herbal")?.toString());
  const mint = Number(formData.get("mint")?.toString());

  // FRUIT
  const cherry = Number(formData.get("cherry")?.toString());
  const strawberry = Number(formData.get("strawberry")?.toString());
  const raspberry = Number(formData.get("raspberry")?.toString());
  const blackberry = Number(formData.get("blackberry")?.toString());
  const blueberry = Number(formData.get("blueberry")?.toString());
  const apple = Number(formData.get("apple")?.toString());
  const banana = Number(formData.get("banana")?.toString());
  const grape = Number(formData.get("grape")?.toString());
  const stone = Number(formData.get("stone")?.toString());
  const citrus = Number(formData.get("citrus")?.toString());
  const tropical = Number(formData.get("tropical")?.toString());

  // EARTHY
  const coffee = Number(formData.get("coffee")?.toString());
  const tobacco = Number(formData.get("tobacco")?.toString());
  const leather = Number(formData.get("leather")?.toString());
  const oak = Number(formData.get("oak")?.toString());
  const toasted = Number(formData.get("toasted")?.toString());
  const smokey = Number(formData.get("smokey")?.toString());
  const peanut = Number(formData.get("peanut")?.toString());
  const almond = Number(formData.get("almond")?.toString());
  const pecan = Number(formData.get("pecan")?.toString());
  const walnut = Number(formData.get("walnut")?.toString());
  const oily = Number(formData.get("oily")?.toString());
  const floral = Number(formData.get("floral")?.toString());

  // GRAIN
  const corn = Number(formData.get("corn")?.toString());
  const rye = Number(formData.get("rye")?.toString());
  const wheat = Number(formData.get("wheat")?.toString());
  const malt = Number(formData.get("malt")?.toString());
  const dough = Number(formData.get("dough")?.toString());

  const vanilla = Number(formData.get("vanilla")?.toString());
  const caramel = Number(formData.get("caramel")?.toString());
  const molasses = Number(formData.get("molasses")?.toString());
  const butterscotch = Number(formData.get("butterscotch")?.toString());
  const honey = Number(formData.get("honey")?.toString());
  const chocolate = Number(formData.get("chocolate")?.toString());
  const toffee = Number(formData.get("toffee")?.toString());
  const sugar = Number(formData.get("sugar")?.toString());
  const overallRating = Number(formData.get("overallRating")?.toString());
  const value = Number(formData.get("value")?.toString());

  if (
    typeof redisId !== "string" ||
    typeof pepper !== "number" ||
    typeof bakingSpice !== "number" ||
    typeof cinnamon !== "number" ||
    typeof herbal !== "number" ||
    typeof mint !== "number" ||
    typeof cherry !== "number" ||
    typeof strawberry !== "number" ||
    typeof raspberry !== "number" ||
    typeof blackberry !== "number" ||
    typeof blueberry !== "number" ||
    typeof apple !== "number" ||
    typeof banana !== "number" ||
    typeof grape !== "number" ||
    typeof stone !== "number" ||
    typeof citrus !== "number" ||
    typeof tropical !== "number" ||
    typeof coffee !== "number" ||
    typeof tobacco !== "number" ||
    typeof leather !== "number" ||
    typeof oak !== "number" ||
    typeof toasted !== "number" ||
    typeof smokey !== "number" ||
    typeof peanut !== "number" ||
    typeof almond !== "number" ||
    typeof pecan !== "number" ||
    typeof walnut !== "number" ||
    typeof oily !== "number" ||
    typeof floral !== "number" ||
    typeof peanut !== "number" ||
    typeof corn !== "number" ||
    typeof rye !== "number" ||
    typeof wheat !== "number" ||
    typeof malt !== "number" ||
    typeof dough !== "number" ||
    typeof vanilla !== "number" ||
    typeof caramel !== "number" ||
    typeof molasses !== "number" ||
    typeof butterscotch !== "number" ||
    typeof honey !== "number" ||
    typeof chocolate !== "number" ||
    typeof toffee !== "number" ||
    typeof sugar !== "number" ||
    typeof overallRating !== "number" ||
    typeof value !== "number"
  ) {
    return json<ActionData>({
      error: "Please only input numbers",
    });
  }

  const customFormData = await getDataFromRedis(redisId);

  if (!customFormData) {
    return json<ActionData>({
      error: "You must enable JavaScript for this form to work",
    });
  }

  customFormData.pepper = pepper;
  customFormData.bakingSpice = bakingSpice;
  customFormData.cinnamon = cinnamon;
  customFormData.herbal = herbal;
  customFormData.mint = mint;
  customFormData.cherry = cherry;
  customFormData.strawberry = strawberry;
  customFormData.raspberry = raspberry;
  customFormData.blackberry = blackberry;
  customFormData.blueberry = blueberry;
  customFormData.apple = apple;
  customFormData.banana = banana;
  customFormData.grape = grape;
  customFormData.stone = stone;
  customFormData.citrus = citrus;
  customFormData.tropical = tropical;
  customFormData.coffee = coffee;
  customFormData.tobacco = tobacco;
  customFormData.leather = leather;
  customFormData.oak = oak;
  customFormData.toasted = toasted;
  customFormData.smokey = smokey;
  customFormData.peanut = peanut;
  customFormData.almond = almond;
  customFormData.pecan = pecan;
  customFormData.walnut = walnut;
  customFormData.oily = oily;
  customFormData.floral = floral;
  customFormData.corn = corn;
  customFormData.rye = rye;
  customFormData.wheat = wheat;
  customFormData.malt = malt;
  customFormData.dough = dough;
  customFormData.vanilla = vanilla;
  customFormData.caramel = caramel;
  customFormData.molasses = molasses;
  customFormData.butterscotch = butterscotch;
  customFormData.honey = honey;
  customFormData.chocolate = chocolate;
  customFormData.toffee = toffee;
  customFormData.sugar = sugar;
  customFormData.overallRating = overallRating;
  customFormData.value = value;

  await saveToRedis(customFormData);

  return redirect(`/reviews/new/confirm?id=${customFormData.redisId}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  const formData = await requireFormData(request);

  return formData;
};

export default function NewNotesRoute() {
  const formData = useLoaderData<CustomFormData>();
  const { state, stateSetter } = useOutletContext<ContextType>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.error
    ? "error"
    : "idle";

  if (state === undefined || !stateSetter) {
    throw new Error(`Error with the Outlet Context`);
  }

  return (
    <div className="flex justify-center">
      <NotesForm formData={formData} formState={formState} />
    </div>
  );
}
