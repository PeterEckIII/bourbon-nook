import type { bottle, user, review } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import {
  useLoaderData,
  useFetcher,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { getBottle } from "~/models/bottle.server";
import { getReviewById } from "~/models/review.server";
import { requireUserId } from "~/session.server";
import ReviewPage from "~/components/Review/ReviewPage";
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

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  assertNonNullable(userId);
  const user = await getUserById(userId);
  assertNonNullable(user);

  const following = getFollowing(userId);

  assertNonNullable(params.reviewId);
  const review = await getReviewById(params.reviewId);
  assertNonNullable(review);
  assertNonNullable(review.bottleId);
  const reviewAuthorId = review.userId;
  const reviewAuthor = await getUserById(reviewAuthorId);
  assertNonNullable(reviewAuthor);
  const bottle = await getBottle(review.bottleId);
  assertNonNullable(bottle);
  assertNonNullable(bottle.imageUrl);
  return json<LoaderData>({
    review,
    bottle,
    imageUrl: bottle.imageUrl,
    user,
    reviewAuthor,
    following,
  });
};

// export const action: ActionFunction = async ({ request, params }) => {
//   const userId = await requireUserId(request);

//   const form = await request.formData();
//   const _deleted = await form.get("_deleted")?.toString();

//   if (_deleted) {
//     await deleteReview({ userId, id: params.reviewId as string });
//     return redirect("/reviews");
//   } else {
//     return redirect(`/reviews/${params.id}`);
//   }
// };

type Data = {
  review: review;
  bottle: bottle;
};

export default function TestRoute() {
  const data = useLoaderData();
  const { review, bottle }: Data = data;
  const navigate = useNavigate();
  const params = useParams();
  const follow = useFetcher<{ ok: boolean }>();

  const handleEditClick = () => {
    navigate(`/reviews/edit/${params.reviewId}`);
  };

  return (
    <ReviewPage
      bottle={bottle}
      review={review}
      handleEditClick={handleEditClick}
      follow={follow}
      user={data.user}
      author={data.reviewAuthor}
      following={data.following}
    />
  );
}
