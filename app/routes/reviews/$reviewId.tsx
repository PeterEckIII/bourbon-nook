import type { bottle, user, review } from "@prisma/client";
import type {
  LoaderFunction,
  ActionFunction,
  LinksFunction,
} from "@remix-run/server-runtime";
import { json, redirect } from "@remix-run/server-runtime";
import {
  useLoaderData,
  useCatch,
  useFetcher,
  useNavigate,
  useParams,
  Outlet,
} from "@remix-run/react";
import { getBottle } from "~/models/bottle.server";
import { deleteReview, getReviewById } from "~/models/review.server";
import { requireUserId } from "~/session.server";
import ReviewPage from "~/components/Review/ReviewPage/ReviewPage";
import { getUserById } from "~/models/user.server";
import { assertNonNullable } from "~/utils/helpers.server";
import { getFollowing } from "~/models/follower.server";

type LoaderData = {
  review: review;
  bottle: bottle;
  imageUrl?: string;
  user: user;
  reviewAuthor: user;
  following: any;
};

export const links: LinksFunction = () => [
  {
    href: "https://fonts.googleapis.com",
    rel: "preconnect",
  },
  {
    href: "https://fonts.gstatic.com",
    rel: "preconnect",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Caveat&display=swap",
    rel: "stylesheet",
  },
];

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId, `User ID is undefined`);

  const user = await getUserById(userId);
  assertNonNullable(user, `User is undefined`);

  const following = getFollowing(userId);
  assertNonNullable(params.reviewId, `ReviewId is undefined`);

  const review = await getReviewById(params.reviewId);
  assertNonNullable(review, `Review is undefined`);
  assertNonNullable(review.bottleId, `BottleId is undefined`);

  const reviewAuthorId = review.userId;
  const reviewAuthor = await getUserById(reviewAuthorId);
  assertNonNullable(reviewAuthor, `Author is undefined`);

  const bottle = await getBottle(review.bottleId);

  assertNonNullable(bottle, `Bottle is undefined`);
  assertNonNullable(bottle.imageUrl, `ImageURL is undefined`);
  return json<LoaderData>({
    review,
    bottle,
    imageUrl: bottle.imageUrl,
    user,
    reviewAuthor,
    following,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  const form = await request.formData();
  const _deleted = await form.get("_deleted")?.toString();

  if (_deleted) {
    await deleteReview({ userId, id: params.reviewId as string });
    return redirect("/reviews");
  } else {
    return redirect(`/reviews/${params.id}`);
  }
};

type Data = {
  review: review;
  bottle: bottle;
};

export default function ReviewDetailsPage() {
  const data = useLoaderData();
  const { review, bottle }: Data = data;
  const navigate = useNavigate();
  const params = useParams();
  const follow = useFetcher();

  const handleEditClick = () => {
    navigate(`/reviews/edit/${params.reviewId}`);
  };

  return (
    <div className="align-center flex w-full flex-col justify-center">
      <ReviewPage
        bottle={bottle}
        review={review}
        handleEditClick={handleEditClick}
        follow={follow}
        user={data.user}
        author={data.reviewAuthor}
        following={data.following}
      />
      <div className="min-h-[200px]">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <div className="bg-red-300 text-red-800">
      An unexpected error occurred: {error.message}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Review not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
