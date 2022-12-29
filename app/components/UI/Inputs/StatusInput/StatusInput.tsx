import { useBeforeUnload } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import RadioInput from "../RadioInput";
import type { Status } from "~/routes/reviews/new";

type StatusInputProps = {
  loadedStatus: Status;
  state: any;
  setFormState: React.Dispatch<React.SetStateAction<any>> | undefined;
};

const StatusInput = ({
  loadedStatus,
  state,
  setFormState,
}: StatusInputProps) => {
  const [status, setStatus] = useState<Status>("CLOSED");

  if (!state || !setFormState) {
    throw Error();
  }

  useEffect(() => {
    setStatus(loadedStatus);
  }, [loadedStatus]);

  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem("status", status);
    }, [status])
  );

  const handleBlur = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      return window.localStorage.setItem(key, value);
    }
  };

  const handleCloseStatus = () => {
    setFormState({
      ...state,
      status: "CLOSED",
    });
    setStatus("CLOSED");
  };

  const handleOpenStatus = () => {
    setFormState({
      ...state,
      status: "OPENED",
    });
    setStatus("OPENED");
  };

  const handleFinishStatus = () => {
    setFormState({
      ...state,
      status: "FINISHED",
    });
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
            id="closed"
            onChange={handleCloseStatus}
            onBlur={() => handleBlur("status", "CLOSED")}
          />
        </li>
        <li className="bg-gray-300x relative mx-4 flex h-8">
          <RadioInput
            label="Opened"
            value={status === "OPENED"}
            id="opened"
            onChange={handleOpenStatus}
            onBlur={() => handleBlur("status", "OPENED")}
          />
        </li>
        <li className="bg-gray-300x relative flex h-8">
          <RadioInput
            label="Finished"
            value={status === "FINISHED"}
            id="finished"
            onChange={handleFinishStatus}
            onBlur={() => handleBlur("status", "FINISHED")}
          />
        </li>
      </ul>
    </div>
  );
};

export default StatusInput;
