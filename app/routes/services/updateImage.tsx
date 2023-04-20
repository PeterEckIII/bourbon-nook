import type { bottle } from "@prisma/client";
import type { ActionArgs, UploadHandler } from "@remix-run/server-runtime";
import {
  json,
  redirect,
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/server-runtime";
import { editBottle, getBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { v4 as uuid } from "uuid";
import { upload } from "~/utils/cloudinary.server";
import type { UploadApiResponse } from "cloudinary";

export type ImageUpdateData = {
  imageUrl?: string;
  error?: string;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const url = new URL(request.url);
  const bid = url.searchParams.get("bid");
  const redirectUrl = url.searchParams.get("redirectUrl");

  if (!redirectUrl || typeof redirectUrl === "undefined") {
    return json<ImageUpdateData>({
      error: `No redirect URL was included in the URL`,
    });
  }

  if (typeof bid === "undefined" || !bid) {
    return json<ImageUpdateData>({
      error: `Undefined request -- no bottle ID`,
    });
  }

  const bottle = await getBottle(bid);
  if (typeof bottle === "undefined" || !bottle) {
    return json<ImageUpdateData>({
      error: `No bottle with that ID`,
    });
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
        publicId,
        userId,
      })) as UploadApiResponse;

      return uploadedImage.secure_url;
    },
    createMemoryUploadHandler()
  );

  const formData = await parseMultipartFormData(request, uploadHandler);
  const imageUrl = formData.get("img")?.toString();

  if (!imageUrl) {
    return json<ImageUpdateData>({
      error: `No image URL to add`,
    });
  }

  const updatedBottleObject: bottle = {
    userId,
    id: bottle.id,
    imageUrl,
    status: bottle.status,
    name: bottle.name,
    type: bottle.type,
    distiller: bottle.distiller,
    producer: bottle.producer,
    country: bottle.country,
    region: bottle.region,
    price: bottle.price,
    age: bottle.age,
    year: bottle.year,
    batch: bottle.batch,
    barrel: bottle.barrel,
    alcoholPercent: bottle.alcoholPercent,
    proof: bottle.proof,
    size: bottle.size,
    color: bottle.color,
    finishing: bottle.finishing,
    openDate: bottle.openDate,
    killDate: bottle.killDate,
  };

  try {
    await editBottle(updatedBottleObject);
    return redirect(redirectUrl);
  } catch (error) {
    return json<ImageUpdateData>({
      error: `Could not update the bottle information`,
    });
  }
};
