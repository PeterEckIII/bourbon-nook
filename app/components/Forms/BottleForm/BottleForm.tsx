import { Fieldset, conform } from "@conform-to/react";

import Input from "~/components/Input/Input";
import Status from "~/components/Status/Status";
import { Options } from "~/types/options";

type Inputs = Fieldset<{
  name: string;
  status: "CLOSED" | "OPENED" | "FINISHED";
  type: string;
  distiller: string;
  producer: string;
  country: string;
  region: string;
  price: string;
  age: string;
  year: string;
  batch: string;
  barrel: string;
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  imageUrl: string;
  openDate: string;
  killDate: string;
}>;

interface BottleFormProps {
  inputs: Inputs;
  navigationState: "idle" | "submitting" | "loading";
}

const options: Options = [
  {
    value: "CLOSED",
    label: "Closed",
  },
  {
    value: "OPENED",
    label: "Opened",
  },
  {
    value: "FINISHED",
    label: "Finished",
  },
];

export default function BottleForm({
  inputs,
  navigationState,
}: BottleFormProps) {
  return (
    <>
      <div className="my-3 flex w-full flex-wrap p-2 sm:p-7">
        <Input
          type="text"
          label="Name"
          {...conform.input(inputs.name)}
          placeholder="Buffalo Trace, Elijah Craig Barrel Proof"
          error={inputs.name.error}
          navigationState={navigationState}
        />
        <div className="mb-2 flex w-full px-3">
          <Status options={options} />
        </div>

        <Input
          type="text"
          label="Spirit Type"
          {...conform.input(inputs.type)}
          placeholder="Bourbon, Rye, Scotch, Rum"
          error={inputs.type.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Distillery"
          {...conform.input(inputs.distiller)}
          placeholder="Jack Daniels, MGP, Buffalo Trace"
          error={inputs.distiller.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Producer"
          {...conform.input(inputs.producer)}
          placeholder="Sazerac, Heaven Hill"
          error={inputs.producer.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Country of Origin"
          {...conform.input(inputs.country)}
          placeholder="USA, Scotland, Japan, Barbados"
          error={inputs.country.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Region"
          {...conform.input(inputs.region)}
          placeholder="KY, Islay, Okayama"
          error={inputs.region.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Price"
          {...conform.input(inputs.price)}
          placeholder="34.99"
          error={inputs.price.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Age"
          {...conform.input(inputs.age)}
          placeholder="12yr, 7yrs. 5mos., NAS"
          error={inputs.age.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Release Year"
          {...conform.input(inputs.year)}
          placeholder="2023"
          error={inputs.year.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Batch"
          {...conform.input(inputs.batch)}
          placeholder="B 15, A123, N/A"
          error={inputs.batch.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Barrel #"
          {...conform.input(inputs.barrel)}
          placeholder="A548BHF5, N/A"
          error={inputs.barrel.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="ABV"
          {...conform.input(inputs.alcoholPercent)}
          placeholder="60"
          error={inputs.alcoholPercent.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Proof"
          {...conform.input(inputs.proof)}
          placeholder="120"
          error={inputs.proof.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Bottle Size"
          {...conform.input(inputs.size)}
          placeholder="750mL, 1.75L, 2oz."
          error={inputs.size.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Color"
          {...conform.input(inputs.color)}
          placeholder="Amber, Tawny, Straw"
          error={inputs.color.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Finishing Barrels"
          {...conform.input(inputs.finishing)}
          placeholder="Port, Calvados, Double Barrel"
          error={inputs.finishing.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Image"
          {...conform.input(inputs.imageUrl)}
          placeholder="https://cloudinary.com/<your_account>/image.jpg"
          error={inputs.imageUrl.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Bottle opened on"
          {...conform.input(inputs.openDate)}
          placeholder="1/9/2022, N/A"
          error={inputs.openDate.error}
          navigationState={navigationState}
        />

        <Input
          type="text"
          label="Bottle finished on"
          {...conform.input(inputs.killDate)}
          placeholder="6/13/2023, N/A"
          error={inputs.killDate.error}
          navigationState={navigationState}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 my-4 w-96"
      >
        Submit
      </button>
    </>
  );
}
