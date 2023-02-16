import { json, redirect } from "@remix-run/server-runtime";
import type { LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { createBottle } from "~/models/bottle.server";
import { generateCode } from "~/utils/helpers.server";
import { v4 as uuid } from "uuid";
import type { BottleStatus } from "@prisma/client";
import type { CustomFormData } from "~/utils/helpers.server";
import type { ErrorData } from "./bottle";
import { getDataFromRedis, saveToRedis } from "~/utils/redis.server";
import ReviewBottleForm from "~/components/Form/ReviewBottleForm";
import { useTypedActionData, useTypedFetcher } from "remix-typedjson";
import { useOutletContext } from "@remix-run/react";
import type { ReviewContextType } from "../new";
import type { ImageActionData } from "~/routes/services/image";
import { useTransition } from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  // Handle user auth
  const redirectIfLoggedOut = new URL(request.url);
  const userId = await requireUserId(request);
  invariant(userId, "No user in session");
  if (!userId || typeof userId === "undefined") {
    redirect(`/login?redirectTo=${redirectIfLoggedOut}`);
  }

  const formData = await request.formData();

  const name = (await formData).get("name[name]")?.toString();
  const status = (await formData).get("status")?.toString();
  const type = (await formData).get("type")?.toString();
  const distiller = (await formData).get("distiller")?.toString();
  const producer = (await formData).get("producer")?.toString();
  const country = (await formData).get("country")?.toString();
  const region = (await formData).get("region")?.toString();
  const price = (await formData).get("price")?.toString();
  const age = (await formData).get("age")?.toString();
  const year = (await formData).get("year")?.toString();
  const batch = (await formData).get("batch")?.toString();
  const alcoholPercent = (await formData).get("alcoholPercent")?.toString();
  const proof = (await formData).get("proof")?.toString();
  const size = (await formData).get("size")?.toString();
  const color = (await formData).get("color")?.toString();
  const finishing = (await formData).get("finishing")?.toString();
  const imageUrl = (await formData).get("imageUrl")?.toString();
  const openDate = (await formData).get("openDate")?.toString();
  const killDate = (await formData).get("killDate")?.toString();

  // Iterate through fields and create error object
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
    return json<ErrorData>(errors);
  }

  // More validation
  invariant(name, `Name is required`);
  invariant(type, `Type is required`);
  invariant(distiller, `Distiller is required`);
  invariant(producer, `Producer is required`);
  invariant(country, `Country is required`);
  invariant(region, `Region is required`);
  invariant(price, `Price is required`);
  invariant(age, `Age is required`);
  invariant(year, `Year is required`);
  invariant(batch, `Batch is required`);
  invariant(alcoholPercent, `Alcohol is required`);
  invariant(proof, `Proof is required`);
  invariant(size, `Size is required`);
  invariant(color, `Color is required`);
  invariant(finishing, `Finishing is required`);

  const formId = (await formData).get("redisId")?.toString();

  let id = "";

  if (typeof formId === "string" && formId !== "") {
    id = formId;

    const formDataObject = await getDataFromRedis(id);
    if (!formDataObject) {
      return json<ErrorData>({
        general: `You must enable JavaScript for this form to work`,
      });
    }

    formDataObject.name = name;
    formDataObject.type = type;
    formDataObject.status = status as BottleStatus;
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
    formDataObject.imageUrl = imageUrl;

    await saveToRedis(formDataObject);

    try {
      await createBottle({
        id: uuid(),
        userId,
        imageUrl: imageUrl || "",
        name,
        status: status as BottleStatus,
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
        openDate: openDate ?? "",
        killDate: killDate ?? "",
      });
      return redirect(`/reviews/new/setting?id=${id}`);
    } catch (error) {
      console.error(`ERROR SUBMITTING: ${error}`);
      return redirect(`/bottles/new/bottle`);
    }
  } else {
    id = generateCode(6);
    const dataFormObject: CustomFormData = {
      userId,
      status: status as BottleStatus,
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
      imageUrl,
    };

    await saveToRedis(dataFormObject);

    try {
      await createBottle({
        id: uuid(),
        userId,
        imageUrl: imageUrl || "",
        name,
        status: status as BottleStatus,
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
        openDate: openDate ?? "",
        killDate: killDate ?? "",
      });
      return redirect(`/reviews/new/setting?id=${id}`);
    } catch (error) {
      console.error(`ERROR SUBMITTING: ${error}`);
      return redirect(`/reviews/new/bottle`);
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

export default function TestRoute() {
  const actionData = useTypedActionData<ErrorData>();
  const { state, stateSetter, setFormState } =
    useOutletContext<ReviewContextType>();
  const imageFetcher = useTypedFetcher<ImageActionData>();
  const transition = useTransition();
  const formIsSubmitting = transition.type === "actionSubmission";
  const submissionSuccessful =
    imageFetcher.type === "done" && imageFetcher.data.imageSrc !== undefined;

  const errors = actionData || {};

  if (!state || !stateSetter || !setFormState) {
    throw new Error(`Error with route context.`);
  }

  return (
    <ReviewBottleForm
      imageFetcher={imageFetcher}
      state={state}
      stateSetter={stateSetter}
      setFormState={setFormState}
      submissionSuccessful={submissionSuccessful}
      formIsSubmitting={formIsSubmitting}
      errors={errors}
    />
  );
}
