import type { Bottle, Review } from "@prisma/client";
import EditIcon from "~/components/Icons/EditIcon";
import DeleteIcon from "~/components/Icons/DeleteIcon";
import { Form } from "@remix-run/react";
import ReviewImage from "../ReviewImage";
import NoteTabs from "../NoteTabs/NoteTabs";
import BottleDetails from "../BottleDetails";
import SettingDetails from "../SettingDetails";
import WrittenNotes from "../WrittenNotes";

interface ReviewPageProps {
  bottle?: Bottle;
  review?: Review;
  handleEditClick: () => void;
}

export default function ReviewPage({
  bottle,
  review,
  handleEditClick,
}: ReviewPageProps) {
  if (!bottle || !review || !review.imageUrl || !handleEditClick) {
    throw new Error(`Error with props!`);
  }
  return (
    // CONTAINER
    <div className="my-2 flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <h1 className="mb-4 text-left text-2xl">
            {bottle.name}{" "}
            {bottle.batch !== "None" && bottle.batch !== "N/A"
              ? bottle.batch
              : ""}{" "}
          </h1>
          <p className="mb-4 text-left">{review.date}</p>
          <div className="mb-2">
            <div className="flex h-[400px] w-[300px]">
              <img src={review.imageUrl} alt={`Bottle of ${bottle.name}`} />
            </div>
          </div>
        </div>
        <BottleDetails bottle={bottle} />
        <SettingDetails bottle={bottle} review={review} />
        <WrittenNotes review={review} />
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
      <div className="flex justify-end">
        <div className="m-1 inline text-right">
          <button
            id="edit-button"
            onClick={handleEditClick}
            className="my-4 rounded bg-blue-500 py-2 px-6 text-white hover:bg-blue-700 focus:bg-blue-400"
          >
            <EditIcon /> Edit
          </button>
        </div>
        <Form method="post" className="m-1 inline text-right">
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
    </div>
  );
}
