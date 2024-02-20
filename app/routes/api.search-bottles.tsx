import { LoaderFunction, json } from "@remix-run/node";

import { searchBottles } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";
import type { TableBottle } from "~/types/bottle";

// type TableBottleWithoutCreatedAt = Omit<TableBottle, "createdAt">;
// type FormattedTableBottle = TableBottleWithoutCreatedAt & {
//   createdAt: Date | null;
// };

export interface BottleSearchData {
  bottles: TableBottle[] | [];
  bottleCount: number;
  totalPages: number;
  error?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  const offset = page * limit;

  try {
    const bottles = await searchBottles(userId, query, offset, limit);
    const bottleCount = bottles.length;

    const totalPages = Math.ceil(bottleCount / limit);

    return json<BottleSearchData>({
      bottles,
      bottleCount,
      totalPages,
    });
  } catch (error) {
    return json<BottleSearchData>({
      bottles: [],
      bottleCount: 0,
      totalPages: 0,
      error: `Error finding bottles with query ${query} -- Msg: ${error}`,
    });
  }
};
