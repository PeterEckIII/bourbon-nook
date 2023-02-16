import { Form } from "@remix-run/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import Button from "~/components/UI/Button";
import ComboBox, { Bottle } from "~/components/UI/Combobox/Combobox";
import PostpendedInput from "~/components/UI/Inputs/PostpendedInput";
import PrependedInput from "~/components/UI/Inputs/PrependedInput";
import StatusInput from "~/components/UI/Inputs/StatusInput";
import TextInput from "~/components/UI/Inputs/TextInput";
import type { ErrorData } from "~/routes/bottles/new/bottle";
import type { FormState } from "~/routes/reviews/new";
import { LoaderData as ComboLoader } from "~/routes/services/combo";
import type { ImageActionData } from "~/routes/services/image";
import useDebounce from "~/utils/useDebounce";
import ImageUploader from "../ImageUploader";

interface BottleFormProps {
  imageFetcher: TypedFetcherWithComponents<ImageActionData>;
  combo: TypedFetcherWithComponents<ComboLoader>;
  state: FormState;
  stateSetter: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormState: Dispatch<SetStateAction<FormState | undefined>>;
  errors: ErrorData;
  formIsSubmitting: boolean;
  imageIsSubmitting: boolean;
  submissionSuccessful: boolean;
}

export default function BottleForm({
  imageFetcher,
  combo,
  state,
  stateSetter,
  setFormState,
  errors,
  formIsSubmitting,
  imageIsSubmitting,
  submissionSuccessful,
}: BottleFormProps) {
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
            <ComboBox
              value={value}
              setValue={setValue}
              query={query}
              setQuery={setQuery}
              queryTerm={queryTerm}
              bottles={bottles}
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
                error={errors?.distiller ?? ""}
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
                error={errors?.producer ?? ""}
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
                error={errors?.type ?? ""}
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
                error={errors?.country ?? ""}
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
                error={errors?.region ?? ""}
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
                error={errors?.price ?? ""}
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
                error={errors?.age ?? ""}
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
                error={errors?.color ?? ""}
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
                error={errors?.year ?? ""}
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
                error={errors?.batch ?? ""}
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
                error={errors?.size ?? ""}
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
                error={errors?.alcoholPercent ?? ""}
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
                error={errors?.proof ?? ""}
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
                error={errors?.finishing ?? ""}
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
