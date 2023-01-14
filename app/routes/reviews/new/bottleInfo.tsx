import { json, redirect } from "@remix-run/server-runtime";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import {
  useActionData,
  useLoaderData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import type { ReviewContextType, Status } from "~/routes/reviews/new";
import BottleForm from "~/components/Form/BottleForm/BottleForm";
import { getDataFromRedis, saveToRedis } from "~/utils/redis.server";
import { generateCode } from "~/utils/helpers.server";
import type { CustomFormData } from "~/utils/helpers.server";
import { requireUserId } from "~/session.server";
import type { LoaderData } from "~/routes/services/combo";
import { useTypedFetcher } from "remix-typedjson/dist/remix";
import type { BottleStatus } from "@prisma/client";
import { ComboProvider } from "~/utils/useCombobox";

export type ComboLoadedData = {
  id: string;
  name: string;
  status: BottleStatus;
  type: string;
  distiller: string | null;
  producer: string | null;
  country: string | null;
  region: string | null;
  price: string | null;
  age: string | null;
  year: string | null;
  batch: string | null;
  alcoholPercent: string | null;
  proof: string | null;
  size: string | null;
  color: string | null;
  finishing: string | null;
  imageUrl: string | null;
};

interface ActionData {
  name?: string;
  type?: string;
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

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const name = formData.get("name[name]")?.toString();
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

  const formId = formData.get("id");
  let id = "";

  if (typeof formId === "string" && formId !== "") {
    console.log(formId);
    id = formId;

    const formDataObject = await getDataFromRedis(id);
    if (!formDataObject) {
      return json<ActionData>({
        general: "You must enable JavaScript for this form to work",
      });
    }

    formDataObject.name = name;
    formDataObject.status = status as Status;
    formDataObject.type = type;
    formDataObject.distiller = distiller;
    formDataObject.producer = producer;
    formDataObject.country = country;
    formDataObject.region = region;
    formDataObject.price = price;
    formDataObject.age = age;
    formDataObject.year = year;
    formDataObject.batch = batch;
    formDataObject.alcoholPercent = alcoholPercent;
    formDataObject.proof = proof;
    formDataObject.size = size;
    formDataObject.color = color;
    formDataObject.finishing = finishing;

    await saveToRedis(formDataObject);
  } else {
    id = generateCode(6);

    const formDataObject: CustomFormData = {
      userId,
      status: status as Status,
      redisId: id,
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
    };

    await saveToRedis(formDataObject);
  }
  return redirect(`/reviews/new/addImage?id=${id}`);
};

export const loader: LoaderFunction = async ({ request }) => {
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
  const data = useLoaderData<CustomFormData>();
  const { state, stateSetter, setFormState } =
    useOutletContext<ReviewContextType>();
  const actionData = useActionData<typeof action>();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.error
    ? "error"
    : "idle";

  if (state === undefined || !stateSetter) {
    throw new Error(`Error with the Outlet Context`);
  }

  const errors = actionData || {};

  return (
    <div>
      <BottleForm
        formData={data}
        state={state}
        changeHandler={stateSetter}
        formState={formState}
        errors={errors}
        isSubmitting={transition.state === "submitting"}
        setFormState={setFormState}
      />
    </div>
  );
}
