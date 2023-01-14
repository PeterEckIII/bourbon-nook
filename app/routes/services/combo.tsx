import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { Bottle } from "~/components/UI/Combobox/Combobox";
import { getBottlesForCombobox } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import { assertNonNullable } from "~/utils/helpers.server";

export type LoaderData = {
  bottles: Bottle[];
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId);

  let url = new URL(request.url);
  let query = url.searchParams.get("query")?.toLowerCase() || "";
  const bottles = await getBottlesForCombobox(userId, query);
  return json<LoaderData>({
    bottles,
  });
};
