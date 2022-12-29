import {
  useActionData,
  useLoaderData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { v4 as uuid } from "uuid";
import { createBottle } from "~/models/bottle.server";
import type { Status } from "~/routes/reviews/new";
import { requireUserId } from "~/session.server";
import type { BottleContextType } from "../new";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import StandaloneBottleForm from "~/components/Form/StandaloneBottleForm";
import { CustomBottleFormData, generateCode } from "~/utils/helpers.server";

interface ActionData {
  name?: string;
  type?: string;
  status?: string;
  distiller?: string;
  producer?: string;
  country?: string;
  region?: string;
  price?: string;
  age?: string;
  year?: string;
  batch?: string;
  alcoholPercent?: string;
  proof?: string;
  size?: string;
  color?: string;
  finishing?: string;
  general?: string;
}

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const name = formData.get("name")?.toString();
  const status = formData.get("status")?.toString();
  const type = formData.get("type")?.toString();
  const distiller = formData.get("distiller")?.toString();
  const producer = formData.get("producer")?.toString();
  const country = formData.get("country")?.toString();
  const region = formData.get("region")?.toString();
  const price = formData.get("price")?.toString();
  const age = formData.get("age")?.toString();
  const year = formData.get("year")?.toString();
  const batch = formData.get("batch")?.toString();
  const alcoholPercent = formData.get("alcoholPercent")?.toString();
  const proof = formData.get("proof")?.toString();
  const size = formData.get("size")?.toString();
  const color = formData.get("color")?.toString();
  const finishing = formData.get("finishing")?.toString();

  const errors = {
    name: name ? undefined : "Name is required",
    status:
      status && ["CLOSED", "OPENED", "FINISHED"].indexOf(status) > -1
        ? undefined
        : "Status must be one of 'OPENED', 'CLOSED', or 'FINISHED'",
    type: type ? undefined : "Type is required",
    distiller: distiller ? undefined : "Distiller is required",
    producer: producer ? undefined : "Producer is required",
    country: country ? undefined : "Country is required",
    region: region ? undefined : "Region is required",
    price: price ? undefined : "Price is required",
    age: age ? undefined : "Age is required",
    year: year ? undefined : "Year is required",
    batch: batch
      ? undefined
      : "Batch is required. Please put 'N/A' if no batch",
    alcoholPercent: alcoholPercent ? undefined : "Alcohol Percent is required",
    proof: proof ? undefined : "Proof is required",
    size: size ? undefined : "Size is required",
    color: color ? undefined : "Color is required",
    finishing: finishing
      ? undefined
      : "Finishing is required. Please put 'None' if no finish",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  if (
    typeof name !== "string" ||
    typeof status !== "string" ||
    typeof type !== "string" ||
    typeof distiller !== "string" ||
    typeof producer !== "string" ||
    typeof country !== "string" ||
    typeof region !== "string" ||
    typeof price !== "string" ||
    typeof age !== "string" ||
    typeof year !== "string" ||
    typeof batch !== "string" ||
    typeof alcoholPercent !== "string" ||
    typeof proof !== "string" ||
    typeof size !== "string" ||
    typeof color !== "string" ||
    typeof finishing !== "string"
  ) {
    throw new Error(
      `Invalid input. Please only use letters, numbers, and symbols`
    );
  }

  const bottleId = uuid();

  const formId = formData.get("redisId");
  let id = "";

  if (typeof formId === "string" && formId !== "") {
    id = formId;

    const formDataObject = await getDataFromRedis(id);
    if (!formDataObject) {
      return json<ActionData>({
        general: "You must enable JavaScript for this form to work",
      });
    }
    const imageUrl = formDataObject.imageUrl ?? "";
    try {
      await createBottle({
        id: bottleId,
        imageUrl,
        userId,
        status: status as Status,
        name,
        type,
        distiller,
        producer,
        country,
        region,
        price,
        age,
        year,
        batch,
        alcoholPercent,
        proof,
        size,
        color,
        finishing,
      });
      return redirect(`/bottles/`);
    } catch (error) {
      throw new Error(`Could not save the bottle: ${error}`);
    }
  } else {
    try {
      await createBottle({
        id: bottleId,
        imageUrl: "",
        userId,
        status: status as Status,
        name,
        type,
        distiller,
        producer,
        country,
        region,
        price,
        age,
        year,
        batch,
        alcoholPercent,
        proof,
        size,
        color,
        finishing,
      });
      return redirect(`/bottles/`);
    } catch (error) {
      throw new Error(`Could not save the bottle: ${error}`);
    }
  }
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (typeof id !== "string" || !id) {
    return null;
  }

  const formData = await getDataFromRedis(id);

  if (!formData) {
    return null;
  }
  return formData;
};

export default function NewBottleInfoRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state, stateSetter, setFormState } =
    useOutletContext<BottleContextType>();

  const transition = useTransition();

  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData
    ? "error"
    : "idle";

  if (state === undefined || !stateSetter) {
    throw new Error(`Error with Outlet Context`);
  }

  const errors = actionData || {};

  return (
    <StandaloneBottleForm
      formData={loaderData}
      state={state}
      changeHandler={stateSetter}
      formState={formState}
      errors={errors}
      isSubmitting={transition.state === "submitting"}
      setFormState={setFormState}
    />
  );
}
