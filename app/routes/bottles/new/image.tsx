import {
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import {
  json,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/server-runtime";
import type {
  LoaderArgs,
  ActionArgs,
  UploadHandler,
} from "@remix-run/server-runtime";
import { v4 as uuid } from "uuid";
import { getUserId, requireUserId } from "~/session.server";
import type { BottleContextType } from "../new";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { upload } from "~/utils/cloudinary.server";
import type { ICloudinaryUploadResponse } from "~/utils/cloudinary.server";
import invariant from "tiny-invariant";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import { assertNonNullable, generateCode } from "~/utils/helpers.server";
import type { CustomBottleFormData } from "~/utils/helpers.server";
import Spinner from "~/components/Icons/Spinner";
import CheckIcon from "~/components/Icons/CheckIcon";

type ActionData = {
  errorMessage?: string;
  imageSrc?: string;
  publicId?: string;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);
  invariant(userId, "No user ID in session");
  if (typeof userId === "undefined" || userId === undefined) {
    redirect("/login");
  }

  const publicId = uuid();

  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        return undefined;
      }
      const uploadedImage = (await upload({
        data,
        userId,
        publicId,
      })) as ICloudinaryUploadResponse;
      console.log(`Uploaded Image: ${JSON.stringify(uploadedImage)}`);
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);

  const imageSrc = formData.get("img")?.toString();
  if (typeof imageSrc === "undefined" || !imageSrc) {
    return json<ActionData>({
      errorMessage: "Cloudinary upload failed",
    });
  }

  const redisId = formData.get("redisId")?.toString();
  assertNonNullable(redisId);

  const formDataObject: CustomBottleFormData = {
    redisId: redisId,
    imageUrl: imageSrc,
    userId,
    status: "CLOSED",
    name: "",
    type: "",
    distiller: "",
    producer: "",
    country: "",
    region: "",
    price: "",
    age: "",
    year: "",
    batch: "",
    alcoholPercent: "",
    proof: "",
    size: "",
    color: "",
    finishing: "",
  };
  await saveToRedis(formDataObject);

  return json<ActionData>({
    imageSrc,
    publicId,
  });
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = requireUserId(request);
  assertNonNullable(userId);
  const redisId = generateCode(6);
  return json(redisId);
};

export default function NewBottleImageRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state, setFormState } = useOutletContext<BottleContextType>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [confirmed, setConfirmed] = useState<boolean>();
  const image = useFetcher();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.errorMessage
    ? "error"
    : "idle";
  const isUploading = image.state === "submitting";

  if (setFormState === undefined) {
    throw new Error(`Error, please return to the bottle info page`);
  }

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

  const handlePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmed(false);
    const { files } = e.currentTarget;
    if (!files) throw new Error(`Error reading files from import`);
    if (files && files[0] !== undefined) {
      console.log(`Handling preview image`);
      const newUrl = URL.createObjectURL(files[0]);
      setPreviewUrl(newUrl);
    } else {
      console.log(`Cannot handle preview image`);
      setPreviewUrl("");
    }
  };

  return (
    <div className="m-2 p-2">
      <image.Form
        encType="multipart/form-data"
        method="post"
        className="max-w-[500px]"
      >
        <input type="hidden" name="redisId" value={loaderData} />
        <div className="flex w-full items-center justify-center">
          <label htmlFor="img">Upload an image</label>
          <input
            type="file"
            name="img"
            accept="image/*"
            id="img"
            onChange={(e) => handlePreviewChange(e)}
          />
        </div>
        {previewUrl !== "" && confirmed === false && image.data === undefined && (
          <div className="h-50 w-25 m-3 flex items-center justify-center ">
            <img src={previewUrl} alt={`The bottle you uploaded`} />
          </div>
        )}
        <div className="my-2 text-right">
          <button
            disabled={isUploading}
            type="submit"
            id="upload-button"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            {isUploading ? <Spinner /> : "Upload Image"}
          </button>
        </div>
      </image.Form>
      {image.type === "done" && (
        <div className="border-black-100 flex items-center justify-center rounded-md p-4 text-green-700">
          <CheckIcon />
          <span>&nbsp;</span>Successfully uploaded!
        </div>
      )}
      <div className="flex flex-col items-end py-2">
        <Link
          to={
            image.type === "done"
              ? `/bottles/new/information?id=${loaderData}`
              : `/bottles/new/information`
          }
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          onClick={() =>
            setFormState({ ...state, imageUrl: actionData?.imageSrc ?? "" })
          }
        >
          {isUploading
            ? "Uploading..."
            : image.type === "done"
            ? "Next"
            : "Skip"}
        </Link>
      </div>
    </div>
  );
}
