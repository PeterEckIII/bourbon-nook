import type { ActionArgs } from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/node";
import { useTransition } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { createBottle } from "~/models/bottle.server";
import type { BottleStatus } from "@prisma/client";
import { useTypedActionData, useTypedFetcher } from "remix-typedjson";
import type { ImageActionData } from "~/routes/services/image";
import BottleForm from "~/components/Form/BottleForm";
import { bottleSchema, handleFormData } from "~/utils/newHelpers.server";
import type { BottleErrors } from "~/utils/types";

export const action = async ({ request }: ActionArgs) => {
  // Handle user auth
  const redirectIfLoggedOut = new URL(request.url);
  const userId = await requireUserId(request);
  invariant(userId, "No user in session");
  if (!userId || typeof userId === "undefined") {
    redirect(`/login?redirectTo=${redirectIfLoggedOut}`);
  }

  const { result, errors, formData } = await handleFormData(
    request,
    bottleSchema
  );
  console.log(`Result: ${JSON.stringify(result, null, 2)}`);

  const status = formData.get("status")?.toString();
  try {
    await createBottle({
      userId,
      status: status as BottleStatus,
      ...result,
    });
    return redirect(`/bottles`);
  } catch (error) {
    return json<BottleErrors>(errors as BottleErrors);
  }
};

export default function NewBottleRoute() {
  const errors = useTypedActionData<BottleErrors | null>();
  const transition = useTransition();
  const formIsSubmitting = transition.type === "actionSubmission";

  // image fetcher
  const imageFetcher = useTypedFetcher<ImageActionData>();
  const imageIsSubmitting = imageFetcher.type === "actionSubmission";
  const submissionSuccessful =
    imageFetcher.type === "done" &&
    typeof imageFetcher.data.imageSrc !== "undefined";

  return (
    <BottleForm
      data={null}
      errors={errors}
      imageFetcher={imageFetcher}
      imageIsSubmitting={imageIsSubmitting}
      submissionSuccessful={submissionSuccessful}
      formIsSubmitting={formIsSubmitting}
    />
  );
}
