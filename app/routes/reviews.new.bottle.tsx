import { useForm } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import {
  redirect,
  json,
  type ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

import BottleForm from "~/components/Forms/BottleForm/BottleForm";
import Spinner from "~/components/Icons/Spinner";
import { createBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { bottleSchema } from "~/utils/conform";
import { generateCode, saveToRedis } from "~/utils/redis.server";

const createBottleSchema = bottleSchema.omit({ userId: true });

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const submission = parse(formData, { schema: createBottleSchema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  const redisId = generateCode(10);

  const bottle = await createBottle({
    userId,
    name: submission.value?.name,
    type: submission.value?.type,
    status: submission.value?.status,
    distiller: submission.value?.distiller,
    producer: submission.value?.producer,
    country: submission.value?.country,
    region: submission.value?.region,
    price: submission.value?.price,
    age: submission.value?.age,
    year: submission.value?.year,
    batch: submission.value?.batch,
    barrel: submission.value?.barrel,
    alcoholPercent: submission.value?.alcoholPercent,
    proof: submission.value?.proof,
    size: submission.value?.size,
    color: submission.value?.color,
    finishing: submission.value?.finishing,
    imageUrl: submission.value?.imageUrl,
    openDate: submission.value?.openDate,
    killDate: submission.value?.killDate,
  });

  const redisBottle = { ...bottle, redisId };
  await saveToRedis(redisBottle);

  return redirect(`/reviews/new/setting?rid=${redisId}&bid=${bottle.id}`);
};

export default function NewReviewBottle() {
  const navigation = useNavigation();
  const lastSubmission = useActionData<typeof action>();
  const [form, payload] = useForm({
    lastSubmission,
    onValidate({ formData }) {
      return parse(formData, { schema: createBottleSchema });
    },
  });

  return (
    <div className="flex flex-col w-full my-8">
      <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 xl:flex-row 2xl:w-10/12">
        <Form
          method="POST"
          className="m-4 p-2 flex flex-col min-w-[1200px]"
          {...form.props}
        >
          <BottleForm inputs={payload} navigationState={navigation.state} />
          <button
            className="bg-blue-500 text-white p-4 m-2 w-1/12 rounded mb-8"
            type="submit"
          >
            {navigation.state === "submitting" ? (
              <div className="flex justify-center">
                <div>
                  <Spinner />
                </div>
                <div>Processing....</div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div>Next</div>
              </div>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
