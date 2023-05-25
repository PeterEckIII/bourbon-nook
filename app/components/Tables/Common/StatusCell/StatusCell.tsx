import type { BottleStatus } from "@prisma/client";

type StatusCellProps = {
  status: BottleStatus;
};

export default function StatusCell({ status }: StatusCellProps) {
  return (
    <td className="mx-4 min-w-[125px] whitespace-nowrap py-1 pl-2 pr-2 text-center group-hover:text-gray-700">
      <div
        className={
          status === "OPENED"
            ? "mx-2 min-w-[125px] rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-center text-green-700 "
            : status === "CLOSED"
            ? "mx-2 min-w-[125px] rounded-lg bg-yellow-500 bg-opacity-60 p-2 px-2 py-1 text-center text-yellow-700 "
            : status === "FINISHED"
            ? "mx-2 min-w-[125px] rounded-lg bg-gray-300 bg-opacity-60 p-2 px-2 py-1 text-center text-gray-700 "
            : "mx-2 min-w-[125px] rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-center text-green-700 "
        }
      >
        {status}
      </div>
    </td>
  );
}
