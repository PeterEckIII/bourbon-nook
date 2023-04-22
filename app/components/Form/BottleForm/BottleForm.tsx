import type { bottle } from "@prisma/client";
import { Form } from "@remix-run/react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import Button from "~/components/UI/Button";
import ComboBox from "~/components/UI/Combobox/Combobox";
import type { Bottle } from "~/components/UI/Combobox/Combobox";
import StatusInput from "~/components/UI/Inputs/StatusInput/StatusInput";
import TextInput from "~/components/UI/Inputs/TextInput";
import type { BottleErrors, ImageData, RedisFormData } from "~/utils/types";
import ImageForm from "../ImageForm";
import DropdownFields from "./DropdownFields";

type BottleFormProps = {
  data: RedisFormData | null;
  errors: BottleErrors | null;
  imageFetcher: TypedFetcherWithComponents<ImageData>;
  // bottles: Bottle[];

  // value: string | {} | bottle;
  // query: string;
  // queryTerm: string;

  // setValue: Dispatch<SetStateAction<string | {} | bottle>>;
  // setQuery: Dispatch<SetStateAction<string>>;

  formIsSubmitting: boolean;
  imageIsSubmitting: boolean;
  submissionSuccessful: boolean;
};

export default function BottleForm({
  data,
  errors,
  imageFetcher,
  // value,
  // setValue,
  // query,
  // setQuery,
  // bottles,
  // queryTerm,
  imageIsSubmitting,
  submissionSuccessful,
  formIsSubmitting,
}: BottleFormProps) {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <div className="flex w-full flex-col">
        <h2 className="text-3xl font-semibold text-white">Add Bottle</h2>
        <div
          id="form-container"
          className="max-h-800 flex flex-col rounded-xl border border-gray-200 bg-white p-4 lg:flex-row"
        >
          <ImageForm
            imageFetcher={imageFetcher}
            imageIsSubmitting={imageIsSubmitting}
          />
          <Form method="post" className="flex flex-col">
            <div className="my-3 -mx-3 mb-6 flex w-full flex-wrap p-2 sm:p-7 lg:w-2/3">
              {submissionSuccessful ? (
                <input
                  type="hidden"
                  name="imageUrl"
                  value={imageFetcher.data.imageSrc}
                />
              ) : (
                <input type="hidden" name="imageUrl" value="" />
              )}
              <input type="hidden" name="redisId" value={data?.redisId} />
              <TextInput
                type="text"
                labelName="Bottle Name"
                name="name"
                emoji="📛"
                error={errors?.name}
              />
              <div className="mb-2 flex w-full px-3 md:mb-0">
                <span className="mr-8 flex items-center">Bottle Status</span>
                <StatusInput loadedStatus="CLOSED" error={errors?.status} />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Distiller"
                  name="distiller"
                  emoji="🌱"
                  error={errors?.distiller}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Producer"
                  name="producer"
                  emoji="🏗️"
                  error={errors?.producer}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Type"
                  name="type"
                  emoji="©️"
                  error={errors?.type}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Country of Origin"
                  name="country"
                  emoji="🌍"
                  error={errors?.country}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Region"
                  name="region"
                  emoji="🏔️"
                  error={errors?.region}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Price"
                  name="price"
                  emoji="💲"
                  error={errors?.price}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Age"
                  name="age"
                  emoji="👴"
                  error={errors?.age}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Color"
                  name="color"
                  emoji="🌈"
                  error={errors?.color}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="ABV"
                  name="alcoholPercent"
                  emoji="🥃"
                  error={errors?.alcoholPercent}
                />
              </div>
              <div className="mb-2 w-full px-3 md:mb-0 lg:w-1/2 xl:w-1/3">
                <TextInput
                  type="text"
                  labelName="Proof"
                  name="proof"
                  emoji="🔥"
                  error={errors?.proof}
                />
              </div>
            </div>
            <DropdownFields
              opened={opened}
              setOpened={setOpened}
              errors={errors}
            />

            <div className="flex w-full justify-end">
              <Button
                type="submit"
                callToAction={
                  formIsSubmitting ? "Submitting..." : "Add & Continue"
                }
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
