import type { FormState } from "~/routes/reviews/new";
import TextInput from "~/components/UI/Inputs/TextInput/TextInput";
import Button from "../../UI/Button";
import PrependedInput from "~/components/UI/Inputs/PrependedInput/PrependedInput";
import PostpendedInput from "~/components/UI/Inputs/PostpendedInput/PostpendedInput";
import React, { useEffect, useState } from "react";
import { Form } from "@remix-run/react";
import type { CustomFormData } from "~/utils/helpers.server";
import StatusInput from "~/components/UI/Inputs/StatusInput";
import type { Bottle } from "~/components/UI/Combobox/Combobox";
import type { LoaderData } from "~/routes/services/combo";
import { useTypedFetcher } from "remix-typedjson";
import { Combobox } from "@headlessui/react";
import ChevronDown from "~/components/Icons/ChevronDown";
import useDebounce from "~/utils/useDebounce";
import ComboBox from "~/components/UI/Combobox/Combobox";

type Errors = {
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
};
interface BottleFormProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData | null;
  formState: string;
  errors: Errors;
  isSubmitting: boolean;
  setFormState: React.Dispatch<React.SetStateAction<FormState>> | undefined;
}

export default function BottleForm({
  state,
  changeHandler,
  formData,
  formState,
  errors,
  isSubmitting,
  setFormState,
}: BottleFormProps) {
  const [query, setQuery] = useState<string>("");
  const [value, setValue] = useState<Bottle | {}>({});
  const queryTerm = useDebounce(query, 300);

  const { data, load } = useTypedFetcher<LoaderData>();
  let bottles = data?.bottles || [];

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

  function valIsBottle(val: Bottle | {}): val is Bottle {
    return (val as Bottle).name !== undefined;
  }

  return (
    <Form method="post" className="flex w-full flex-col">
      <h2>Bottle Information</h2>
      <input type="hidden" name="id" value={formData?.redisId} />
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200  p-2 sm:p-6">
        <ComboBox
          value={value}
          setValue={setValue}
          query={query}
          setQuery={setQuery}
          bottles={bottles}
          queryTerm={queryTerm}
        />
        <div className="mb-2 flex w-full px-3 md:mb-0">
          <span className="mr-8 inline-flex items-center">Bottle Status</span>
          <StatusInput
            state={state}
            loadedStatus={"OPENED"}
            setFormState={setFormState}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Distiller"
            name="distiller"
            value={
              state.distiller
                ? state.distiller
                : valIsBottle(value)
                ? typeof value.distiller === "string"
                  ? value.distiller
                  : ""
                : ""
            }
            defaultValue={formData?.distiller}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌱"
            isSubmitting={isSubmitting}
            error={errors?.distiller ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Producer"
            name="producer"
            value={
              state.producer
                ? state.producer
                : valIsBottle(value)
                ? typeof value.producer === "string"
                  ? value.producer
                  : ""
                : ""
            }
            defaultValue={formData?.producer}
            changeHandler={(e) => changeHandler(e)}
            emoji="🏗️"
            isSubmitting={isSubmitting}
            error={errors?.producer ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Type"
            name="type"
            value={
              state.type
                ? state.type
                : valIsBottle(value)
                ? typeof value.type === "string"
                  ? value.type
                  : ""
                : ""
            }
            defaultValue={formData?.type}
            changeHandler={(e) => changeHandler(e)}
            emoji="©️"
            isSubmitting={isSubmitting}
            error={errors?.type ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Country of Origin"
            name="country"
            value={
              state.country
                ? state.country
                : valIsBottle(value)
                ? typeof value.country === "string"
                  ? value.country
                  : ""
                : ""
            }
            defaultValue={formData?.country}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌎"
            isSubmitting={isSubmitting}
            error={errors?.country ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Region"
            name="region"
            value={
              state.region
                ? state.region
                : valIsBottle(value)
                ? typeof value.region === "string"
                  ? value.region
                  : ""
                : ""
            }
            defaultValue={formData?.region}
            changeHandler={(e) => changeHandler(e)}
            emoji="🏔️"
            isSubmitting={isSubmitting}
            error={errors?.region ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <PrependedInput
            prependedCharacter="$"
            type="text"
            labelName="Price"
            name="price"
            value={
              state.price
                ? state.price
                : valIsBottle(value)
                ? typeof value.price === "string"
                  ? value.price
                  : ""
                : ""
            }
            defaultValue={formData?.price}
            changeHandler={(e) => changeHandler(e)}
            emoji="💲"
            isSubmitting={isSubmitting}
            error={errors?.price ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Age"
            name="age"
            value={
              state.age
                ? state.age
                : valIsBottle(value)
                ? typeof value.age === "string"
                  ? value.age
                  : ""
                : ""
            }
            defaultValue={formData?.age}
            changeHandler={(e) => changeHandler(e)}
            emoji="👴"
            isSubmitting={isSubmitting}
            error={errors?.age ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Color"
            name="color"
            value={
              state.color
                ? state.color
                : valIsBottle(value)
                ? typeof value.color === "string"
                  ? value.color
                  : ""
                : ""
            }
            defaultValue={formData?.color}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌈"
            isSubmitting={isSubmitting}
            error={errors?.color ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Year"
            name="year"
            value={
              state.year
                ? state.year
                : valIsBottle(value)
                ? typeof value.year === "string"
                  ? value.year
                  : ""
                : ""
            }
            defaultValue={formData?.year}
            changeHandler={(e) => changeHandler(e)}
            emoji="📆"
            isSubmitting={isSubmitting}
            error={errors?.year ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Batch / Barrel"
            name="batch"
            value={
              state.batch
                ? state.batch
                : valIsBottle(value)
                ? typeof value.batch === "string"
                  ? value.batch
                  : ""
                : ""
            }
            defaultValue={formData?.batch}
            changeHandler={(e) => changeHandler(e)}
            emoji="2️⃣"
            isSubmitting={isSubmitting}
            error={errors?.batch ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Size"
            name="size"
            value={
              state.size
                ? state.size
                : valIsBottle(value)
                ? typeof value.size === "string"
                  ? value.size
                  : ""
                : ""
            }
            defaultValue={formData?.size}
            changeHandler={(e) => changeHandler(e)}
            emoji="🍆"
            isSubmitting={isSubmitting}
            error={errors?.size ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <PostpendedInput
            postpendedCharacter="%"
            type="text"
            labelName="Alcohol Percent"
            name="alcoholPercent"
            value={
              state.alcoholPercent
                ? state.alcoholPercent
                : valIsBottle(value)
                ? typeof value.alcoholPercent === "string"
                  ? value.alcoholPercent
                  : ""
                : ""
            }
            defaultValue={formData?.alcoholPercent}
            changeHandler={(e) => changeHandler(e)}
            emoji="💫"
            isSubmitting={isSubmitting}
            error={errors?.alcoholPercent ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <PostpendedInput
            postpendedCharacter="pf"
            type="text"
            labelName="Proof"
            name="proof"
            value={
              state.proof
                ? state.proof
                : valIsBottle(value)
                ? typeof value.proof === "string"
                  ? value.proof
                  : ""
                : ""
            }
            defaultValue={formData?.proof}
            changeHandler={(e) => changeHandler(e)}
            emoji="🔥"
            isSubmitting={isSubmitting}
            error={errors?.proof ?? ""}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Finishing"
            name="finishing"
            value={
              state.finishing
                ? state.finishing
                : valIsBottle(value)
                ? typeof value.finishing === "string"
                  ? value.finishing
                  : ""
                : ""
            }
            defaultValue={formData?.finishing}
            changeHandler={(e) => changeHandler(e)}
            emoji="🍷"
            isSubmitting={isSubmitting}
            error={errors?.finishing ?? ""}
          />
        </div>
      </div>
      <Button
        callToAction={formState === "submitting" ? "Loading..." : "Next"}
        primary
        disabled={isSubmitting}
        type="submit"
      />
    </Form>
  );
}
