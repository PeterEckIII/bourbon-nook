import { requireUserId } from "~/session.server";
import { filterBottlesForTable, getTotalBottles } from "~/models/bottle.server";
import type { GridBottle } from "~/models/bottle.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { Prisma } from "@prisma/client";

export type Limit = 10 | 25 | 50 | 75 | 100 | 250;

export type BottleData = {
  bottles: GridBottle[] | [];
  totalPages: number;
};

export type Column = {
  header: string;
  field: keyof GridBottle;
  sort: boolean;
  sortDirection: Prisma.SortOrder;
};

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
  const sort = url.searchParams.get("sort") || undefined;
  const direction = url.searchParams.get("direction") || undefined;
  const limit = Number(url.searchParams.get("limit"));
  const page = Number(url.searchParams.get("page"));
  let offset = page * limit;

  try {
    const bottles = await filterBottlesForTable({
      sort: sort as keyof GridBottle,
      direction: direction as Prisma.SortOrder,
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
