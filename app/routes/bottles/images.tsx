import { redirect, useFetcher, useLoaderData } from 'react-router';
import type { Route } from './+types/image';
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { requireUserId } from '~/utils/session';
import { useState } from 'react';
import { updateImage } from '~/models/bottle';

export async function loader({ request }: Route.LoaderArgs) {
  const userId = await requireUserId(request);
  return { userId };
}

export async function action({ params, request }: Route.ActionArgs) {
  const bottleId = params.bottleId;
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const userId = formData.get('userId') as string;
    const fileData = await file.arrayBuffer();
    const buffer = new Uint8Array(fileData);
    const response: UploadApiResponse = await new Promise(
      async (resolve, reject) => {
        await cloudinary.uploader
          .upload_stream(
            {
              folder: `user-${userId}`,
            },
            function (error, result) {
              if (error) {
                reject(error);
              }
              resolve(result as UploadApiResponse);
            }
          )
          .end(buffer);
      }
    );
    const url = response.secure_url as string;
    await updateImage(url, userId, bottleId);
    return redirect(`/bottles/${bottleId}`);
  } catch (error) {
    console.error(`Error updating image for bottle ${bottleId}: ${error}`);
  }
}

export default function Images() {
  let { userId } = useLoaderData();
  let fetcher = useFetcher();
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <fetcher.Form
        method="post"
        encType="multipart/form-data"
        className="border border-black"
      >
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setPhoto(URL.createObjectURL(e.target.files![0]))}
          className="block w-full text-sm rounded-md cursor-pointer file:cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <input type="hidden" name="userId" id="userId" value={userId} />
        {photo ? (
          <img
            className="w-[500px] h-[700px]"
            src={photo}
            alt="Uploaded bottle"
          />
        ) : null}
        <button type="submit" className="justify-self-end">
          {fetcher.state !== 'idle' ? 'Uploading...' : 'Upload'}
        </button>
      </fetcher.Form>
    </div>
  );
}
