import { useOutletContext, useTransition } from "@remix-run/react";
import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import type { ReviewContextType } from "~/routes/reviews/new";
import NotesForm from "~/components/Form/NotesForm/NotesForm";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import type { CustomFormData } from "~/utils/helpers.server";
import { useTypedActionData, useTypedLoaderData } from "remix-typedjson";

interface ActionData {
  pepper?: string;
  bakingSpice?: string;
  cinnamon?: string;
  herbal?: string;
  mint?: string;
  cherry?: string;
  strawberry?: string;
  raspberry?: string;
  blackberry?: string;
  blueberry?: string;
  apple?: string;
  banana?: string;
  grape?: string;
  stone?: string;
  citrus?: string;
  tropical?: string;
  coffee?: string;
  tobacco?: string;
  leather?: string;
  oak?: string;
  toasted?: string;
  smokey?: string;
  peanut?: string;
  almond?: string;
  pecan?: string;
  walnut?: string;
  oily?: string;
  floral?: string;
  corn?: string;
  rye?: string;
  wheat?: string;
  malt?: string;
  dough?: string;
  vanilla?: string;
  caramel?: string;
  molasses?: string;
  butterscotch?: string;
  honey?: string;
  chocolate?: string;
  toffee?: string;
  sugar?: string;
  overallRating?: string;
  value?: string;
  general?: string;
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const redisId = formData.get("redisId")?.toString();
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

  // SWEET
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

  const bottleId = formData.get("bottleId")?.toString();
  if (typeof bottleId === "undefined" || !bottleId) {
    redirect(`/reviews/new/bottle`);
  }

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
      general: "Please only input numbers",
    });
  }

  const errors = {
    pepper: pepper || pepper === 0 ? undefined : "Pepper is required",
    bakingSpice:
      bakingSpice || bakingSpice === 0 ? undefined : "Baking Spice is required",
    cinnamon: cinnamon || cinnamon === 0 ? undefined : "Cinnamon is required",
    herbal: herbal || herbal === 0 ? undefined : "Herbal is required",
    mint: mint || mint === 0 ? undefined : "Mint is required",
    cherry: cherry || cherry === 0 ? undefined : "Cherry is required",
    strawberry:
      strawberry || strawberry === 0 ? undefined : "Strawberry is required",
    raspberry:
      raspberry || raspberry === 0 ? undefined : "Raspberry is required",
    blackberry:
      blackberry || blackberry === 0 ? undefined : "Blackberry is required",
    blueberry:
      blueberry || blueberry === 0 ? undefined : "Blueberry is required",
    apple: apple || apple === 0 ? undefined : "Apple is required",
    banana: banana || banana === 0 ? undefined : "Banana is required",
    grape: grape || grape === 0 ? undefined : "Grape is required",
    stone: stone || stone === 0 ? undefined : "Stone is required",
    citrus: citrus || citrus === 0 ? undefined : "Citrus is required",
    tropical: tropical || tropical === 0 ? undefined : "Tropical is required",
    coffee: coffee || coffee === 0 ? undefined : "Coffee is required",
    tobacco: tobacco || tobacco === 0 ? undefined : "Tobacco is required",
    leather: leather || leather === 0 ? undefined : "Leather is required",
    oak: oak || oak === 0 ? undefined : "Oak is required",
    toasted: toasted || toasted === 0 ? undefined : "Toasted is required",
    smokey: smokey || smokey === 0 ? undefined : "Smokey is required",
    peanut: peanut || peanut === 0 ? undefined : "Peanut is required",
    almond: almond || almond === 0 ? undefined : "Almond is required",
    pecan: pecan || pecan === 0 ? undefined : "Pecan is required",
    walnut: walnut || walnut === 0 ? undefined : "Walnut is required",
    oily: oily || oily === 0 ? undefined : "Oily is required",
    floral: floral || floral === 0 ? undefined : "Floral is required",
    corn: corn || corn === 0 ? undefined : "Corn is required",
    rye: rye || rye === 0 ? undefined : "Rye is required",
    wheat: wheat || wheat === 0 ? undefined : "Wheat is required",
    malt: malt || malt === 0 ? undefined : "Malt is required",
    dough: dough || dough === 0 ? undefined : "Dough is required",
    vanilla: vanilla || vanilla === 0 ? undefined : "Vanilla is required",
    caramel: caramel || caramel === 0 ? undefined : "Caramel is required",
    molasses: molasses || molasses === 0 ? undefined : "Molasses is required",
    butterscotch:
      butterscotch || butterscotch === 0
        ? undefined
        : "Butterscotch is required",
    honey: honey || honey === 0 ? undefined : "Honey is required",
    chocolate:
      chocolate || chocolate === 0 ? undefined : "Chocolate is required",
    toffee: toffee || toffee === 0 ? undefined : "Toffee is required",
    sugar: sugar || sugar === 0 ? undefined : "Sugar is required",
    overallRating:
      overallRating || overallRating === 0
        ? undefined
        : "Overall Rating is required",
    value: value || value === 0 ? undefined : "Value is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  const customFormData = await getDataFromRedis(redisId);

  if (!customFormData) {
    return json<ActionData>({
      general: "You must enable JavaScript for this form to work",
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

  return redirect(
    `/reviews/new/confirm?id=${customFormData.redisId}&bid=${bottleId}`
  );
};

type LoaderData = {
  formData: CustomFormData;
  bottleId: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const formData = await requireFormData(request);
  const url = new URL(request.url);
  const bottleId = url.searchParams.get("bid");

  if (typeof bottleId === "string") {
    return json<LoaderData>({
      formData,
      bottleId,
    });
  } else {
    throw new Error(
      `Bottle ID is not a string it is of type ${typeof bottleId} and has value ${JSON.stringify(
        bottleId,
        null,
        2
      )}`
    );
  }
};

export default function NewNotesRoute() {
  const loaderData = useTypedLoaderData<LoaderData>();
  const { state, stateSetter } = useOutletContext<ReviewContextType>();
  const errors = useTypedActionData<ActionData>();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : errors
    ? "error"
    : "idle";

  if (state === undefined || !stateSetter) {
    throw new Error(`Error with the Outlet Context`);
  }

  return (
    <div className="flex justify-center">
      <NotesForm
        formData={loaderData.formData}
        bottleId={loaderData.bottleId}
        formState={formState}
      />
    </div>
  );
}
