import { Transition } from "@headlessui/react";
import type { review } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import ChartTransition from "~/components/Charts/ChartTransition/ChartTransition";
import EarthNotesChart from "~/components/Charts/EarthNotesChart/EarthNotesChart";
import FruitNotesChart from "~/components/Charts/FruitNotesChart";
import GrainNotesChart from "~/components/Charts/GrainNotesChart/GrainNotesChart";
import OverallNotesChart from "~/components/Charts/OveralNotesChart";
import SpiceNotesChart from "~/components/Charts/SpiceNotesChart/SpiceNotesChart";
import SweetNotesChart from "~/components/Charts/SweetNotesChart/SweetNotesChart";
import CarouselControl from "../CarouselControl/CarouselControl";

type CarouselProps = {
  review: review;
};

export default function Carousel({ review }: CarouselProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [moving, setMoving] = useState<"right" | "left">("right");

  const [steps, setSteps] = useState<
    {
      name: string;
      href: string;
      status: "current" | "upcoming" | "complete";
    }[]
  >([
    { name: "Step 1", href: "#", status: "current" },
    { name: "Step 2", href: "#", status: "upcoming" },
    { name: "Step 3", href: "#", status: "upcoming" },
    { name: "Step 4", href: "#", status: "upcoming" },
    { name: "Step 5", href: "#", status: "upcoming" },
    { name: "Step 6", href: "#", status: "upcoming" },
  ]);

  const prevStep = () => {
    setMoving("left");
    setSteps((old) =>
      old.map((v, i) => {
        if (i === currentStep) {
          v.status = "upcoming";
        } else if (i === currentStep - 1) {
          v.status = "current";
        }
        return v;
      })
    );
    setCurrentStep(currentStep - 1);
    return false;
  };

  const nextStep = async () => {
    setMoving("right");

    if (true) {
      setSteps((old) =>
        old.map((v, i) => {
          if (i === currentStep) {
            v.status = "complete";
          } else if (i === currentStep + 1) {
            v.status = "current";
          }
          return v;
        })
      );
      setCurrentStep(currentStep + 1);
    }
    return false;
  };

  const wrapper = useRef<HTMLDivElement | null>(null);
  const [wrapperWidth, setWrapperWidth] = useState<number>(1);

  useEffect(() => {
    function handleResize() {
      if (wrapper.current !== null) {
        setWrapperWidth(wrapper.current.offsetWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col px-4 py-4 sm:px-6">
        <div
          className="flex max-w-[500px] items-start overflow-hidden sm:w-full"
          ref={wrapper}
        >
          <div className="flex w-[900px] flex-nowrap">
            <ChartTransition show={currentStep === 0} moving={moving}>
              <div style={{ width: `${wrapperWidth}px` }}>
                <EarthNotesChart review={review} />
              </div>
            </ChartTransition>
            <ChartTransition show={currentStep === 1} moving={moving}>
              <div style={{ width: `${wrapperWidth}px` }}>
                <FruitNotesChart review={review} />
              </div>
            </ChartTransition>
            <ChartTransition show={currentStep === 2} moving={moving}>
              <div style={{ width: `${wrapperWidth}px` }}>
                <SweetNotesChart review={review} />
              </div>
            </ChartTransition>
            <ChartTransition show={currentStep === 3} moving={moving}>
              <div style={{ width: `${wrapperWidth}px` }}>
                <SpiceNotesChart review={review} />
              </div>
            </ChartTransition>
            <ChartTransition show={currentStep === 4} moving={moving}>
              <div style={{ width: `${wrapperWidth}px` }}>
                <GrainNotesChart review={review} />
              </div>
            </ChartTransition>
            <ChartTransition show={currentStep === 5} moving={moving}>
              <div style={{ width: `${wrapperWidth}px` }}>
                <OverallNotesChart review={review} />
              </div>
            </ChartTransition>
          </div>
        </div>
      </div>
      <CarouselControl
        steps={steps}
        currentStep={currentStep}
        nextStep={nextStep}
        prevStep={prevStep}
      />
    </div>
  );
}
