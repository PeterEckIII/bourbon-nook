import { classNames } from "~/utils/cssHelper";

export default function RatingRenderer(params: any) {
  return (
    <span
      className={classNames(
        "leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm",
        params.value >= 4.0 ? "bg-green-100 text-green-700" : "",
        params.value < 4.0 && params.value >= 2.5
          ? "bg-yellow-100 text-yellow-700"
          : "null",
        params.value < 3 ? "bg-red-100 text-red-700" : "null"
      )}
    >
      {params.value}
    </span>
  );
}
