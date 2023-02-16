import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import { Form, useOutletContext, useTransition } from "@remix-run/react";
import StatusInput from "~/components/UI/Inputs/StatusInput";
import TextInput from "~/components/UI/Inputs/TextInput";
import ImageUploader from "~/components/Form/ImageUploader";
import PrependedInput from "~/components/UI/Inputs/PrependedInput";
import PostpendedInput from "~/components/UI/Inputs/PostpendedInput";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { v4 as uuid } from "uuid";
import { createBottle } from "~/models/bottle.server";
import type { bottle, BottleStatus } from "@prisma/client";
import {
  useTypedActionData,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import Button from "~/components/UI/Button";
import type { ImageActionData } from "~/routes/services/image";
import type { BottleContextType } from "~/routes/bottles/new";
import ComboBox from "~/components/UI/Combobox/Combobox";
import { useEffect, useState } from "react";
import useDebounce from "~/utils/useDebounce";
import type { LoaderData as ComboData } from "~/routes/services/combo";
import { getDataFromRedis, saveToRedis } from "~/utils/redis.server";
import { generateCode } from "~/utils/helpers.server";
import type { CustomFormData } from "~/utils/helpers.server";

export type ErrorData = {
  imageSrc?: string;
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
};

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
      const bottle = await createBottle({
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
      return redirect(`/reviews/new/setting?id=${id}&bid=${bottle.id}`);
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
      const bottle = await createBottle({
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
      return redirect(`/reviews/new/setting?id=${id}&bid=${bottle.id}`);
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

export default function NewBottleRoute() {
  const [value, setValue] = useState<{} | bottle | string>("");
  const [query, setQuery] = useState<string>("");
  const errors = useTypedActionData<ErrorData>();
  const formData = useTypedLoaderData<typeof loader>();

  const { state, stateSetter, setFormState } =
    useOutletContext<BottleContextType>();
  const queryTerm = useDebounce(value, 400);
  const combo = useTypedFetcher<ComboData>();
  const { data, load } = combo;

  let bottles = data?.bottles || [];

  if (typeof value === "undefined") {
    throw new Error(`No!`);
  }

  const transition = useTransition();
  const formIsSubmitting = transition.type === "actionSubmission";

  // image fetcher
  const imageFetcher = useTypedFetcher<ImageActionData>();
  const imageIsSubmitting = imageFetcher.type === "actionSubmission";
  const submissionSuccessful =
    imageFetcher.type === "done" && imageFetcher.data.imageSrc;

  if (!state || !stateSetter || !setFormState) {
    throw new Error(`Error with route context.`);
  }

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
  }, [queryTerm, load]);

  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold text-white">
          Bottle Information
        </h2>
        <div
          id="form-container"
          className="max-h-800 flex flex-col rounded-xl border border-gray-200 bg-white p-4 lg:flex-row"
        >
          <div
            id="image-container"
            className="m-4 w-full lg:block lg:h-full lg:w-1/3"
          >
            <imageFetcher.Form
              encType="multipart/form-data"
              method="post"
              action="/services/image"
              className="h-full"
            >
              <ImageUploader imageFetcher={imageFetcher} />
              <Button
                type="submit"
                callToAction={
                  imageIsSubmitting ? "Uploading..." : "Upload Image"
                }
              />
            </imageFetcher.Form>
          </div>
          <Form
            method="post"
            className="-mx-3 my-3 mb-6 flex w-full flex-wrap p-2 sm:p-6 lg:w-2/3"
          >
            {submissionSuccessful ? (
              <input
                type="hidden"
                name="imageUrl"
                value={imageFetcher.data.imageSrc}
              />
            ) : null}
            <input type="hidden" name="redisId" value={formData?.redisId} />
            <ComboBox
              value={value}
              setValue={setValue}
              query={query}
              setQuery={setQuery}
              bottles={bottles}
              queryTerm={queryTerm}
            />
            <div className="mb-2 flex w-full px-3 md:mb-0">
              <span className="mr-8 flex items-center">Bottle Status</span>
              <StatusInput
                state={state}
                loadedStatus={"OPENED"}
                setFormState={setFormState}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Distiller"
                name="distiller"
                value={state.distiller}
                changeHandler={(e) => stateSetter(e)}
                emoji="🌱"
                isSubmitting={formIsSubmitting}
                error={errors?.distiller}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Producer"
                name="producer"
                value={state.producer}
                changeHandler={(e) => stateSetter(e)}
                emoji="🏗️"
                isSubmitting={formIsSubmitting}
                error={errors?.producer}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Type"
                name="type"
                value={state.type}
                changeHandler={(e) => stateSetter(e)}
                emoji="©️"
                isSubmitting={formIsSubmitting}
                error={errors?.type}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Country of Origin"
                name="country"
                value={state.country}
                changeHandler={(e) => stateSetter(e)}
                emoji="🌎"
                isSubmitting={formIsSubmitting}
                error={errors?.country}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Region"
                name="region"
                value={state.region}
                changeHandler={(e) => stateSetter(e)}
                emoji="🏔️"
                isSubmitting={formIsSubmitting}
                error={errors?.region}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <PrependedInput
                prependedCharacter="$"
                type="text"
                labelName="Price"
                name="price"
                value={state.price}
                changeHandler={(e) => stateSetter(e)}
                emoji="💲"
                isSubmitting={formIsSubmitting}
                error={errors?.price}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Age"
                name="age"
                value={state.age}
                changeHandler={(e) => stateSetter(e)}
                emoji="👴"
                isSubmitting={formIsSubmitting}
                error={errors?.age}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Color"
                name="color"
                value={state.color}
                changeHandler={(e) => stateSetter(e)}
                emoji="🌈"
                isSubmitting={formIsSubmitting}
                error={errors?.color}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Year"
                name="year"
                value={state.year}
                changeHandler={(e) => stateSetter(e)}
                emoji="📆"
                isSubmitting={formIsSubmitting}
                error={errors?.year}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Batch / Barrel"
                name="batch"
                value={state.batch}
                changeHandler={(e) => stateSetter(e)}
                emoji="2️⃣"
                isSubmitting={formIsSubmitting}
                error={errors?.batch}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Size"
                name="size"
                value={state.size}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍆"
                isSubmitting={formIsSubmitting}
                error={errors?.size}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <PostpendedInput
                postpendedCharacter="%"
                type="text"
                labelName="Alcohol Percent"
                name="alcoholPercent"
                value={state.alcoholPercent}
                changeHandler={(e) => stateSetter(e)}
                emoji="💫"
                isSubmitting={formIsSubmitting}
                error={errors?.alcoholPercent}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <PostpendedInput
                postpendedCharacter="pf"
                type="text"
                labelName="Proof"
                name="proof"
                value={state.proof}
                changeHandler={(e) => stateSetter(e)}
                emoji="🔥"
                isSubmitting={formIsSubmitting}
                error={errors?.proof}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Finishing"
                name="finishing"
                value={state.finishing}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error={errors?.finishing}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Open Date"
                name="openDate"
                value={state.openDate}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error=""
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
              <TextInput
                type="text"
                labelName="Close Date"
                name="killDate"
                value={state.killDate}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error=""
              />
            </div>
            <Button
              callToAction={formIsSubmitting ? "Submitting..." : "Add Bottle"}
              type="submit"
            />
          </Form>
        </div>
      </div>
    </>
  );
}
