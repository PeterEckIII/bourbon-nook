import rye from "~/images/rye.png";
import wheat from "~/images/wheat.png";
import type { FormState } from "~/routes/reviews/new";
import NoteInput from "~/components/UI/Inputs/NoteInput/NoteInput";
import NoteInputCustom from "~/components/UI/Inputs/NoteInputCustom/NoteInputCustom";
import type { CustomFormData } from "~/utils/helpers.server";

interface IGrainNoteProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData;
}

export default function GrainNotes({
  state,
  changeHandler,
  formData,
}: IGrainNoteProps) {
  return (
    <>
      <h4>Grain Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="corn"
            value={state.corn}
            defaultValue={formData?.corn}
            emoji="🌽"
            labelName="Corn"
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            name="rye"
            labelName="Rye"
            value={state.rye}
            defaultValue={formData?.rye}
            changeHandler={(e) => changeHandler(e)}
            noteSource={rye}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            name="wheat"
            labelName="Wheat"
            value={state.wheat}
            defaultValue={formData?.wheat}
            changeHandler={(e) => changeHandler(e)}
            noteSource={wheat}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="malt"
            emoji="🍺"
            value={state.malt}
            defaultValue={formData?.malt}
            labelName="Malt"
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="dough"
            emoji="🥖"
            value={state.dough}
            defaultValue={formData?.dough}
            labelName="Dough / Bread"
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
      </div>
    </>
  );
}
