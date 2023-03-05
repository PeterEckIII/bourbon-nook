import { Form } from "@remix-run/react";
import { Link } from "react-router-dom";
import NoteTabs from "~/components/Review/NoteTabs/NoteTabs";
import Button from "~/components/UI/Button";
import ButtonGroup from "~/components/UI/ButtonGroup/ButtonGroup";
import Collapsible from "~/components/UI/Collapsible";
import type { RedisFormData } from "~/utils/types";

type ConfirmFormProps = {
  data?: RedisFormData;
};

export default function ConfirmForm({ data }: ConfirmFormProps) {
  return (
    <div className="w-full bg-white">
      <div className="my-2 flex flex-col">
        <div className="flex flex-col p-4">
          <h1 className="text-2xl">
            {data?.name}{" "}
            {data?.batch !== "None" &&
            data?.batch !== "none" &&
            data?.batch !== "N/A" &&
            data?.batch !== "n/a/"
              ? data?.batch
              : null}
          </h1>
          <p>{data?.date}</p>
          {/* Bottle */}
          <Collapsible label="Bottle Information">
            <div className="my-4 flex rounded-lg border border-gray-200 bg-white shadow-md">
              <div className="flex w-1/2 flex-col border-r-2 bg-yellow-50">
                <div className="border py-1 text-center">Type</div>
                <div className="border py-1 text-center">Price</div>
                <div className="border py-1 text-center">ABV</div>
                <div className="border py-1 text-center">Proof</div>
                <div className="border py-1 text-center">Age</div>
                <div className="border py-1 text-center">Year</div>
                <div className="border py-1 text-center">Batch</div>
                <div className="border py-1 text-center">Distiller</div>
                <div className="border py-1 text-center">Producer</div>
                <div className="border py-1 text-center">Country</div>
                <div className="border py-1 text-center">Region</div>
              </div>
              <div className="flex w-1/2 flex-col">
                <div className="border py-1 text-center">{data?.type}</div>
                <div className="border py-1 text-center">{data?.price}</div>
                <div className="border py-1 text-center">
                  {data?.alcoholPercent}
                </div>
                <div className="border py-1 text-center">{data?.proof}</div>
                <div className="border py-1 text-center">{data?.age}</div>
                <div className="border py-1 text-center">{data?.year}</div>
                <div className="border py-1 text-center">{data?.batch}</div>
                <div className="border py-1 text-center">{data?.distiller}</div>
                <div className="border py-1 text-center">{data?.producer}</div>
                <div className="border py-1 text-center">{data?.country}</div>
                <div className="border py-1 text-center">{data?.region}</div>
              </div>
            </div>
          </Collapsible>
          <div className="my-2 text-right">
            <Link to={`/reviews/new/bottle?rid=${data?.redisId}`}>
              Edit Bottle Information
            </Link>
          </div>
          <Collapsible label="Setting Information">
            <div className="my-2 flex flex-col">
              <div className="text-md flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h6 className="-mt-2 mb-2 text-center text-lg underline">
                  Details
                </h6>
                <div className="mx-3 mt-6 flex min-w-[350px] justify-center">
                  <div className="border-1 my-4 flex flex-col rounded-md border-gray-700 py-4 px-6">
                    <div className="flex">
                      <div className="flex flex-col border-r-2">
                        <div className="my-2 mr-4 pr-4 text-left font-semibold">
                          Glassware
                        </div>
                        <div className="my-2 mr-4 pr-4 text-left font-semibold">
                          Rest Time
                        </div>
                        <div className="my-2 mr-4 pr-4 text-left font-semibold">
                          Color
                        </div>
                        <div className="my-2 mr-4 pr-4 text-left font-semibold">
                          Finishing
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="my-2 ml-4 pl-6 text-left">
                          {data?.glassware}
                        </div>
                        <div className="my-2 ml-4 pl-6 text-left">
                          {data?.restTime}
                        </div>
                        <div className="my-2 ml-4 pl-6 text-left">
                          {data?.color}
                        </div>
                        <div className="my-2 ml-4 pl-6 text-left">
                          {data?.finishing}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="pt-2" />
                <div className="pt-4 text-sm">
                  <strong>Setting</strong>: {data?.setting}
                </div>
              </div>
              <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h6 className="my-2 font-semibold">Nose</h6>
                {data?.nose}
              </div>
              <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h6 className="my-2 font-semibold">Palate</h6>
                {data?.palate}
              </div>
              <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h6 className="my-2 font-semibold">Finish</h6>
                {data?.finish}
              </div>
              <div className="text-md mt-6 flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                <h6 className="my-2 font-semibold">Final Thoughts</h6>
                {data?.thoughts}
              </div>
            </div>
          </Collapsible>
          <div className="my-2 text-right">
            <Link
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              to={`/reviews/new/setting?id=${data?.redisId}`}
            >
              Edit Your Review
            </Link>
          </div>
          <Collapsible label="Tasting Notes">
            <div className="flex justify-center">
              <NoteTabs
                fruit={{
                  cherry: data?.cherry as number,
                  strawberry: data?.strawberry as number,
                  raspberry: data?.raspberry as number,
                  blackberry: data?.blackberry as number,
                  blueberry: data?.blueberry as number,
                  apple: data?.apple as number,
                  banana: data?.banana as number,
                  grape: data?.grape as number,
                  stone: data?.stone as number,
                  citrus: data?.citrus as number,
                  tropical: data?.tropical as number,
                }}
                spice={{
                  pepper: data?.pepper as number,
                  bakingSpice: data?.bakingSpice as number,
                  cinnamon: data?.cinnamon as number,
                  herbal: data?.herbal as number,
                  mint: data?.mint as number,
                }}
                earthy={{
                  coffee: data?.coffee as number,
                  tobacco: data?.tobacco as number,
                  leather: data?.leather as number,
                  oak: data?.oak as number,
                  toasted: data?.toasted as number,
                  smokey: data?.smokey as number,
                  peanut: data?.peanut as number,
                  almond: data?.almond as number,
                  pecan: data?.pecan as number,
                  walnut: data?.walnut as number,
                  oily: data?.oily as number,
                  floral: data?.floral as number,
                }}
                grain={{
                  corn: data?.corn as number,
                  rye: data?.rye as number,
                  wheat: data?.wheat as number,
                  malt: data?.malt as number,
                  dough: data?.dough as number,
                }}
                sweet={{
                  vanilla: data?.vanilla as number,
                  caramel: data?.caramel as number,
                  molasses: data?.molasses as number,
                  butterscotch: data?.butterscotch as number,
                  honey: data?.honey as number,
                  chocolate: data?.chocolate as number,
                  toffee: data?.toffee as number,
                  sugar: data?.sugar as number,
                }}
                rating={{
                  value: data?.value as number,
                  overallRating: data?.overallRating as number,
                }}
              />
            </div>
          </Collapsible>
          <div className="my-2 text-right">
            <Link
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              to={`/reviews/new/notes?id=${data?.redisId}`}
            >
              Edit Tasting Notes
            </Link>
          </div>
        </div>
      </div>
      <Form method="post" className="space-between flex w-full">
        <input type="hidden" name="redisId" value={data?.redisId} />
        <input type="hidden" name="bottleId" value={data?.bottleId} />
        <input type="hidden" name="imageUrl" value={data?.imageUrl} />
        <div className="flex justify-between">
          <div>
            <Link to={`/reviews/new/notes?rid=${data?.redisId}`}>
              <Button primary callToAction="Back" type="button" />
            </Link>
          </div>
          <div>
            <Button primary callToAction="Submit" type="submit" />
          </div>
        </div>
      </Form>
    </div>
  );
}
