import type { FormState } from "~/routes/reviews/new";
import NoteInput from "~/components/UI/Inputs/NoteInput/NoteInput";
import type { CustomFormData } from "~/utils/helpers.server";

interface ISweetNoteProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData;
}

export default function SweetNotes({
  state,
  changeHandler,
  formData,
}: ISweetNoteProps) {
  return (
    <>
      <h4>Sweet Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Vanilla"
            emoji="🍦"
            name="vanilla"
            value={state.vanilla}
            defaultValue={formData?.vanilla}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Caramel"
            emoji="🍮"
            name="caramel"
            value={state.caramel}
            defaultValue={formData?.caramel}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="molasses"
            labelName="Molasses"
            value={state.molasses}
            defaultValue={formData?.molasses}
            changeHandler={(e) => changeHandler(e)}
            emoji="🥞"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="butterscotch"
            labelName="Butterscotch"
            value={state.butterscotch}
            defaultValue={formData?.butterscotch}
            changeHandler={(e) => changeHandler(e)}
            emoji="🧈"
          />
        </div>

        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Honey"
            emoji="🍯"
            name="honey"
            value={state.honey}
            defaultValue={formData?.honey}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Chocolate"
            emoji="🍫"
            name="chocolate"
            value={state.chocolate}
            defaultValue={formData?.chocolate}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="toffee"
            labelName="Toffee"
            value={state.toffee}
            defaultValue={formData?.toffee}
            changeHandler={(e) => changeHandler(e)}
            emoji="🍬"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Powdered Sugar"
            emoji="🥄"
            name="sugar"
            value={state.sugar}
            defaultValue={formData?.sugar}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
      </div>
    </>
  );
}
