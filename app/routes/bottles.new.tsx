import { conform, useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import Input from "~/components/Input/Input";
import Status from "~/components/Status/Status";
import { createBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { handleFormData, bottleSchema } from "~/utils/conform";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const data = await handleFormData(request, bottleSchema);

  const bottle = await createBottle({
    userId,
    name: data.name,
    type: data.type,
    status: data.status,
    distiller: data.distiller,
    producer: data.producer,
    country: data.country,
    region: data.region,
    price: data.price,
    age: data.age,
    year: data.year,
    batch: data.batch,
    barrel: data.barrel,
    alcoholPercent: data.alcoholPercent,
    proof: data.proof,
    size: data.size,
    color: data.color,
    finishing: data.finishing,
    imageUrl: data.imageUrl,
    openDate: data.openDate,
    killDate: data.killDate,
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
      return parse(formData, { schema: bottleSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onBlur",
  });

  return (
    <Form
      {...form.props}
      method="post"
      className="m-4 p-2 flex flex-col max-w-[1000px]"
    >
      <Input
        {...conform.input(name)}
        error={name.error}
        label="Bottle Name"
        placeholder="Buffalo Trace, George T Stagg"
        navigationState={navigation.state}
      />
      <Status bottleStatus={"OPENED"} />
      <Input
        {...conform.input(type)}
        error={type.error}
        label="Sprit Type"
        placeholder="Bourbon, Rye, Scotch..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(distiller)}
        error={distiller.error}
        label="Distillery"
        placeholder="Jack Daniels, MGP, Woodford Reserve..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(producer)}
        error={producer.error}
        label="Producer"
        placeholder="MGP, Sazerac, Brown Foreman..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(country)}
        error={country.error}
        label="Country of Origin"
        placeholder="USA, Scotland, Japan, India..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(region)}
        error={region.error}
        label="Region"
        placeholder="KY, Islay, Barbados..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(price)}
        error={price.error}
        label="Price"
        placeholder="34.95"
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(age)}
        error={age.error}
        label="Age"
        placeholder="12yrs, 7yr 5mos, NAS..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(year)}
        error={year.error}
        label="Year Released"
        placeholder="2019"
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(batch)}
        error={batch.error}
        label="Batch"
        placeholder="B921, Batch 2, Country Ham..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(barrel)}
        error={barrel.error}
        label="Barrel #"
        placeholder="22, A5JG5231..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(alcoholPercent)}
        error={alcoholPercent.error}
        label="ABV"
        placeholder="58.9%"
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(proof)}
        error={proof.error}
        label="Proof"
        placeholder="115"
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(size)}
        error={size.error}
        label="Size"
        placeholder="750mL, 1.75L, 2oz..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(color)}
        error={color.error}
        label="Color"
        placeholder="Amber, Tawny, Golden..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(finishing)}
        error={finishing.error}
        label="Finishing Barrels"
        placeholder="Cabernet, Barbados Rum, Ex-Scotch..."
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(imageUrl)}
        error={imageUrl.error}
        label="Bottle Image"
        placeholder=""
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(openDate)}
        error={openDate.error}
        label="Bottle opened on"
        placeholder=""
        navigationState={navigation.state}
      />
      <Input
        {...conform.input(killDate)}
        error={killDate.error}
        label="Bottle finished on"
        placeholder=""
        type="text"
        navigationState={navigation.state}
      />
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
      >
        Create
      </button>
    </Form>
  );
}
