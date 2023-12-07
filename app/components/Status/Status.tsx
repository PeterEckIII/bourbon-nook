import { BottleStatus } from "@prisma/client";

interface StatusProps {
  bottleStatus: BottleStatus;
}

export default function Status({ bottleStatus }: StatusProps) {
  return (
    <div>
      <label htmlFor="status">Bottle Status</label>
      <select
        name="status"
        id="status"
        className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
        defaultValue={bottleStatus}
      >
        <option value="CLOSED">Closed</option>
        <option value="OPENED">Opened</option>
        <option value="FINISHED">Finished</option>
      </select>
    </div>
  );
}
