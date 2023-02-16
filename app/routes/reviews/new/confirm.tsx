import { v4 as uuid } from "uuid";
import {
  useActionData,
  useLoaderData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import type {
  ActionFunction,
  LinksFunction,
  ActionArgs,
  LoaderArgs,
} from "@remix-run/server-runtime";
import { redirect, json } from "@remix-run/server-runtime";
import { createReview } from "~/models/review.server";
import { requireUserId } from "~/session.server";
import type { ReviewContextType } from "../new";
import {
  deleteFormData,
  getDataFromRedis,
  requireFormData,
} from "~/utils/redis.server";
import type { CustomFormData } from "~/utils/helpers.server";
import ConfirmForm from "~/components/Form/ConfirmForm/ConfirmForm";
import CollapsedStyles from "~/styles/collapsed.css";

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
interface ActionData {
  error?: string;
}

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  if (userId === null) {
    redirect("/login");
  }

  const form = await request.formData();
  const imageUrl = form.get("imageUrl")?.toString();
  const redisId = form.get("redisId")?.toString();
  const bottleId = form.get("bottleId")?.toString();

  if (typeof redisId !== "string" || typeof bottleId !== "string") {
    return json<ActionData>({
      error: "Form data is invalid",
    });
  }

  const customFormData = await getDataFromRedis(redisId);

  if (!customFormData) {
    return json<ActionData>({
      error: "You must enable JavasScript for this form to work",
    });
  }

  const today = new Date();
  const reviewId = uuid();

  const newReview = await createReview({
    id: reviewId,
    bottleId: bottleId,
    userId,
    createdAt: today,
    updatedAt: today,
    date: customFormData.date as string,
    setting: customFormData.setting as string,
    glassware: customFormData.glassware as string,
    restTime: customFormData.restTime as string,
    nose: customFormData.nose as string,
    palate: customFormData.palate as string,
    finish: customFormData.finish as string,
    thoughts: customFormData.thoughts as string,
    cherry: customFormData.cherry as number,
    strawberry: customFormData.strawberry as number,
    raspberry: customFormData.raspberry as number,
    blackberry: customFormData.blackberry as number,
    blueberry: customFormData.blueberry as number,
    apple: customFormData.apple as number,
    banana: customFormData.banana as number,
    grape: customFormData.grape as number,
    stone: customFormData.stone as number,
    citrus: customFormData.citrus as number,
    tropical: customFormData.tropical as number,
    pepper: customFormData.pepper as number,
    bakingSpice: customFormData.bakingSpice as number,
    cinnamon: customFormData.cinnamon as number,
    herbal: customFormData.herbal as number,
    mint: customFormData.mint as number,
    coffee: customFormData.coffee as number,
    tobacco: customFormData.tobacco as number,
    leather: customFormData.leather as number,
    oak: customFormData.oak as number,
    toasted: customFormData.toasted as number,
    smokey: customFormData.smokey as number,
    peanut: customFormData.peanut as number,
    almond: customFormData.almond as number,
    pecan: customFormData.pecan as number,
    walnut: customFormData.walnut as number,
    oily: customFormData.oily as number,
    floral: customFormData.floral as number,
    corn: customFormData.corn as number,
    rye: customFormData.rye as number,
    wheat: customFormData.wheat as number,
    malt: customFormData.malt as number,
    dough: customFormData.dough as number,
    vanilla: customFormData.vanilla as number,
    caramel: customFormData.caramel as number,
    molasses: customFormData.molasses as number,
    butterscotch: customFormData.butterscotch as number,
    honey: customFormData.honey as number,
    chocolate: customFormData.chocolate as number,
    toffee: customFormData.toffee as number,
    sugar: customFormData.sugar as number,
    overallRating: customFormData.overallRating as number,
    value: customFormData.value as number,
  });
  if (!newReview) {
    return json(
      { errors: { message: "ERROR SUBMITTING REVIEW!" } },
      { status: 400 }
    );
  }

  await deleteFormData(redisId);
  return redirect(`/reviews/${newReview.id}/comments`);
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
    redirect("/reviews/new/bottle");
  }
};

export default function NewConfirmationRoute() {
  const loaderData = useLoaderData<LoaderData>();
  const { state } = useOutletContext<ReviewContextType>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.error
    ? "error"
    : "idle";

  return (
    <div>
      <h1>Confirm your Review</h1>
      <ConfirmForm
        formData={loaderData.formData}
        bottleId={loaderData.bottleId}
        imageUrl={state.imageUrl}
        formState={formState}
      />
    </div>
  );
}
