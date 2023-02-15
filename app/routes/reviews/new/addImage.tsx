import type { ChangeEvent } from "react";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import {
  json,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/server-runtime";
import type {
  ActionArgs,
  LoaderArgs,
  UploadHandler,
} from "@remix-run/server-runtime";
import { v4 as uuid } from "uuid";
import { getUserId } from "~/session.server";
import type { ReviewContextType } from "../new";
import { useState } from "react";
import { upload } from "~/utils/cloudinary.server";
import type { ICloudinaryUploadResponse } from "~/utils/cloudinary.server";
import invariant from "tiny-invariant";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import type { CustomFormData } from "~/utils/helpers.server";
import ImageForm from "~/components/Form/ImageForm";

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
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const form = await parseMultipartFormData(request, uploadHandler);

  // get image source
  const imageSrc = form.get("img")?.toString();
  if (typeof imageSrc === "undefined" || !imageSrc) {
    return json<ActionData>({
      errorMessage: "Cloudinary upload failed",
    });
  }

  // get redis id
  const id = form.get("id")?.toString();
  if (typeof id === "undefined" || !id) {
    return json<ActionData>({
      errorMessage: "Cloudinary upload failed",
    });
  }
  // get redis form data
  const formDataObject = await getDataFromRedis(id);
  if (!formDataObject) {
    return json<ActionData>({
      errorMessage: "You must enable JavaScript for this form to work",
    });
  }

  formDataObject.imageUrl = imageSrc;
  await saveToRedis(formDataObject);

  return json<ActionData>({
    imageSrc,
    publicId,
  });
};

export const loader = async ({ request }: LoaderArgs) => {
  const formData = await requireFormData(request);
  return formData;
};

export default function NewAddImageRoute() {
  const formData = useLoaderData<CustomFormData>();
  const { state, setFormState } = useOutletContext<ReviewContextType>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [confirmed, setConfirmed] = useState<boolean>();
  const image = useFetcher();
  const isUploading = image.state === "submitting";
  const actionData = useActionData<ActionData>();

  if (setFormState === undefined) {
    throw new Error(`Error, please return to the bottle info page`);
  }

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
      <ImageForm
        actionData={actionData as ActionData}
        formData={formData}
        previewUrl={previewUrl ?? ""}
        confirmed={confirmed || false}
        setConfirmed={setConfirmed}
        isUploading={isUploading}
        state={state}
        setFormState={setFormState}
        handlePreviewChange={handlePreviewChange}
        redirectString={`/reviews/new/setting?id=${formData.redisId}`}
      />
    </div>
  );
}
