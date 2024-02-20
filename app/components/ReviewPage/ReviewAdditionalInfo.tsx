import { ReviewPageBottle, ReviewPageReview } from "~/types/review";

interface ReviewAdditionalInfoProps {
  review: ReviewPageReview;
  bottle: ReviewPageBottle;
}

export default function ReviewAdditionalInfo({
  review,
  bottle,
}: ReviewAdditionalInfoProps) {
  console.log(
    `Review: ${JSON.stringify(review, null, 2)}\nBottle: ${JSON.stringify(
      bottle,
      null,
      2,
    )}`,
  );

  return (
    <div>
      {/* More info */}
      <h4 className="text-lg">Additional Information</h4>
      <div></div>
    </div>
  );
}
