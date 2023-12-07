import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteBottle } from "~/models/bottle.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  const bottleId = params.bottleId;
  invariant(bottleId, "Missing bottle ID parameter");
  await deleteBottle({ id: bottleId });

  return redirect("/bottles");
};
