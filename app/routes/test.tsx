import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";

export const loader = (async ({ params }) => {
  invariant(params.slug, "Expected params.slug");

  const review = await prisma.review.findUnique({
    where: { id: params.slug },
    include: { comments: true, bottle: true },
  });

  if (review === null) {
    throw json("Not found", { status: 404 });
  }

  return json({ review });
}) satisfies LoaderFunction;

export default function TestPage() {
  const { review } = useLoaderData<typeof loader>();

  return (
    <article key={review.id}>
      <h1>{review.bottle?.name}</h1>
      <div>
        <p>{review.overallRating}</p>
        <p>{review.value}</p>
      </div>
      <ul>
        {review.comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </article>
  );
}
