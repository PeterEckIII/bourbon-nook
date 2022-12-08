import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const reviewId = params.reviewId;
  const url = new URL(request.url);
  const parentId = url.searchParams.get("parentId");
  return json(
    await prisma.comment.findMany({
      where: {
        reviewId,
        parentId,
      },
      select: {
        id: true,
        parentId: true,
        body: true,
        createdAt: true,
        user: true,
      },
    })
  );
};
