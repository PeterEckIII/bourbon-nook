import type { LoaderArgs } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const from = Number(url.searchParams.get("from"));
  const to = Number(url.searchParams.get("to"));

  if (from >= 0 && to > 0) {
    const reviews = await prisma.review.findMany({
      where: { userId },
      skip: from,
      take: to - from,
      select: {
        date: true,
        id: true,
        overallRating: true,
        value: true,
        bottle: {
          select: {
            name: true,
            type: true,
            distiller: true,
            producer: true,
            proof: true,
            alcoholPercent: true,
            age: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });
    return reviews;
  } else {
    return [];
  }
}
