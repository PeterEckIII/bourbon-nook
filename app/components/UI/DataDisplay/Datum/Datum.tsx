import type { bottle } from "@prisma/client";
import type { ReactNode } from "react";
import type { ValueOf } from "~/utils/types";

type DatumProps = {
  field:
    | Capitalize<keyof bottle>
    | `ABV`
    | `Barrel/Batch`
    | `Kill Date`
    | `Open Date`;
  value:
    | ValueOf<bottle>
    | `$${ValueOf<bottle> | `${ValueOf<bottle>}%`}`
    | `---`;
  icon: ReactNode;
};

export default function Datum({ field, value, icon }: DatumProps) {
  return (
    <div className="flex overflow-hidden rounded-lg bg-gray-50 text-gray-800">
      <div className="flex items-center justify-center bg-blue-600 px-4 text-gray-100">
        {icon}
      </div>
      <div className="flex flex-1 items-center justify-between p-3">
        <p className="text-2xl font-semibold">{value}</p>
        <p>{field}</p>
      </div>
    </div>
  );
}
