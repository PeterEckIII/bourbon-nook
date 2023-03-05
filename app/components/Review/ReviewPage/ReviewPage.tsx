import type { bottle, review, user } from "@prisma/client";
import type { FetcherWithComponents } from "@remix-run/react";
import { useEffect, useRef } from "react";
import FollowForm from "~/components/Form/FollowForm";
import BottleImage from "../BottleImage";
import SettingDetails from "../SettingDetails";
import WrittenNotes from "../WrittenNotes";
import Carousel from "~/components/UI/Carousel/Carousel";
import noImage from "~/images/no_image.png";
import DataDisplay from "~/components/UI/DataDisplay";
import Bottle from "../Bottle/Bottle";

type ReviewPageProps = {
  bottle?: bottle;
  review?: review;
  handleEditClick: () => void;
  user: user;
  author: user;
  follow: FetcherWithComponents<{ ok: boolean }>;
  following: any[];
};

const userNameFormatter = (email: string) => {
  return email.replace(/@(\w*.(\w*))/, "");
};

export default function ReviewPage({
  bottle,
  review,
  user,
  author,
  following,
  follow,
  handleEditClick,
}: ReviewPageProps) {
  if (!bottle || !review || !handleEditClick) {
    throw new Error(`No bottle or review`);
  }
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (follow.type === "done" && follow.data.ok) {
      ref?.current?.reset();
    }
  }, [follow]);

  return (
    <div className="my-8 flex flex-col">
      {/* META */}
      <div className="flex flex-col">
        <div className="flex flex-col rounded bg-white shadow-lg shadow-blue-700">
          <h1 className="px-2 py-4 text-left text-3xl font-bold">
            {bottle.name}{" "}
            {bottle.batch !== "None" &&
            bottle.batch !== "none" &&
            bottle.batch !== "N/A" &&
            bottle.batch !== "n/a"
              ? bottle.batch
              : ""}
          </h1>
          <p className="px-2 py-4 text-2xl">
            <span className="font-bold">Reviewed on</span>: {review.date}
          </p>
          <h6 className="px-2 py-4 text-2xl">
            <span className="font-bold">Reviewed by</span>:{" "}
            {userNameFormatter(author.email)}
          </h6>{" "}
          {user.id !== review.userId ? (
            <FollowForm
              CustomForm={follow.Form}
              ref={ref}
              author={author}
              user={user}
              following={following}
            />
          ) : null}
        </div>
      </div>

      {/* BOTTLE */}
      <Bottle bottle={bottle} />
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

{
  /* <div className="my-8 flex flex-col rounded bg-white p-4 shadow-lg shadow-blue-700">
  <h5 className="mb-8 px-2 py-4 text-left text-3xl">Bottle</h5>
  <div className="ml-6 flex flex-col justify-center gap-6 lg:flex-row lg:justify-evenly">
    {typeof bottle.imageUrl !== "undefined" && bottle.imageUrl !== "" ? (
      <BottleImage bottle={bottle} />
    ) : (
      <img src={noImage} alt="No bottle to show" height="50px" width="175px" />
    )}
    <DataDisplay bottle={bottle} />
  </div>
</div>; */
}
