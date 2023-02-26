import type { BottleStatus } from "@prisma/client";
import type { HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import RadioInput from "../RadioInput";

interface StatusInputProps extends HTMLAttributes<HTMLSelectElement> {
  loadedStatus: BottleStatus;
  error?: string;
}

export default function StatusInput({ loadedStatus, error }: StatusInputProps) {
  const [status, setStatus] = useState<BottleStatus>("CLOSED");

  useEffect(() => {
    setStatus(loadedStatus);
  }, [loadedStatus]);

  const handleClosedStatus = () => {
    setStatus("CLOSED");
  };

  const handleOpenedStatus = () => {
    setStatus("OPENED");
  };

  const handleFinishedStatus = () => {
    setStatus("FINISHED");
  };

  return (
    <div className="flex flex-col py-4">
      <input type="hidden" name="status" value={status} />
      <ul className="relative my-4 inline-flex h-10 space-x-1 rounded-md bg-gray-300 p-1 font-semibold text-blue-600">
        <li className="bg-gray-300x relative flex h-8">
          <RadioInput
            label="Closed"
            value={status === "CLOSED"}
            field="closed"
            onChange={handleClosedStatus}
          />
        </li>
        <li className="bg-gray-300x relative flex h-8">
          <RadioInput
            label="Opened"
            value={status === "OPENED"}
            field="opened"
            onChange={handleOpenedStatus}
          />
        </li>
        <li className="bg-gray-300x relative flex h-8">
          <RadioInput
            label="Finished"
            value={status === "FINISHED"}
            field="finished"
            onChange={handleFinishedStatus}
          />
        </li>
      </ul>
    </div>
  );
}
