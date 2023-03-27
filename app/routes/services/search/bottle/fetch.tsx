import { requireUserId } from "~/session.server";
import { filterBottlesForTable, getTotalBottles } from "~/models/bottle.server";
import type { GridBottle } from "~/models/bottle.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";

export type BottleSearchData = {
  items: GridBottle[] | [];
  totalBottles: number;
  totalPages: number;
  error?: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);

  const query = url.searchParams.get("query") || "";
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  let offset = page * limit;

  try {
    const bottles = await filterBottlesForTable({
      userId,
      query: query,
      skip: offset,
      take: limit,
    });
    const totalBottles = await getTotalBottles({ userId, query: query });

    const totalPages = Math.ceil(totalBottles / limit);

    return json<BottleSearchData>({
      items: bottles,
      totalBottles,
      totalPages,
    });
  } catch (error) {
    return json<BottleSearchData>({
      items: [],
      totalBottles: 0,
      totalPages: 0,
      error: `Error finding bottles: ${error}`,
    });
  }
};
