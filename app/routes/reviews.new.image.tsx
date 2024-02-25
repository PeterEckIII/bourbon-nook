import {
  type ActionFunctionArgs,
  type UploadHandler,
  json,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { uploadToCloudinary } from "~/utils/cloudinary.server";

import { ImageUploadPayload } from "./api.upload-file";

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
    return json<ImageUploadPayload>({
      error: "No image source has been added",
      imgSrc: null,
    });
  }

  return json<ImageUploadPayload>({
    error: null,
    imgSrc,
  });
};

export default function NewReviewImage() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <Form method="POST">
        <label htmlFor="img-src">Image to upload</label>
        <input type="file" id="img-src" name="img" accept="image/*" />
        <button type="submit">Upload</button>
      </Form>
      {data?.error ? <h2>{data.error}</h2> : null}

      {data?.imgSrc ? (
        <>
          <h2>Uploaded image</h2>
          <img src={data.imgSrc} alt="Upload result" />
        </>
      ) : null}
    </div>
  );
}
