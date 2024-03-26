import { Fieldset, conform } from "@conform-to/react";

import Spinner from "~/components/Icons/Spinner";
import Input from "~/components/Input/Input";
import Textarea from "~/components/Textarea/Textarea";

type Inputs = Fieldset<{
  date: string;
  setting: string;
  glassware: string;
  restTime: string;
  nose: string;
  palate: string;
  finish: string;
  thoughts: string;
}>;

interface SettingFormProps {
  inputs: Inputs;
  navigationState: "idle" | "submitting" | "loading";
  isSubmitting: boolean;
}

export default function SettingForm({
  inputs,
  navigationState,
  isSubmitting,
}: SettingFormProps) {
  return (
    <>
      <div className="my-3 flex w-full flex-wrap p-2 sm:p-7">
        <Input
          type="text"
          label="Date"
          {...conform.input(inputs.date)}
          placeholder="Today's date"
          error={inputs.date.error}
          navigationState={navigationState}
        />
        <Input
          type="text"
          label="Setting"
          {...conform.input(inputs.setting)}
          placeholder="What's going on?"
          error={inputs.setting.error}
          navigationState={navigationState}
        />
        <Input
          type="text"
          label="Glassware"
          {...conform.input(inputs.glassware)}
          placeholder="What are you drinking from?"
          error={inputs.glassware.error}
          navigationState={navigationState}
        />
        <Input
          type="text"
          label="Rest Time"
          {...conform.input(inputs.restTime)}
          placeholder="How long did it rest?"
          error={inputs.restTime.error}
          navigationState={navigationState}
        />
        <Textarea
          label="Nose"
          {...conform.input(inputs.nose)}
          error={inputs.nose.error}
          navigationState={navigationState}
        />
        <Textarea
          label="Palate"
          {...conform.input(inputs.palate)}
          error={inputs.palate.error}
          navigationState={navigationState}
        />
        <Textarea
          label="Finish"
          {...conform.input(inputs.finish)}
          error={inputs.finish.error}
          navigationState={navigationState}
        />
        <Textarea
          label="Final thoughts"
          {...conform.input(inputs.thoughts)}
          error={inputs.thoughts.error}
          navigationState={navigationState}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 my-4 w-96"
        type="submit"
      >
        {isSubmitting ? (
          <div className="flex justify-center">
            <div>
              <Spinner />
            </div>
            <div>Navigating...</div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div>Next</div>
          </div>
        )}
      </button>
    </>
  );
}
