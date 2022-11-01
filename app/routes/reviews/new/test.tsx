import type {
  LoaderFunction,
  ActionFunction,
  UploadHandler,
} from "@remix-run/server-runtime";
import {
  json,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/server-runtime";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";

import type { ContextType } from "../new";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import invariant from "tiny-invariant";
import type { CustomFormData } from "~/utils/helpers.server";
import { uploadImage } from "~/utils/helpers.server";
import { requireUserId } from "~/session.server";
import type { UploadApiResponse } from "cloudinary";

type ActionData = {
  errorMsg?: string;
  imgSrc?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  if (typeof userId === "undefined" || userId === undefined) {
    redirect("/login");
  }

  let uploadedImage: UploadApiResponse;

  const uploadHandler: UploadHandler = composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      if (name !== "img") {
        return undefined;
      }
      uploadedImage = (await uploadImage({
        data,
        userId,
      })) as UploadApiResponse;
      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const imgSrc = formData.get("img");
  console.log(`ImgSrc: ${imgSrc}`);

  if (typeof imgSrc === "undefined" || !imgSrc) {
    return json<ActionData>({
      errorMsg: "No image source in the document",
    });
  }

  const id = formData.get("id")?.toString();
  if (typeof id === "undefined" || !id) {
    return json<ActionData>({ errorMsg: "Cloudinary upload failed" });
  }

  const formDataObject = await getDataFromRedis(id);
  if (!formDataObject) {
    return json<ActionData>({
      errorMsg:
        "You must enable JavaScript if you want to use the forward and back buttons",
    });
  }

  // TODO: SET IMAGE_URL TO NEWLY UPLOADED IMAGE
  // This will allow us to bypass the cloudinary transform API

  return json({ imgSrc });
};

export default function Test() {
  const data = useActionData<ActionData>();
  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <label htmlFor="img">Upload an image</label>
        <input type="file" name="img" id="img" accept="image/*" />
        <button type="submit">Upload to your account</button>
      </Form>
      {data?.errorMsg && <h2>{data.errorMsg}</h2>}
      {data?.imgSrc && (
        <>
          <h2>Uploaded image</h2>
          <img src={data.imgSrc} alt="upload result" />
        </>
      )}
    </>
  );
}
