import { Form } from "@remix-run/react";
import Button from "~/components/UI/Button";
import PostpendedInput from "~/components/UI/Inputs/PostpendedInput";
import PrependedInput from "~/components/UI/Inputs/PrependedInput";
import StatusInput from "~/components/UI/Inputs/StatusInput";
import TextInput from "~/components/UI/Inputs/TextInput";
import type { FormState } from "~/routes/bottles/new";
import type { CustomBottleFormData } from "~/utils/helpers.server";

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

interface StandaloneBottleFormProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomBottleFormData | null;
  formState: string;
  errors: Errors;
  isSubmitting: boolean;
  setFormState: React.Dispatch<React.SetStateAction<FormState>> | undefined;
}

export default function StandaloneBottleForm({
  state,
  changeHandler,
  formData,
  formState,
  setFormState,
  isSubmitting,
  errors,
}: StandaloneBottleFormProps) {
  return (
    <div>
      <Form method="post" className="flex w-full flex-col">
        <input type="hidden" name="redisId" value={formData?.redisId ?? ""} />
        <h2>Bottle Information</h2>
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
              isSubmitting={isSubmitting}
              error={errors?.name ?? ""}
            />
          </div>
          <div className="mb-2 flex w-full px-3 md:mb-0">
            <span className="mr-8 inline-flex items-center">Bottle Status</span>
            <StatusInput
              state={state}
              loadedStatus={formData?.status ?? "CLOSED"}
              setFormState={setFormState}
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
              isSubmitting={isSubmitting}
              error={errors?.distiller ?? ""}
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
              isSubmitting={isSubmitting}
              error={errors?.producer ?? ""}
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
              isSubmitting={isSubmitting}
              error={errors?.type ?? ""}
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
              isSubmitting={isSubmitting}
              error={errors?.country ?? ""}
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
              value={state.price}
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
              value={state.age}
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
              value={state.color}
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
              value={state.year}
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
              value={state.batch}
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
              value={state.size}
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
              value={state.alcoholPercent}
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
              value={state.proof}
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
              value={state.finishing}
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
    </div>
  );
}
