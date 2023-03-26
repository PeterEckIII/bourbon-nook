import { requireUserId } from "~/session.server";
import { getTotalBottles, sortBottlesForTable } from "~/models/bottle.server";
import type { GridBottle } from "~/models/bottle.server";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { assertNonNullable } from "~/utils/helpers.server";

export type BottleSortedData = {
  data: GridBottle[] | [];
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
  const sort = url.searchParams.get("sort") || undefined;
  const field = url.searchParams.get("field");
  assertNonNullable(sort);
  assertNonNullable(field);

  try {
    const sortedBottles = await sortBottlesForTable({
      userId,
      sortDirection: sort,
      field: field as keyof GridBottle,
      query,
    });

    console.log(`Bottles: ${JSON.stringify(sortedBottles)}`);

    const totalBottles = await getTotalBottles({ userId, query });
    const totalPages = Math.ceil(totalBottles / limit);
    return json<BottleSortedData>({
      data: sortedBottles,
      totalBottles,
      totalPages,
    });
  } catch (error) {
    return json<BottleSortedData>({
      data: [],
      totalBottles: 0,
      totalPages: 0,
      error: `Error sorting bottles: ${error}`,
    });
  }
};
