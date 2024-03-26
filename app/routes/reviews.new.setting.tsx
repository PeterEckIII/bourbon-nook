import { parse } from "@conform-to/zod";
import { LoaderFunctionArgs, ActionFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { redirect } from "remix-typedjson";

import { requireUserId } from "~/session.server";
import { settingSchema } from "~/utils/conform";
import { saveToRedis } from "~/utils/redis.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const rid = new URL(request.url).searchParams.get("rid") ?? "";
  const bid = new URL(request.url).searchParams.get("bid") ?? "";

  if (!rid || !bid) {
    return json({ error: "Missing required parameters" }, { status: 400 });
  }

  return json({ rid, bid });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request);
  const url = new URL(request.url);
  const bottleId = url.searchParams.get("bid");
  const redisId = url.searchParams.get("rid");

  if (!bottleId || !redisId) {
    return json({ error: "Missing required parameters" }, { status: 400 });
  }

  const formData = await request.formData();
  const submission = parse(formData, { schema: settingSchema });

  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  const payload = {
    redisId,
    date: submission.value?.date,
    setting: submission.value?.setting,
    glassware: submission.value?.glassware,
    restTime: submission.value?.restTime,
    nose: submission.value?.nose,
    palate: submission.value?.palate,
    finish: submission.value?.finish,
    thoughts: submission.value?.thoughts,
  };

  await saveToRedis(payload);

  redirect(`/reviews/new/notes?rid=${redisId}&bid=${bottleId}`);
};

export default function NewReviewSetting() {
  // const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Hello from the NewReview Setting route</h1>
      <Form>
        {/* <input type="text" name="bid" value={data.bid} /> */}
        {/* <input type="text" name="rid" value={data.rid} /> */}
      </Form>
    </div>
  );
}
