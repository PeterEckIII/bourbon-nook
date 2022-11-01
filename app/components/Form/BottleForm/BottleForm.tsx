import type { FormState } from "~/routes/reviews/new";
import TextInput from "~/components/UI/Inputs/TextInput/TextInput";
import Button from "../../UI/Button";
import PrependedInput from "~/components/UI/Inputs/PrependedInput/PrependedInput";
import PostpendedInput from "~/components/UI/Inputs/PostpendedInput/PostpendedInput";
import React from "react";
import { Form } from "@remix-run/react";
import type { CustomFormData } from "~/utils/helpers.server";

interface IBottleFormProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData | null;
  formState: string;
}

export default function BottleForm({
  state,
  changeHandler,
  formData,
  formState,
}: IBottleFormProps) {
  return (
    <Form method="post" className="flex w-full flex-col">
      <h2>Bottle Information</h2>
      <input type="hidden" name="id" value={formData?.redisId} />
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0">
          <TextInput
            type="text"
            labelName="Name"
            name="name"
            value={state.name}
            defaultValue={formData?.name}
            changeHandler={(e) => changeHandler(e)}
            emoji="📛"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Distiller"
            name="distiller"
            value={state.distiller}
            defaultValue={formData?.distiller}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌱"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Bottler"
            name="bottler"
            value={state.bottler}
            defaultValue={formData?.bottler}
            changeHandler={(e) => changeHandler(e)}
            emoji="🍾"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Producer"
            name="producer"
            value={state.producer}
            defaultValue={formData?.producer}
            changeHandler={(e) => changeHandler(e)}
            emoji="🏗️"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Type"
            name="type"
            value={state.type}
            defaultValue={formData?.type}
            changeHandler={(e) => changeHandler(e)}
            emoji="©️"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Country of Origin"
            name="country"
            value={state.country}
            defaultValue={formData?.country}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌎"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Region"
            name="region"
            value={state.region}
            defaultValue={formData?.region}
            changeHandler={(e) => changeHandler(e)}
            emoji="🏔️"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <PrependedInput
            prependedCharacter="$"
            type="text"
            labelName="Price"
            name="price"
            value={state.price}
            defaultValue={formData?.price}
            changeHandler={(e) => changeHandler(e)}
            emoji="💲"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Age"
            name="age"
            value={state.age}
            defaultValue={formData?.age}
            changeHandler={(e) => changeHandler(e)}
            emoji="👴"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Color"
            name="color"
            value={state.color}
            defaultValue={formData?.color}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌈"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Year"
            name="year"
            value={state.year}
            defaultValue={formData?.year}
            changeHandler={(e) => changeHandler(e)}
            emoji="📆"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Batch / Barrel"
            name="batch"
            value={state.batch}
            defaultValue={formData?.batch}
            changeHandler={(e) => changeHandler(e)}
            emoji="2️⃣"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Size"
            name="size"
            value={state.size}
            defaultValue={formData?.size}
            changeHandler={(e) => changeHandler(e)}
            emoji="🍆"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <PostpendedInput
            postpendedCharacter="%"
            type="text"
            labelName="Alcohol Percent"
            name="alcoholPercent"
            value={state.alcoholPercent}
            defaultValue={formData?.alcoholPercent}
            changeHandler={(e) => changeHandler(e)}
            emoji="💫"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <PostpendedInput
            postpendedCharacter="pf"
            type="text"
            labelName="Proof"
            name="proof"
            value={state.proof}
            defaultValue={formData?.proof}
            changeHandler={(e) => changeHandler(e)}
            emoji="🔥"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <TextInput
            type="text"
            labelName="Finishing"
            name="finishing"
            value={state.finishing}
            defaultValue={formData?.finishing}
            changeHandler={(e) => changeHandler(e)}
            emoji="🍷"
          />
        </div>
      </div>
      <Button type="button" callToAction="Cancel" />
      <Button
        callToAction={formState === "submitting" ? "Loading..." : "Next"}
        primary
        type="submit"
      />
    </Form>
  );
}
