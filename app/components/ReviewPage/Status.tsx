import { BottleStatus } from "@prisma/client";

interface StatusProps {
  status: BottleStatus;
}

export default function Status({ status }: StatusProps) {
  return (
    <div
      className={
        status === "OPENED"
          ? "bg-green-500 text-green-800 px-4 py-2 rounded-lg"
          : status === "CLOSED"
          ? "bg-yellow-500 text-yellow-800 px-4 py-2 rounded-lg"
          : status === "FINISHED"
          ? "bg-red-500 text-red-800 px-4 py-2 rounded-lg"
          : ""
      }
    >
      {status}
    </div>
  );
}
