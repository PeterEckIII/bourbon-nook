import React, { useEffect } from "react";
import type { ChangeEvent } from "react";
import { Link, useFetcher, useTransition } from "@remix-run/react";
import CheckIcon from "~/components/Icons/CheckIcon";
import Spinner from "~/components/Icons/Spinner";
import type { FormState } from "~/routes/reviews/new";
import type { CustomFormData } from "~/utils/helpers.server";

interface ImageFormProps {
  actionData: {
    errorMessage?: string;
    imageSrc?: string;
    publicId?: string;
  };
  formData: CustomFormData;
  previewUrl: string;
  confirmed: boolean;
  setConfirmed: (confirmed: boolean) => void;
  isUploading: boolean;
  state: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  handlePreviewChange: (e: ChangeEvent<HTMLInputElement>) => void;
  redirectString: string;
}

export default function ImageForm({
  actionData,
  formData,
  handlePreviewChange,
  previewUrl,
  confirmed,
  setConfirmed,
  state,
  setFormState,
  redirectString,
}: ImageFormProps) {
  const image = useFetcher();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.errorMessage
    ? "error"
    : "idle";
  let isUploading = image.state === "submitting";

  useEffect(() => {
    if (image.state === "idle" && image.type === "done") {
      setFormState({
        ...state,
        imageUrl: image.data.imageSrc,
      });
    }
  }, [setFormState, state, image]);

  useEffect(() => {
    if (image.type === "done") {
      setConfirmed(true);
    }
  }, [image.type, setConfirmed]);

  return (
    <>
      <image.Form
        encType="multipart/form-data"
        method="post"
        className="max-w-[500px]"
        id="imageForm"
      >
        <input type="hidden" name="id" value={formData.redisId} />
        <div className="flex w-full items-center justify-center">
          <label htmlFor="img">Upload an Image</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            id="img"
            onChange={(e) => handlePreviewChange(e)}
          />
        </div>
        {previewUrl !== "" && confirmed === false && image.data === undefined && (
          <div className="h-50 w-25 m-3 flex items-center justify-center">
            <img
              src={previewUrl}
              alt={`The ${formData.name} bottle you uploaded`}
            />
          </div>
        )}
        <div className="my-2 text-right">
          <button
            type="submit"
            id="submit-button"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            disabled={isUploading}
          >
            {isUploading ? <Spinner /> : "Upload Image"}
          </button>
        </div>
      </image.Form>
      {image.type === "done" && (
        <div
          id="uploadConfirmation"
          className="border-black-100 m-4 flex items-center justify-center rounded-md p-4 text-green-700"
        >
          <CheckIcon />
          <span>&nbsp;</span>Successfully uploaded!
        </div>
      )}
      <div className="my-8 text-right">
        <Link
          id="next-button"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          to={redirectString}
          onClick={() =>
            setFormState({
              ...state,
              imageUrl: formData.imageUrl ?? "",
            })
          }
        >
          {formState === "submitting" ? "Loading" : "Next"}
        </Link>
      </div>
    </>
  );
}
