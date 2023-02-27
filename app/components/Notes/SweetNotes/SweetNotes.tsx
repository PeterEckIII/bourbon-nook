import NoteInput from "~/components/UI/Inputs/NoteInput";
import type { SweetNotesErrors, RedisFormData } from "~/utils/types";

interface SweetNoteProps {
  data: RedisFormData | null;
  errors: SweetNotesErrors | null;
}

export default function SweetNotes({ data, errors }: SweetNoteProps) {
  return (
    <>
      <h4>Sweet Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Vanilla"
            emoji="🍦"
            name="vanilla"
            defaultValue={data?.vanilla}
            error={errors?.vanilla}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Caramel"
            emoji="🍮"
            name="caramel"
            defaultValue={data?.caramel}
            error={errors?.caramel}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="molasses"
            labelName="Molasses"
            defaultValue={data?.molasses}
            error={errors?.molasses}
            emoji="🥞"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="butterscotch"
            labelName="Butterscotch"
            defaultValue={data?.butterscotch}
            error={errors?.butterscotch}
            emoji="🧈"
          />
        </div>

        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Honey"
            emoji="🍯"
            name="honey"
            defaultValue={data?.honey}
            error={errors?.honey}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Chocolate"
            emoji="🍫"
            name="chocolate"
            defaultValue={data?.chocolate}
            error={errors?.chocolate}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="toffee"
            labelName="Toffee"
            defaultValue={data?.toffee}
            error={errors?.toffee}
            emoji="🍬"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Powdered Sugar"
            emoji="🥄"
            name="sugar"
            defaultValue={data?.sugar}
            error={errors?.sugar}
          />
        </div>
      </div>
    </>
  );
}
