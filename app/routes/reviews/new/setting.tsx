import {
  useActionData,
  useLoaderData,
  useOutletContext,
  useTransition,
} from "@remix-run/react";
import { redirect, json } from "@remix-run/server-runtime";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import SettingForm from "~/components/Form/SettingForm/SettingForm";

import type { ReviewContextType } from "~/routes/reviews/new";
import {
  getDataFromRedis,
  requireFormData,
  saveToRedis,
} from "~/utils/redis.server";
import type { CustomFormData } from "~/utils/helpers.server";

interface ActionData {
  date?: string;
  setting?: string;
  glassware?: string;
  restTime?: string;
  nose?: string;
  palate?: string;
  finish?: string;
  thoughts?: string;
  general?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const redisId = formData.get("id")?.toString();
  const date = formData.get("date")?.toString();
  const setting = formData.get("setting")?.toString();
  const glassware = formData.get("glassware")?.toString();
  const restTime = formData.get("restTime")?.toString();
  const nose = formData.get("nose")?.toString();
  const palate = formData.get("palate")?.toString();
  const finish = formData.get("finish")?.toString();
  const thoughts = formData.get("thoughts")?.toString();

  if (
    typeof redisId !== "string" ||
    typeof date !== "string" ||
    typeof setting !== "string" ||
    typeof glassware !== "string" ||
    typeof restTime !== "string" ||
    typeof nose !== "string" ||
    typeof palate !== "string" ||
    typeof finish !== "string" ||
    typeof thoughts !== "string"
  ) {
    return json<ActionData>({
      general: "Input was not a string",
    });
  }

  const errors = {
    date: date ? undefined : "Date is required",
    glassware: glassware ? undefined : "Glassware is required",
    restTime: restTime ? undefined : "Rest Time is required",
    setting: setting
      ? undefined
      : "Setting is required. Write a brief summary of what you're doing",
    nose: nose ? undefined : "Nose is required",
    palate: palate ? undefined : "Palate is required",
    finish: finish ? undefined : "Finish is required",
    thoughts: thoughts
      ? undefined
      : "Thoughts is required. Write a brief summary of the notes and your opinion",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  const customFormData = await getDataFromRedis(redisId);

  if (!customFormData) {
    return json<ActionData>({
      general: "You must enable JavaScript for this form to work",
    });
  }

  customFormData.date = date;
  customFormData.setting = setting;
  customFormData.glassware = glassware;
  customFormData.restTime = restTime;
  customFormData.nose = nose;
  customFormData.palate = palate;
  customFormData.finish = finish;
  customFormData.thoughts = thoughts;

  saveToRedis(customFormData);

  return redirect(`/reviews/new/notes?id=${customFormData.redisId}`);
};

export const loader: LoaderFunction = async ({ request }) => {
  const formData = await requireFormData(request);
  return formData;
};

export default function NewSettingRoute() {
  const formData = useLoaderData<CustomFormData>();
  const { state, stateSetter } = useOutletContext<ReviewContextType>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  let formState: "idle" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData
    ? "error"
    : "idle";

  if (state === undefined || !stateSetter) {
    throw new Error(`Error with the Outlet Context`);
  }

  const errors = actionData || {};

  return (
    <>
      <SettingForm
        formData={formData}
        state={state}
        changeHandler={stateSetter}
        formState={formState}
        errors={errors}
        isSubmitting={transition.state === "submitting"}
      />
    </>
  );
}
