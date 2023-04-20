import type { Ref } from "react";
import { filterBottlesForTable, getTotalBottles } from "~/models/bottle.server";
import type { GridBottle } from "~/models/bottle.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { Prisma } from "@prisma/client";
import { auth } from "~/utils/auth.server";

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
  ref: Ref<HTMLTableCellElement>;
};

export type BottleSearchData = {
  items: GridBottle[] | [];
  totalBottles: number;
  totalPages: number;
  error?: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  let user = await auth.isAuthenticated(request, { failureRedirect: "/login" });
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
      userId: user.id,
      query: query,
      skip: offset,
      take: limit,
    });
    const totalBottles = await getTotalBottles({
      userId: user.id,
      query: query,
    });

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
