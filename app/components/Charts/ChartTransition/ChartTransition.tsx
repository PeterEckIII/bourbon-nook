import { Transition } from "@headlessui/react";
import type { ReactNode } from "react";

type ChartTransitionProps = {
  show: boolean;
  moving: "right" | "left";
  children: ReactNode;
};

export default function ChartTransition({
  show,
  moving,
  children,
}: ChartTransitionProps) {
  return (
    <Transition
      appear={false}
      unmount={false}
      show={show}
      enter="transform transition ease-in-out duration-500"
      enterFrom={
        moving === "right"
          ? `translate-x-96 opacity-0`
          : `-translate-x-96 opacity-0`
      }
      enterTo={`translate-x-0 opacity-100`}
      leave={`transform transition ease-in-out duration-500`}
      leaveFrom={`translate-x-0 opacity-100`}
      leaveTo={
        moving === "right"
          ? `-translate-x-96 opacity-0`
          : `translate-x-96 opacity-0`
      }
      className="w-0 overflow-visible bg-red-200"
    >
      {children}
    </Transition>
  );
}
