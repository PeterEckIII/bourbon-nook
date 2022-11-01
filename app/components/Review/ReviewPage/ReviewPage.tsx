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
        {/* <h1 className="my-2 text-2xl font-bold">
          {bottle.name}{" "}
          {bottle.batch !== "None" && bottle.batch !== "N/A"
            ? bottle.batch
            : ""}{" "}
        </h1>
        <p className="mb-8">{review.date}</p>
        {/* IMAGE */}
        {/* <div className="mb-2 sm:mb-12 sm:h-[500px] sm:w-[500px]">
          <ReviewImage imageUrl={imageUrl} bottleName={bottle.name} />
        </div>  */}
        {/*  BOTTLE  */}
        {/* <h4 className="mb-6 mt-12 text-left text-2xl sm:mt-36">Bottle</h4> */}
        {/* <div className=" flex rounded-lg border border-gray-200 bg-white shadow-md sm:mb-12 sm:h-[500px] sm:w-[500px]"> */}
        {/* <div className="flex w-1/2 flex-col border-r-2 bg-yellow-50">
            <div className="border py-1 text-center">Type</div>
            <div className="border py-1 text-center">Price</div>
            <div className="border py-1 text-center">ABV</div>
            <div className="border py-1 text-center">Proof</div>
            <div className="border py-1 text-center">Age</div>
            <div className="border py-1 text-center">Year</div>
            <div className="border py-1 text-center">Batch</div>
            <div className="border py-1 text-center">Distiller</div>
            <div className="border py-1 text-center">Bottler</div>
            <div className="border py-1 text-center">Producer</div>
            <div className="border py-1 text-center">Country</div>
            <div className="border py-1 text-center">Region</div>
          </div>
          <div className="flex w-1/2 flex-col">
            <div className="border py-1 text-center">{bottle.type}</div>
            <div className="border py-1 text-center">{bottle.price}</div>
            <div className="border py-1 text-center">
              {bottle.alcoholPercent}
            </div>
            <div className="border py-1 text-center">{bottle.proof}</div>
            <div className="border py-1 text-center">{bottle.age}</div>
            <div className="border py-1 text-center">{bottle.year}</div>
            <div className="border py-1 text-center">{bottle.batch}</div>
            <div className="border py-1 text-center">{bottle.distiller}</div>
            <div className="border py-1 text-center">{bottle.bottler}</div>
            <div className="border py-1 text-center">{bottle.producer}</div>
            <div className="border py-1 text-center">{bottle.country}</div>
            <div className="border py-1 text-center">{bottle.region}</div>
          </div> */}
        {/* </div> */}
        {/* SETTING */}
        {/* <h5 className="my-2 text-left text-2xl">Review</h5>
        <div className="my-2 flex flex-col">
          <div className="text-md flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h6 className="-mt-2 mb-2 text-center text-lg underline">
              Details
            </h6>
            <div className="mb-2 flex justify-between p-2">
              <div className="w-1/2 border-r-2 pr-2">
                <div className="p-2">
                  <div>
                    <strong>Glassware</strong>{" "}
                    <span className="block">{review.glassware}</span>
                  </div>
                </div>
                <div className="p-2">
                  <div>
                    <strong>Color</strong>
                    <span className="block"> {bottle.color}</span>
                  </div>
                </div>
              </div>
              <div className="ml-2">
                <div className="p-2">
                  <strong>Rest Time</strong>
                  <span className="block">{review.restTime}</span>
                </div>
                <div className="p-2">
                  <strong>Finishing</strong>
                  <span className="block">{bottle.finishing}</span>
                </div>
              </div>
            </div>
            <hr className="pt-2" />
            <div className="pt-4 text-sm">
              <strong>Setting</strong>: {review.setting}
            </div>
          </div>
          <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h6 className="-mt-2">
              <strong>Nose</strong>
            </h6>
            {review.nose}
          </div>
          <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h6 className="-mt-2">
              <strong>Palate</strong>
            </h6>
            {review.palate}
          </div>
          <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h6 className="-mt-2">
              <strong>Finish</strong>
            </h6>
            {review.finish}
          </div>
          <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h6 className="-mt-2">
              <strong>Final Thoughts</strong>
            </h6>
            {review.thoughts}
          </div>
        // </div> */}
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
