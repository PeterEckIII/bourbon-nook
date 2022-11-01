import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import type {
  UploadApiOptions,
  UploadApiResponse,
  UploadStream,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface IUploadResponseTransform {
  transformation: string;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

export interface ICloudinaryUploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  eager: IUploadResponseTransform[];
}

interface IUploadProps {
  data: AsyncIterable<Uint8Array>;
  userId: string;
  publicId: string;
}

async function upload({ data, userId, publicId }: IUploadProps) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream: UploadStream = cloudinary.uploader.upload_stream(
      { folder: `${userId}`, public_id: `${publicId}` },
      (error, result) => {
        if (error) {
          console.log(`CLOUDINARY ERROR: ${JSON.stringify(error, null, 2)}`);
          reject(error);
          return;
        }
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });
  return uploadPromise;
}

async function transformImage(imageId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await cloudinary.url(imageId).toString();
      const imageUrl = image.replace(/v([0-9]*)\//g, "");
      resolve(imageUrl);
    } catch (e) {
      reject(e);
    }
  });
}

export { upload, transformImage };
