import { ReviewPageBottle, ReviewPageReview } from "~/types/review";

import Pricetag from "../Pricetag/Pricetag";

import Status from "./Status";

interface ReviewDetailProps {
  review: ReviewPageReview;
  bottle: ReviewPageBottle;
}

export default function ReviewDetail({ review, bottle }: ReviewDetailProps) {
  return (
    <div className="flex flex-col w-1/2">
      <div className="flex p-4">
        <div className="w-1/3 flex flex-col">
          <h1 className="text-6xl m-4">{bottle.name}</h1>
          <div className="italic mx-5 mt-2">
            {bottle.type}, {bottle.distiller}
          </div>
        </div>
        <div className="w-1/3 flex justify-center items-center flex-col text-lg">
          {bottle.batch !== "N/A" ? <div>Batch {bottle.batch}</div> : null}
          {bottle.barrel !== "N/A" ? <div>Barrel #</div> : null}
          <div>{bottle.year}</div>
        </div>
        <div className="w-1/3 flex justify-between items-end flex-col">
          <Pricetag price={bottle.price} />
          <Status status={bottle.status} />
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <div className="text-3xl mx-4 px-4">
          {bottle.proof}pf (<span>{bottle.alcoholPercent}%</span>)
        </div>
        <div className="text-3xl mx-4 px-4">{bottle.age}</div>
        <div className="text-3xl mx-4 px-4">
          {bottle.region}, {bottle.country}
        </div>
      </div>
    </div>
  );
}
