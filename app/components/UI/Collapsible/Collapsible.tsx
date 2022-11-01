import type { ReactNode } from "react";
import useCollapse from "react-collapsed";
import ChevronDown from "~/components/Icons/ChevronDown";
import ChevronRight from "~/components/Icons/ChevronRight";

interface CollapsibleProps {
  children: ReactNode;
  label: string;
}

export default function Collapsible({ children, label }: CollapsibleProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <div className="collapsible my-4 rounded-md">
      <div className="header py-10" {...getToggleProps()}>
        {isExpanded ? (
          <div className="flex justify-between">
            <div className="ml-2">{label}</div>
            <div className="mr-2">
              <ChevronDown />
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="ml-2">{label}</div>
            <div className="mr-2">
              <ChevronRight />
            </div>
          </div>
        )}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
