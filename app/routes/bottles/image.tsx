import type { Route } from './+types/image';
import { Form, redirect, useNavigation } from 'react-router';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';
import { requireUserId } from '~/utils/session';
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
    const userId = String(formData.get('userId'));
    await updateImage(url, userId, bottleId);
    return redirect('/bottles');
  } catch (e) {
    console.log(`Error updating image for bottle ${bottleId}: ${e}`);
  }
}

export default function ImageUpload({ loaderData }: Route.ComponentProps) {
  const { userId } = loaderData;
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <Form encType="multipart/form-data" method="post">
      <input type="file" name="image" id="image" />
      <input type="hidden" name="userId" id="userId" value={userId} />
      <button type="submit" disabled={isNavigating ? true : false}>
        {isNavigating ? 'Submitting' : 'Submit'}
      </button>
    </Form>
  );
}
