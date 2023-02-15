import type { review } from "@prisma/client";

interface IWrittenNotesProps {
  review: review;
}

export default function WrittenNotes({ review }: IWrittenNotesProps) {
  return (
    <div className="my-4 ml-4 flex flex-col">
      <div className="w-[80%]">
        <h6 className="mt-8 mb-4 ml-1 text-left text-2xl font-bold text-blue-700">
          Nose
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.nose}
        </div>
      </div>
      <div className="w-[80%]">
        <h6 className="mt-8 mb-4 ml-1 text-left text-2xl font-bold text-blue-700">
          Palate
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.palate}
        </div>
      </div>
      <div className="w-[80%]">
        <h6 className="mt-8 mb-4 ml-1 text-left text-2xl font-bold text-blue-700">
          Finish
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.finish}
        </div>
      </div>
      <div className="w-[80%]">
        <h6 className="mt-8 mb-4 ml-1 text-left text-2xl font-bold text-blue-700">
          Final Thoughts
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {review.thoughts}
        </div>
      </div>
    </div>
  );
}
