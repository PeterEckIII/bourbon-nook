import { writeAsyncIterableToWritable } from "@remix-run/node";
import type { UploadApiResponse } from "cloudinary";
import cloudinary from "cloudinary";
import { v4 as uuid } from "uuid";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadToCloudinary(
  data: AsyncIterable<Uint8Array>,
  userId: string,
) {
  const imageId = uuid();
  const uploadPromise = new Promise<UploadApiResponse>(
    // eslint-disable-next-line no-async-promise-executor
    async (resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: userId,
          public_id: imageId,
        },
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result!);
        },
      );
      await writeAsyncIterableToWritable(data, uploadStream);
    },
  );
  return uploadPromise;
}
