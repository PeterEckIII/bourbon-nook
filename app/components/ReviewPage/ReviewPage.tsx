import { ReviewPageBottle, ReviewPageReview } from "~/types/review";

import ReviewDetail from "./ReviewDetail";
import ReviewGraphs from "./ReviewGraphs";
import ReviewImage from "./ReviewImage";
import ReviewNotes from "./ReviewNotes";

interface ReviewPageProps {
  review: ReviewPageReview;
  bottle: ReviewPageBottle;
}

export default function ReviewPage({ review, bottle }: ReviewPageProps) {
  return (
    <div className="flex justify-center">
      <main className="flex flex-col m-8 p-8 w-7/12 bg-slate-100 rounded">
        <div className="flex p-4">
          <ReviewImage
            bottleName={bottle.name}
            imageUrl="https://www.drinkhacker.com/wp-content/uploads/2021/05/Stagg-Jr-131.1-Atmosphere-shot-scaled-1-e1622062421577.jpg"
          />
          <ReviewDetail bottle={bottle} review={review} />
        </div>
        <div>
          <ReviewNotes review={review} />
        </div>
        <ReviewGraphs review={review} />
      </main>
    </div>
  );
}
