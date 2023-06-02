import type { bottle, review, user } from "@prisma/client";
import type { FetcherWithComponents } from "@remix-run/react";
import { useEffect, useRef } from "react";
import SettingDetails from "../SettingDetails";
import WrittenNotes from "../WrittenNotes";
import Carousel from "~/components/UI/Carousel/Carousel";
import Bottle from "../Bottle/Bottle";
import ReviewHeader from "../ReviewHeader";

type ReviewPageProps = {
  bottle?: bottle;
  review?: review;
  handleEditClick: () => void;
  user: user;
  author: user;
  follow: FetcherWithComponents<{ ok: boolean }>;
  following: any[];
  numComments: number;
};

export default function ReviewPage({
  bottle,
  review,
  user,
  author,
  following,
  follow,
  numComments,
  handleEditClick,
}: ReviewPageProps) {
  if (!bottle || !review || !handleEditClick) {
    throw new Error(`No bottle or review`);
  }
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (follow.state === "idle" && follow.data !== null) {
      ref?.current?.reset();
    }
  }, [follow]);

  return (
    <div className="my-8 flex flex-col">
      {/* META */}
      <div className="flex flex-col">
        <ReviewHeader
          name={bottle.name}
          date={review?.date ?? ""}
          author={author}
          user={user}
          following={following}
          numComments={numComments}
        />
      </div>

      {/* BOTTLE */}
      <Bottle bottle={bottle} reviewId={review.id} />
      {/* REVIEW */}
      <div className="shadow-blue-700p-2 mb-8 flex flex-col rounded-md bg-white p-2 shadow-lg">
        <h5 className="mb-8 px-2 py-4 text-left text-3xl">Review</h5>
        <SettingDetails review={review} />
        <WrittenNotes review={review} />
      </div>
      {/* NOTES */}
      <div className="mb-4 flex flex-col items-center rounded-md bg-white p-2 shadow-lg shadow-blue-700">
        <h1 className="mb-8 self-start px-2 py-4 text-left text-3xl">Notes</h1>
        <Carousel review={review} />
      </div>
    </div>
  );
}
