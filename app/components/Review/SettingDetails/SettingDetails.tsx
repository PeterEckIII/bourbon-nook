import type { Bottle, Review } from "@prisma/client";

type SettingDetailsProps = {
  review: Review;
  bottle: Bottle;
};

export default function SettingDetails({
  review,
  bottle,
}: SettingDetailsProps) {
  return (
    <div className="mx-3 mt-6 flex min-w-[350px]">
      <div className="border-1 my-4 flex flex-col rounded-md border-gray-700 py-4 px-6">
        <h6 className="mb-4 text-left text-lg underline">Details</h6>
        <div className="flex">
          <div className="flex flex-col border-r-2">
            <div className="my-2 mr-4 pr-4 text-left font-semibold">
              Glassware
            </div>
            <div className="my-2 mr-4 pr-4 text-left font-semibold">
              Rest Time
            </div>
            <div className="my-2 mr-4 pr-4 text-left font-semibold">Color</div>
            <div className="my-2 mr-4 pr-4 text-left font-semibold">
              Finishing
            </div>
          </div>
          <div className="flex flex-col">
            <div className="my-2 ml-4 pl-4 text-right">{review.glassware}</div>
            <div className="my-2 ml-4 pl-4 text-right">{review.restTime}</div>
            <div className="my-2 ml-4 pl-4 text-right">{bottle.color}</div>
            <div className="my-2 ml-4 pl-4 text-right">{bottle.finishing}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
