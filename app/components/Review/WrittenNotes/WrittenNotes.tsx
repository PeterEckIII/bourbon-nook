import type { Review } from "@prisma/client";

interface IWrittenNotesProps {
  review: Review;
}

export default function WrittenNotes({ review }: IWrittenNotesProps) {
  return (
    <div className="my-4 ml-4 flex flex-col">
      <div className="w-[80%]">
        <h6 className="text-2lg mt-8 mb-4 ml-1 text-left font-semibold">
          Nose
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.nose}
        </div>
      </div>
      <div className="w-[80%]">
        <h6 className="text-2lg mt-8 mb-4 ml-1 text-left font-semibold">
          Palate
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.palate}
        </div>
      </div>
      <div className="w-[80%]">
        <h6 className="text-2lg mt-8 mb-4 ml-1 text-left font-semibold">
          Finish
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.finish}
        </div>
      </div>
      <div className="w-[80%]">
        <h6 className="text-2lg mt-8 mb-4 ml-1 text-left font-semibold">
          Final Thoughts
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.thoughts}
        </div>
      </div>
    </div>
  );
}
