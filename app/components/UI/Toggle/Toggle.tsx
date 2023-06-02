import { Switch } from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";

type ToggleProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
};

export default function Toggle({ enabled, setEnabled }: ToggleProps) {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">Hide Finished Bottles</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2  focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? "translate-x-6 bg-white" : "translate-x-1 bg-blue-500"
            } inline-block h-4 w-4 transform rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
