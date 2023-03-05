import type { review } from "@prisma/client";

type SettingDetailsProps = {
  review: review;
};

export default function SettingDetails({ review }: SettingDetailsProps) {
  return (
    <>
      <div className="md:w- ml-4 flex w-[75%] justify-evenly rounded-xl border-2 border-blue-400 p-4 text-lg font-semibold text-blue-700 md:justify-start lg:w-[50%] xl:w-[40%]">
        <div className="w-2/3 md:px-4">
          <span className="font-bold">Glassware</span>:{" "}
          <span className="font-light">{review.glassware}</span>
        </div>
        <div className="w-1/3 md:px-4">
          <span className="font-bold">Rest Time</span>:{" "}
          <span className="font-light">{review.restTime}</span>
        </div>
      </div>
      <div className="my-4 ml-4 flex w-[80%] flex-col">
        <h6 className="mt-8 mb-4 ml-1 text-left text-2xl font-bold text-blue-700">
          Setting
        </h6>
        <div className="text-md mt-2 flex min-w-[300px] max-w-[900px] flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          {review.setting}
        </div>
      </div>
    </>
  );
}
