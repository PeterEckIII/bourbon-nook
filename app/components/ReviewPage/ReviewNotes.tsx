import { ReviewPageReview } from "~/types/review";

interface ReviewNotesProps {
  review: ReviewPageReview;
}

export default function ReviewNotes({ review }: ReviewNotesProps) {
  return (
    <div className="flex flex-col">
      {/* REVIEW */}
      <h6 className="text-lg">Nose</h6>
      <div className="my-4 p-2 rounded shadow-lg">{review.nose}</div>
      <h6 className="text-lg">Palate</h6>
      <div className="my-4 p-2 rounded shadow-lg">{review.palate}</div>
      <h6 className="text-lg">Finish</h6>
      <div className="my-4 p-2 rounded shadow-lg">{review.finish}</div>
      <h6 className="text-lg">Final Thoughts</h6>
      <div className="my-4 p-2 rounded shadow-lg">{review.thoughts}</div>
    </div>
  );
}
