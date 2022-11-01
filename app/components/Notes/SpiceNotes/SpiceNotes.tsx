import cinnamon from "~/images/cinnamon.webp";
import pepper from "~/images/pepper.webp";
import anise from "~/images/anise.jpeg";
import mint from "~/images/mint.png";
import type { FormState } from "~/routes/reviews/new";
import NoteInput from "~/components/UI/Inputs/NoteInput/NoteInput";
import NoteInputCustom from "~/components/UI/Inputs/NoteInputCustom/NoteInputCustom";
import React from "react";
import type { CustomFormData } from "~/utils/helpers.server";

interface ISpiceNoteProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData;
}

export default function SpiceNotes({
  state,
  changeHandler,
  formData,
}: ISpiceNoteProps) {
  return (
    <>
      <h4>Spice Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            noteSource={pepper}
            name="pepper"
            labelName="Black Pepper"
            value={state.pepper}
            defaultValue={formData?.pepper}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            noteSource={cinnamon}
            name="cinnamon"
            labelName="Cinnamon"
            value={state.cinnamon}
            defaultValue={formData?.cinnamon}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            noteSource={anise}
            name="bakingSpice"
            labelName="Baking Spice"
            value={state.bakingSpice}
            defaultValue={formData?.bakingSpice}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>

        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="herbal"
            labelName="Herbal"
            value={state.herbal}
            defaultValue={formData?.herbal}
            changeHandler={(e) => changeHandler(e)}
            emoji="🌿"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            noteSource={mint}
            name="mint"
            labelName="Mint"
            value={state.mint}
            defaultValue={formData?.mint}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
      </div>
    </>
  );
}
