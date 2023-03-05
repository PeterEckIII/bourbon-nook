import type { bottle } from "@prisma/client";

type BottleDetailProps = {
  detailTitle: string;
  bottle: bottle;
  fields: string[];
  values: string[];
};

export default function BottleDetail({
  bottle,
  detailTitle,
  fields,
  values,
}: BottleDetailProps) {
  return (
    <div className="border-6 m-2 flex w-full flex-col items-center rounded-lg border-blue-900 p-2 md:w-1/3">
      <h6 className="mb-2 mr-2 text-center text-2xl font-bold text-blue-700 underline">
        {detailTitle}
      </h6>
      <div className="flex justify-center">
        <div className="flex w-auto flex-col items-end px-2 text-center">
          {fields.map((field) => (
            <div className="text-center font-semibold text-black" key={field}>
              {field}
            </div>
          ))}
        </div>
        <div className="flex w-auto flex-col items-start px-2">
          {values.map((val) => (
            <div className="font-light italic text-black" key={val}>
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
