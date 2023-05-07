import { filterBottlesForTable, getTotalBottles } from "~/models/bottle.server";
import { json } from "@remix-run/server-runtime";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { Prisma } from "@prisma/client";
import { requireUserId } from "~/session.server";
import type { TableData, GridBottle } from "~/utils/types";

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
    const totalBottles = await getTotalBottles({
      userId,
      query: query,
    });

    const totalPages = Math.ceil(totalBottles / limit);

    return json<TableData<GridBottle[]>>({
      kind: "bottle",
      items: bottles,
      totalItems: totalBottles,
      totalPages,
    });
  } catch (error) {
    return json<TableData<GridBottle[]>>({
      kind: "review",
      items: [],
      totalItems: 0,
      totalPages: 0,
      error: `Error finding bottles: ${error}`,
    });
  }
};
