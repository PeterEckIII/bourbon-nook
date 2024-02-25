import {
  type ActionFunctionArgs,
  type UploadHandler,
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { requireUserId } from "~/session.server";
import { uploadToCloudinary } from "~/utils/cloudinary.server";

export interface ImageUploadPayload {
  error: string | null;
  imgSrc: string | null;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        return undefined;
      }
      const uploadedImage = await uploadToCloudinary(data, userId);
      return uploadedImage.secure_url;
    },
    unstable_createMemoryUploadHandler(),
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );
  const imgSrc = formData.get("imgSrc")?.toString();
  if (!imgSrc) {
    return json<ImageUploadPayload>({ error: "No image!", imgSrc: null });
  }

  return json<ImageUploadPayload>({ error: null, imgSrc });
};
