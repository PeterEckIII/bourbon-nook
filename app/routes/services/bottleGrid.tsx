import type { LoaderArgs } from "@remix-run/server-runtime";
import { getBottlesForGrid } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";

export type BottleGridData = {
  id: string;
  status: string;
  name: string;
  type: string;
  distiller: string | null;
  producer: string | null;
  country: string | null;
  region: string | null;
  price: string | null;
  age: string | null;
  year: string | null;
  batch: string | null;
  alcoholPercent: string | null;
  proof: string | null;
  size: string | null;
  color: string | null;
  finishing: string | null;
  imageUrl: string | null;
  reviews: {
    id: string;
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const from = Number(url.searchParams.get("from"));
  const to = Number(url.searchParams.get("to"));

  if (from >= 0 && to > 0) {
    const bottles = await getBottlesForGrid(userId, from, to);
    return bottles;
  }
  return [];
};
