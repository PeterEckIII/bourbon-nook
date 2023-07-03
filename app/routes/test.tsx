import type { BottleStatus, bottle } from "@prisma/client";
import { Form, useNavigation } from "@remix-run/react";
import { v4 as uuid } from "uuid";
import {
  type ActionArgs,
  type LoaderArgs,
  type UploadHandler,
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";
import {
  useTypedActionData,
  useTypedFetcher,
  useTypedLoaderData,
} from "remix-typedjson";
import invariant from "tiny-invariant";
import NewBottleForm from "~/components/Form/NewBottleForm";
import { createBottle, editBottle, getBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { upload } from "~/utils/cloudinary.server";
import { generateCode } from "~/utils/helpers.server";
import {
  handleFormData,
  bottleSchema,
  handleImageFormData,
} from "~/utils/newHelpers.server";
import { getAnyDataFromRedis, saveAnyDataToRedis } from "~/utils/redis.server";
import type { BottleErrors, ImageData, RedisFormData } from "~/utils/types";
import type { UploadApiResponse } from "cloudinary";

export const action = async ({ request }: ActionArgs) => {
  const redirectIfLoggedOut = new URL(request.url);
  const userId = await requireUserId(request);
  invariant(userId, "No user in session");
  if (!userId || typeof userId === "undefined") {
    redirect(`/login?redirectTo=${redirectIfLoggedOut}`);
  }

  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(
    async ({ name, data }) => {
      if (name !== "img") {
        console.error(`No image in the form`);
        return undefined;
      }

      const uploadedImage = (await upload({
        data,
        userId,
        publicId: uuid(),
      })) as UploadApiResponse;

      return uploadedImage.secure_url;
    },
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const payload = Object.fromEntries(formData);
  const validatedPayload = bottleSchema.parse(payload);
  console.log(`VPayload: ${JSON.stringify(validatedPayload)}`);
  const vPayloadArray = Object.keys(validatedPayload);
  console.log(`VPayloadArray: ${JSON.stringify(vPayloadArray)}`);
  return null;

  // try {
  //   // const newBottle = await createBottle({
  //   //   userId,
  //   //   id: uuid(),
  //   //   status: status as BottleStatus,
  //   //   imageUrl: imageSrc || "",
  //   //   ...validatedPayload,
  //   // });
  //   return "123";
  // } catch (error) {
  //   return "🙁"
  // }
};

// export const action = async ({ request }: ActionArgs) => {
//   const redirectIfLoggedOut = new URL(request.url);
//   const userId = await requireUserId(request);
//   invariant(userId, "No user in session");
//   if (!userId || typeof userId === "undefined") {
//     redirect(`/login?redirectTo=${redirectIfLoggedOut}`);
//   }

//   const { result, errors, formData } = await handleImageFormData(
//     request,
//     bottleSchema,
//     userId
//   );

//   const status = formData.get("status")?.toString();
//   const redisFormId = formData.get("redisId")?.toString();
//   let rid = "";

//   if (typeof redisFormId !== "string" || redisFormId === "") {
//     rid = generateCode(6);

//     const newRedisObject: RedisFormData = {
//       userId,
//       redisId: rid,
//       status: status as BottleStatus,
//       name: result.name,
//       type: result.type,
//       distiller: result.distiller,
//       producer: result.producer,
//       country: result.country,
//       region: result.region,
//       price: result.price,
//       age: result.age,
//       alcoholPercent: result.alcoholPercent,
//       proof: result.proof,
//       color: result.color,
//       year: result.year,
//       batch: result.batch,
//       barrel: result.barrel,
//       size: result.size,
//       finishing: result.finishing,
//       imageUrl: result.imageUrl,
//       openDate: result.openDate,
//       killDate: result.killDate,
//     };
//     try {
//       const newBottle = await createBottle({
//         userId,
//         ...result,
//       });
//       console.log(`NEW BOTTLE: ${JSON.stringify(newBottle, null, 2)}`);

//       newRedisObject.bottleId = newBottle.id;
//       await saveAnyDataToRedis(newRedisObject);
//       return redirect(`/reviews/new/setting?rid=${rid}`);
//     } catch (error) {
//       console.log(`Error submitting bottle: ${JSON.stringify(error, null, 2)}`);
//       return json<BottleErrors>(errors as BottleErrors);
//     }
//   } else {
//     rid = redisFormId;

//     const savedRedisObject = await getAnyDataFromRedis(rid);
//     if (!savedRedisObject || !savedRedisObject.bottleId) {
//       throw new Error(
//         `Couldn't find the saved information to populate this form. Please refresh the page`
//       );
//     }

//     const savedRecord = await getBottle(savedRedisObject.bottleId);
//     invariant(savedRecord);
//     if (savedRecord.id === savedRedisObject.bottleId) {
//       const updatedBottle = {
//         userId,
//         id: savedRecord.id,
//         status: status as BottleStatus,
//         name: result.name,
//         type: result.type,
//         distiller: result.distiller,
//         producer: result.producer,
//         country: result.country,
//         region: result.region,
//         price: result.price,
//         age: result.age,
//         year: result.year,
//         batch: result.batch,
//         barrel: result.barrel,
//         alcoholPercent: result.alcoholPercent,
//         proof: result.proof,
//         size: result.size,
//         color: result.color,
//         finishing: result.finishing,
//         imageUrl: result.imageUrl,
//         openDate: result.openDate,
//         killDate: result.killDate,
//       };

//       try {
//         const newResult = await editBottle(updatedBottle);
//         await saveAnyDataToRedis({
//           redisId: rid,
//           bottleId: newResult.id,
//           ...updatedBottle,
//         });
//         return redirect(`/reviews/new/setting?rid=${rid}`);
//       } catch (error) {
//         console.log(`Error editing bottle: ${error}`);
//         return null;
//       }
//     } else {
//       console.log(
//         `The record from the DB has id ${savedRecord.id}, which DOESN'T match the redis object id of ${savedRedisObject.bottleId}`
//       );

//       try {
//         const newBottle = await createBottle({
//           userId,
//           id: savedRecord.id,
//           status: status as BottleStatus,
//           name: result.name,
//           type: result.type,
//           distiller: result.distiller,
//           producer: result.producer,
//           country: result.country,
//           region: result.region,
//           price: result.price,
//           age: result.age,
//           year: result.year,
//           batch: result.batch,
//           barrel: result.barrel,
//           alcoholPercent: result.alcoholPercent,
//           proof: result.proof,
//           size: result.size,
//           color: result.color,
//           finishing: result.finishing,
//           imageUrl: result.imageUrl,
//           openDate: result.openDate,
//           killDate: result.killDate,
//         });
//         await saveAnyDataToRedis({
//           redisId: rid,
//           bottleId: newBottle.id,
//           ...result,
//         });
//         return redirect(`/reviews/new/setting?rid=${rid}`);
//       } catch (error) {
//         throw new Error(
//           `Couldn't save bottle to database: ${JSON.stringify(error, null, 2)}`
//         );
//       }
//     }
//   }
// };

export default function TestRoute() {
  const imageFetcher = useTypedFetcher<ImageData>();
  const errors = useTypedActionData<BottleErrors>();
  const transition = useNavigation();
  console.log(`Action Data: ${JSON.stringify(errors, null, 2)}`);

  const formIsSubmitting = transition.state === "submitting";
  const imageIsSubmitting = imageFetcher.state === "submitting";
  const submissionSuccessful =
    imageFetcher.state === "idle" && imageFetcher.data !== null;

  return (
    <div className="m-4 rounded-lg bg-white p-4">
      <NewBottleForm
        data={null}
        errors={errors}
        imageFetcher={imageFetcher}
        imageIsSubmitting={imageIsSubmitting}
        submissionSuccessful={submissionSuccessful}
        formIsSubmitting={formIsSubmitting}
      />
    </div>
  );
}
