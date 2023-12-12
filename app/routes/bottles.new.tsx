import { conform, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { redirect, type ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import Input from "~/components/Input/Input";
import { createBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { bottleSchema } from "~/utils/conform";

const createBottleSchema = bottleSchema.omit({ userId: true });

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const submission = parse(formData, { schema: createBottleSchema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  const bottle = await createBottle({
    userId,
    name: submission.value?.name,
    type: submission.value?.type,
    status: submission.value?.status,
    distiller: submission.value?.distiller,
    producer: submission.value?.producer,
    country: submission.value?.country,
    region: submission.value?.region,
    price: submission.value?.price,
    age: submission.value?.age,
    year: submission.value?.year,
    batch: submission.value?.batch,
    barrel: submission.value?.barrel,
    alcoholPercent: submission.value?.alcoholPercent,
    proof: submission.value?.proof,
    size: submission.value?.size,
    color: submission.value?.color,
    finishing: submission.value?.finishing,
    imageUrl: submission.value?.imageUrl,
    openDate: submission.value?.openDate,
    killDate: submission.value?.killDate,
  });

  return redirect(`/bottles/${bottle.id}`);
};

export default function NewBottle() {
  const navigation = useNavigation();
  const lastSubmission = useActionData<typeof action>();
  const [
    form,
    {
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
      barrel,
      alcoholPercent,
      proof,
      size,
      color,
      finishing,
      imageUrl,
      openDate,
      killDate,
    },
  ] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createBottleSchema });
    },
    shouldValidate: "onBlur",
  });

  return (
    <Form
      method="POST"
      className="m-4 p-2 flex flex-col max-w-[1000px]"
      {...form.props}
    >
      <Input
        type="text"
        label="Name"
        {...conform.input(name)}
        placeholder="Buffalo Trace, Elijah Craig Barrel Proof"
        error={name.error}
        navigationState={navigation.state}
      />

      <select name="status" id="status" defaultValue={"CLOSED"}>
        <option value="CLOSED">Closed</option>
        <option value="OPENED">Opened</option>
        <option value="FINISHED">Finished</option>
      </select>
      <Input
        type="text"
        label="Spirit Type"
        {...conform.input(type)}
        placeholder="Bourbon, Rye, Scotch, Rum"
        error={type.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Distillery"
        {...conform.input(distiller)}
        placeholder="Jack Daniels, MGP, Buffalo Trace"
        error={distiller.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Producer"
        {...conform.input(producer)}
        placeholder="Buffalo Trace, Elijah Craig Barrel Proof"
        error={producer.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Country of Origin"
        {...conform.input(country)}
        placeholder="USA, Scotland, Japan, Barbados"
        error={country.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Region"
        {...conform.input(region)}
        placeholder="KY, Islay, Okayama"
        error={region.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Price"
        {...conform.input(price)}
        placeholder="34.99"
        error={price.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Age"
        {...conform.input(age)}
        placeholder="12yr, 7yrs. 5mos., NAS"
        error={age.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Release Year"
        {...conform.input(year)}
        placeholder=""
        error={year.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Batch"
        {...conform.input(batch)}
        placeholder="B 15, A123, N/A"
        error={batch.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Barrel #"
        {...conform.input(barrel)}
        placeholder="A548BHF5, N/A"
        error={barrel.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="ABV"
        {...conform.input(alcoholPercent)}
        placeholder="60"
        error={alcoholPercent.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Proof"
        {...conform.input(proof)}
        defaultValue={Number(alcoholPercent) * 2}
        placeholder="120"
        error={proof.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Bottle Size"
        {...conform.input(size)}
        placeholder="750mL, 1.75L, 2oz."
        error={size.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Color"
        {...conform.input(color)}
        placeholder="Amber, Tawny, Straw"
        error={color.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Finishing Barrels"
        {...conform.input(finishing)}
        placeholder="Port, Calvados, Double Barrel"
        error={finishing.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Image"
        {...conform.input(imageUrl)}
        placeholder="https://cloudinary.com/<your_account>/image.jpg"
        error={imageUrl.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Bottle opened on"
        {...conform.input(openDate)}
        placeholder="1/9/2022, N/A"
        error={openDate.error}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Bottle finished on"
        {...conform.input(killDate)}
        placeholder="6/13/2023, N/A"
        error={killDate.error}
        navigationState={navigation.state}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 my-4">
        Submit
      </button>
    </Form>
  );
}
