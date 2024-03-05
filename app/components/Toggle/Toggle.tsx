import { Switch } from "@headlessui/react";

interface ToggleProps {
  enabled: boolean;
  setEnabled: (prev: boolean) => void;
  header: string;
}

export default function Toggle({ enabled, setEnabled, header }: ToggleProps) {
  return (
    <div className="flex">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-green-500" : "bg-gray-400"}
          relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
      >
        <span className="sr-only">
          {enabled ? `Hide ${header}` : `Show ${header}`}
        </span>
        <span
          className={`${
            enabled ? "translate-x-9" : "translate-x-0"
          } pointer-events-none inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <div className="self-center px-6">{header}</div>
    </div>
  );
}
