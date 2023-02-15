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
                value={
                  state.distiller
                    ? state.distiller
                    : valIsBottle(value)
                    ? typeof value.distiller === "string"
                      ? value.distiller
                      : ""
                    : ""
                }
                defaultValue={loaderData?.distiller ?? null}
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
                value={
                  state.producer
                    ? state.producer
                    : valIsBottle(value)
                    ? typeof value.producer === "string"
                      ? value.producer
                      : ""
                    : ""
                }
                defaultValue={loaderData?.producer ?? null}
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
                value={
                  state.type
                    ? state.type
                    : valIsBottle(value)
                    ? typeof value.type === "string"
                      ? value.type
                      : ""
                    : ""
                }
                defaultValue={loaderData?.type ?? null}
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
                value={
                  state.country
                    ? state.country
                    : valIsBottle(value)
                    ? typeof value.country === "string"
                      ? value.country
                      : ""
                    : ""
                }
                defaultValue={loaderData?.country ?? null}
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
                value={
                  state.region
                    ? state.region
                    : valIsBottle(value)
                    ? typeof value.region === "string"
                      ? value.region
                      : ""
                    : ""
                }
                defaultValue={loaderData?.region ?? null}
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
                value={
                  state.price
                    ? state.price
                    : valIsBottle(value)
                    ? typeof value.price === "string"
                      ? value.price
                      : ""
                    : ""
                }
                defaultValue={loaderData?.price ?? null}
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
                value={
                  state.age
                    ? state.age
                    : valIsBottle(value)
                    ? typeof value.age === "string"
                      ? value.age
                      : ""
                    : ""
                }
                defaultValue={loaderData?.age ?? null}
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
                value={
                  state.color
                    ? state.color
                    : valIsBottle(value)
                    ? typeof value.color === "string"
                      ? value.color
                      : ""
                    : ""
                }
                defaultValue={loaderData?.color ?? null}
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
                value={
                  state.year
                    ? state.year
                    : valIsBottle(value)
                    ? typeof value.year === "string"
                      ? value.year
                      : ""
                    : ""
                }
                defaultValue={loaderData?.year ?? null}
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
                value={
                  state.batch
                    ? state.batch
                    : valIsBottle(value)
                    ? typeof value.batch === "string"
                      ? value.batch
                      : ""
                    : ""
                }
                defaultValue={loaderData?.batch ?? null}
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
                value={
                  state.size
                    ? state.size
                    : valIsBottle(value)
                    ? typeof value.size === "string"
                      ? value.size
                      : ""
                    : ""
                }
                defaultValue={loaderData?.size ?? null}
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
                value={
                  state.alcoholPercent
                    ? state.alcoholPercent
                    : valIsBottle(value)
                    ? typeof value.alcoholPercent === "string"
                      ? value.alcoholPercent
                      : ""
                    : ""
                }
                defaultValue={loaderData?.alcoholPercent ?? null}
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
                value={
                  state.proof
                    ? state.proof
                    : valIsBottle(value)
                    ? typeof value.proof === "string"
                      ? value.proof
                      : ""
                    : ""
                }
                defaultValue={loaderData?.proof ?? null}
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
                value={
                  state.finishing
                    ? state.finishing
                    : valIsBottle(value)
                    ? typeof value.finishing === "string"
                      ? value.finishing
                      : ""
                    : ""
                }
                defaultValue={loaderData?.finishing ?? null}
                changeHandler={(e) => stateSetter(e)}
                emoji="🍷"
                isSubmitting={formIsSubmitting}
                error={errors?.finishing ?? ""}
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
