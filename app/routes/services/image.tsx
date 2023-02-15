import type { ActionArgs, UploadHandler } from "@remix-run/server-runtime";
import {
  redirect,
  json,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getUserId, requireUserId } from "~/session.server";
import { v4 as uuid } from "uuid";
import type { UploadApiResponse } from "cloudinary";
import { upload } from "~/utils/cloudinary.server";

export type ImageActionData = {
  errorMessage?: string;
  imageSrc?: string;
  publicId?: string;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const redirectUrl = new URL(request.url);
  if (!userId || typeof userId === "undefined") {
    redirect(`/login?redirectTo=${redirectUrl}`);
  }

  const publicId = uuid();

  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        console.error(`No image in the form`);
        return undefined;
      }

      const uploadedImage = (await upload({
        data,
        userId,
        publicId,
      })) as UploadApiResponse;

      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const imageSrc = formData.get("img")?.toString();

  if (!imageSrc) {
    return json<ImageActionData>({
      errorMessage: "No image source submitted",
    });
  }

  return json<ImageActionData>({
    imageSrc,
  });
};
