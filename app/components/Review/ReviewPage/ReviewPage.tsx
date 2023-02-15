import type { bottle, review, user } from "@prisma/client";
import EditIcon from "~/components/Icons/EditIcon";
import DeleteIcon from "~/components/Icons/DeleteIcon";
import { Form } from "@remix-run/react";
import type { FetcherWithComponents } from "@remix-run/react";
import NoteTabs from "../NoteTabs/NoteTabs";
import BottleDetails from "../BottleDetails";
import SettingDetails from "../SettingDetails";
import WrittenNotes from "../WrittenNotes";
import { useEffect, useRef } from "react";
import FollowForm from "~/components/Form/FollowForm";

interface ReviewPageProps {
  bottle?: bottle;
  review?: review;
  handleEditClick: () => void;
  user: user;
  author: user;
  follow: FetcherWithComponents<{ ok: boolean }>;
  following: any[];
}

export default function ReviewPage({
  bottle,
  review,
  handleEditClick,
  user,
  author,
  follow,
  following,
}: ReviewPageProps) {
  if (!bottle || !review || !handleEditClick) {
    throw new Error(`Error with props!`);
  }

  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (follow.type === "done" && follow.data.ok) {
      console.log(`DATA: ${JSON.stringify(follow.data)}`);
      ref?.current?.reset();
    }
  }, [follow]);

  return (
    // CONTAINER
    <div className="my-2 flex flex-col p-2">
      <div className="flex flex-col">
        {/* META INFO */}
        <div className="mb-4 flex flex-col rounded-md bg-white p-2 shadow-lg shadow-blue-700">
          <h1 className="mb-8 text-left text-2xl font-semibold">
            {bottle.name}{" "}
            {bottle.batch !== "None" && bottle.batch !== "N/A"
              ? bottle.batch
              : ""}{" "}
          </h1>
          <p className="mb-8 text-left text-xl">
            <span className="font-bold">Reviewed on</span>: {review.date}
          </p>
          <h6 className="text-xl">
            <span className="font-bold">Reviewed by</span>: {author.email}
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
        {/* BOTTLE */}
        <div className="mb-4 rounded-md bg-white p-2 shadow-lg shadow-blue-700">
          <h5 className="mb-8 px-2 py-4 text-left text-3xl">Bottle</h5>
          <div className="flex">
            {bottle.imageUrl && (
              <div className="w-[300px]">
                <div className="flex h-[500px] w-[400px]">
                  <img src={bottle.imageUrl} alt={`Bottle of ${bottle.name}`} />
                </div>
              </div>
            )}
            <BottleDetails bottle={bottle} />
          </div>
        </div>
        <div className="shadow-blue-700p-2 mb-4 flex flex-col rounded-md bg-white p-2 shadow-lg">
          <h5 className="mb-8 px-2 py-4 text-left text-3xl">Review</h5>
          <SettingDetails review={review} />
          <WrittenNotes review={review} />
        </div>
      </div>

      <div className="mt-4 flex">
        <NoteTabs
          fruit={{
            cherry: review.cherry as number,
            strawberry: review.strawberry as number,
            raspberry: review.raspberry as number,
            blackberry: review.blackberry as number,
            blueberry: review.blueberry as number,
            apple: review.apple as number,
            banana: review.banana as number,
            grape: review.grape as number,
            stone: review.stone as number,
            citrus: review.citrus as number,
            tropical: review.tropical as number,
          }}
          spice={{
            pepper: review.pepper as number,
            bakingSpice: review.bakingSpice as number,
            cinnamon: review.cinnamon as number,
            herbal: review.herbal as number,
            mint: review.mint as number,
          }}
          earthy={{
            coffee: review.coffee as number,
            tobacco: review.tobacco as number,
            leather: review.leather as number,
            oak: review.oak as number,
            toasted: review.toasted as number,
            smokey: review.smokey as number,
            peanut: review.peanut as number,
            almond: review.almond as number,
            pecan: review.pecan as number,
            walnut: review.walnut as number,
            oily: review.oily as number,
            floral: review.floral as number,
          }}
          grain={{
            corn: review.corn as number,
            rye: review.rye as number,
            wheat: review.wheat as number,
            malt: review.malt as number,
            dough: review.dough as number,
          }}
          sweet={{
            vanilla: review.vanilla as number,
            caramel: review.caramel as number,
            molasses: review.molasses as number,
            butterscotch: review.butterscotch as number,
            honey: review.honey as number,
            chocolate: review.chocolate as number,
            toffee: review.toffee as number,
            sugar: review.sugar as number,
          }}
          rating={{
            value: review.value as number,
            overallRating: review.overallRating as number,
          }}
        />
      </div>
      {user.id === review.userId ? (
        <div className="flex justify-end">
          <div className="m-1 inline text-right">
            <button
              id="edit-button"
              onClick={handleEditClick}
              className="my-4 rounded bg-white py-2 px-6 text-blue-700 hover:bg-gray-300 focus:bg-gray-300"
            >
              <EditIcon /> Edit
            </button>
          </div>
          <Form method="post" className="m-1 inline text-right shadow">
            <input type="hidden" name="_deleted" value="_deleted" />
            <button
              id="delete-button"
              type="submit"
              className="my-4 rounded bg-red-500 py-2 px-4 text-white hover:bg-red-700 focus:bg-red-400"
            >
              <DeleteIcon /> Delete
            </button>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
