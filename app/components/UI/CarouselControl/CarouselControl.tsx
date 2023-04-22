type CarouselControlProps = {
  steps: {
    name: string;
    href: string;
    status: "current" | "upcoming" | "complete";
  }[];
  currentStep: number;
  nextStep: () => any;
  prevStep: () => any;
};

export default function CarouselControl({
  steps,
  currentStep,
  prevStep,
  nextStep,
}: CarouselControlProps) {
  return (
    <div className={`mt-2`}>
      <p className="mb-1 mt-3 text-center text-sm font-medium">
        Chart {steps.findIndex((step) => step.status === "current") + 1} of{" "}
        {steps.length}
      </p>
      <nav className="flex items-center justify-center" aria-label="Progress">
        <button
          type="button"
          className="rounded-lg border border-blue-500 bg-white px-4 text-blue-500 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
          disabled={currentStep === 0}
          aria-disabled={currentStep === 0}
          onClick={() => prevStep()}
        >
          Prev
        </button>
        <ol className="mx-8 flex items-center space-x-5">
          {steps.map((step, i) => (
            <li key={`step_${i}`}>
              {step.status === "complete" ? (
                <a
                  href={step.href}
                  className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"
                >
                  <span className="sr-only"></span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  className="relative flex items-center justify-center"
                  aria-current="step"
                >
                  <span
                    className="absolute flex h-5 w-5 p-px"
                    aria-hidden="true"
                  >
                    <span className="h-full w-full rounded-full bg-indigo-200" />
                  </span>
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only"></span>
                </a>
              ) : (
                <a
                  href={step.href}
                  className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
                >
                  <span className="sr-only"></span>
                </a>
              )}
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="rounded-lg border border-blue-500 bg-white px-4 text-blue-500 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
          disabled={currentStep === 5}
          aria-disabled={currentStep === 5}
          onClick={() => nextStep()}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
