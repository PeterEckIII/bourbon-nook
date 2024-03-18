import { Dispatch, SetStateAction, useState } from "react";

export interface TabOption {
  id: string;
  label: string;
}

interface TabProps {
  tabOptions: TabOption[];
  chosenTab: TabOption;
  setTabOption: Dispatch<SetStateAction<TabOption>>;
}

export default function Tabs({ tabOptions }: TabProps) {
  const [activeTab, setActiveTab] = useState<TabOption["label"]>(
    tabOptions[0].label,
  );

  const handleTabChange = (newActiveTab: TabOption) => {
    setActiveTab(newActiveTab.label);
  };

  return (
    <div className="flex justify-start border-b border-gray-300">
      <div className="flex">
        {tabOptions.map((option) => (
          <button
            key={option.id}
            className={`${
              activeTab === option.label
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-400"
            } flex-1 font-medium px-6 py-2 transition-all duration-100 ease-in motion-reduce:transition-none`}
            onClick={() => handleTabChange(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
