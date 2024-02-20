import { ReviewPageReview } from "~/types/review";

interface ReviewGraphsProps {
  review: ReviewPageReview;
}

export default function ReviewGraphs({ review }: ReviewGraphsProps) {
  console.log(`Review: ${JSON.stringify(review, null, 2)}`);
  return (
    <div className="flex justify-center items-center">
      <h4>Graphs!</h4>
    </div>
  );
}
