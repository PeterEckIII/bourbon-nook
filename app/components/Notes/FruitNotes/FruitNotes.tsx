import raspberry from "~/images/raspberry.webp";
import blackberry from "~/images/blackberry.webp";
import NoteInput from "~/components/UI/Inputs/NoteInput";
import NoteInputWithImage from "~/components/UI/Inputs/NoteInputWithImage";
import type { FruitNotesErrors, RedisFormData } from "~/utils/types";

interface FruitNoteProps {
  data: RedisFormData | null;
  errors: FruitNotesErrors | null;
}

export default function FruitNotes({ data, errors }: FruitNoteProps) {
  return (
    <>
      <h4>Fruit Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Cherry"
            emoji="🍒"
            name="cherry"
            defaultValue={data?.cherry}
            error={errors?.cherry}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Strawberry"
            emoji="🍓"
            name="strawberry"
            defaultValue={data?.strawberry}
            error={errors?.strawberry}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            name="raspberry"
            labelName="Raspberry"
            defaultValue={data?.raspberry}
            error={errors?.raspberry}
            imageSource={raspberry}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            name="blackberry"
            labelName="Blackberry"
            defaultValue={data?.blackberry}
            error={errors?.blackberry}
            imageSource={blackberry}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Blueberry"
            emoji="🫐"
            name="blueberry"
            defaultValue={data?.blueberry}
            error={errors?.blueberry}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Apple"
            emoji="🍎"
            name="apple"
            defaultValue={data?.apple}
            error={errors?.apple}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Banana"
            emoji="🍌"
            name="banana"
            defaultValue={data?.banana}
            error={errors?.banana}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Grape"
            emoji="🍇"
            name="grape"
            defaultValue={data?.grape}
            error={errors?.grape}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Stone Fruit"
            emoji="🍑"
            name="stone"
            defaultValue={data?.stone}
            error={errors?.stone}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Citrus"
            emoji="🍋"
            name="citrus"
            defaultValue={data?.citrus}
            error={errors?.citrus}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Tropical"
            emoji="🍍"
            name="tropical"
            defaultValue={data?.tropical}
            error={errors?.tropical}
          />
        </div>
      </div>
    </>
  );
}
