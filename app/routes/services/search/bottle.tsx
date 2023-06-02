import { requireUserId } from "~/session.server";
import { filterBottlesForTable, getTotalBottles } from "~/models/bottle.server";
import type { APIBottle, BottleSortOptions } from "~/utils/types";
import { json, type LoaderArgs } from "@remix-run/server-runtime";
import type { Prisma } from "@prisma/client";

export type BottleSearchData = {
  data: APIBottle[] | [];
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

  const sort = url.searchParams.get("sort") as BottleSortOptions;
  const direction = url.searchParams.get("direction") as Prisma.SortOrder;

  try {
    const bottles = await filterBottlesForTable({
      userId,
      query,
      skip: offset,
      take: limit,
      sort,
      direction,
    });
    const totalBottles = await getTotalBottles({ userId, query });

    const totalPages = Math.ceil(totalBottles / limit);

    return json<BottleSearchData>({
      data: bottles,
      totalBottles,
      totalPages,
    });
  } catch (error) {
    return json<BottleSearchData>({
      data: [],
      totalBottles: 0,
      totalPages: 0,
      error: `Error finding bottles: ${error}`,
    });
  }
};
