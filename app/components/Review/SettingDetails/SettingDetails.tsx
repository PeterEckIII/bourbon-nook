import type { review } from "@prisma/client";

type SettingDetailsProps = {
  review: review;
};

export default function SettingDetails({ review }: SettingDetailsProps) {
  return (
    <div className="md:w- ml-4 flex w-[75%] justify-evenly rounded-xl border-2 border-blue-400 p-4 text-lg font-semibold text-blue-700 md:justify-start">
      <div className="md:px-4">
        <span className="font-bold">Glassware</span>:{" "}
        <span className="font-light">{review.glassware}</span>
      </div>
      <div className="md:px-4">
        <span className="font-bold">Rest Time</span>:{" "}
        <span className="font-light">{review.restTime}</span>
      </div>
    </div>
  );
}
