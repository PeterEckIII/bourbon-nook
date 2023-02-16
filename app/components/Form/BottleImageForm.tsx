import TextInput from "~/components/UI/Inputs/TextInput/TextInput";
import Button from "~/components/UI/Button";
import PrependedInput from "~/components/UI/Inputs/PrependedInput/PrependedInput";
import PostpendedInput from "~/components/UI/Inputs/PostpendedInput/PostpendedInput";
import { useEffect, useState } from "react";
import { Form } from "@remix-run/react";
import type {
  BottleContext,
  BottleImageProps,
  BottleInfoFormData,
  CustomFormData,
  ReviewContext,
} from "~/utils/helpers.server";
import StatusInput from "~/components/UI/Inputs/StatusInput";
import type { Bottle } from "~/components/UI/Combobox/Combobox";
import useDebounce from "~/utils/useDebounce";
import ComboBox from "~/components/UI/Combobox/Combobox";
import ImageUploader from "./ImageUploader";
import type { action as newReviewBottleAction } from "~/routes/reviews/new/bottle";
import type { action as newBottleAction } from "~/routes/bottles/new/bottle";

export default function BottleImageForm<T, A, L>({
  state,
  setFormState,
  stateSetter,
  loaderData,
  combo,
  errors,
  formIsSubmitting,
  imageFetcher,
}: BottleImageProps<
  T extends ReviewContext ? ReviewContext : BottleContext,
  A extends typeof newReviewBottleAction
    ? typeof newReviewBottleAction
    : typeof newBottleAction,
  L extends CustomFormData ? CustomFormData : BottleInfoFormData
>) {
  const [query, setQuery] = useState<string>("");
  const [value, setValue] = useState<Bottle | {}>({});
  const queryTerm = useDebounce(query, 300);

  const { data, load } = combo;
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
    <>
      <Form
        method="post"
        className="flex w-full flex-col"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-semibold text-white">
          Bottle Information
        </h2>
        <input type="hidden" name="id" value={loaderData?.redisId ?? ""} />
        <div
          id="form-container"
          className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 md:flex-row"
        >
          <div
            id="image-container"
            className="m-4 hidden w-full lg:block lg:h-full lg:w-1/3"
          >
            <ImageUploader imageFetcher={imageFetcher} />
          </div>
          <div className="-mx-3 my-3 mb-6 flex w-full flex-wrap p-2 sm:p-6 lg:w-2/3">
            <ComboBox
              value={value}
              setValue={setValue}
              query={query}
              setQuery={setQuery}
              bottles={bottles}
              queryTerm={queryTerm}
            />
            <div className="m-4 block w-full lg:hidden lg:h-full lg:w-1/3">
              <ImageUploader imageFetcher={imageFetcher} />
            </div>
            <div className="mb-2 flex w-full px-3 md:mb-0">
              <span className="mr-8 flex items-center">Bottle Status</span>
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
                value={state.distiller}
                changeHandler={(e) => stateSetter(e)}
                emoji="🌱"
                isSubmitting={formIsSubmitting}
                error={errors?.distiller ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Producer"
                name="producer"
                value={state.producer}
                changeHandler={(e) => stateSetter(e)}
                emoji="🏗️"
                isSubmitting={formIsSubmitting}
                error={errors?.producer ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Type"
                name="type"
                value={state.type}
                changeHandler={(e) => stateSetter(e)}
                emoji="©️"
                isSubmitting={formIsSubmitting}
                error={errors?.type ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Country of Origin"
                name="country"
                value={state.country}
                changeHandler={(e) => stateSetter(e)}
                emoji="🌎"
                isSubmitting={formIsSubmitting}
                error={errors?.country ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Region"
                name="region"
                value={state.region}
                changeHandler={(e) => stateSetter(e)}
                emoji="🏔️"
                isSubmitting={formIsSubmitting}
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
                changeHandler={(e) => stateSetter(e)}
                emoji="💲"
                isSubmitting={formIsSubmitting}
                error={errors?.price ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Age"
                name="age"
                value={state.age}
                changeHandler={(e) => stateSetter(e)}
                emoji="👴"
                isSubmitting={formIsSubmitting}
                error={errors?.age ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Color"
                name="color"
                value={state.color}
                changeHandler={(e) => stateSetter(e)}
                emoji="🌈"
                isSubmitting={formIsSubmitting}
                error={errors?.color ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Year"
                name="year"
                value={state.year}
                changeHandler={(e) => stateSetter(e)}
                emoji="📆"
                isSubmitting={formIsSubmitting}
                error={errors?.year ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Batch / Barrel"
                name="batch"
                value={state.batch}
                changeHandler={(e) => stateSetter(e)}
                emoji="2️⃣"
                isSubmitting={formIsSubmitting}
                error={errors?.batch ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Size"
                name="size"
                value={state.size}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍆"
                isSubmitting={formIsSubmitting}
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
                changeHandler={(e) => stateSetter(e)}
                emoji="💫"
                isSubmitting={formIsSubmitting}
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
                changeHandler={(e) => stateSetter(e)}
                emoji="🔥"
                isSubmitting={formIsSubmitting}
                error={errors?.proof ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Finishing"
                name="finishing"
                value={state.finishing}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error={errors?.finishing ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Open Date"
                name="openDate"
                value={state.openDate}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error={errors?.openDate ?? ""}
              />
            </div>
            <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
              <TextInput
                type="text"
                labelName="Kill Date"
                name="killDate"
                value={state.killDate}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error={errors?.killDate ?? ""}
              />
            </div>
          </div>
        </div>
        <Button
          callToAction={formIsSubmitting ? "Adding..." : "Next"}
          primary
          disabled={formIsSubmitting}
          type="submit"
        />
      </Form>
    </>
  );
}
