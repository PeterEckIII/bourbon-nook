import * as React from "react";
import type { FormState } from "~/routes/reviews/new";

import NoteInput from "~/components/UI/Inputs/NoteInput/NoteInput";
import NoteInputCustom from "~/components/UI/Inputs/NoteInputCustom/NoteInputCustom";

import leather from "~/images/leather.webp";
import almond from "~/images/almond.png";
import pecan from "~/images/pecan.png";
import walnut from "~/images/walnut.webp";
import type { CustomFormData } from "~/utils/helpers.server";

interface IEarthNoteProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData;
}

export default function EarthNotes({
  state,
  changeHandler,
  formData,
}: IEarthNoteProps) {
  return (
    <>
      <h4>Earth Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Coffee"
            emoji="☕"
            name="coffee"
            value={state.coffee}
            defaultValue={formData?.coffee}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Tobacco Leaf"
            emoji="🍁"
            name="tobacco"
            value={state.tobacco}
            defaultValue={formData?.tobacco}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            name="leather"
            labelName="Leather"
            value={state.leather}
            defaultValue={formData?.leather}
            changeHandler={(e) => changeHandler(e)}
            noteSource={leather}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Oak"
            emoji="🪵"
            name="oak"
            value={state.oak}
            defaultValue={formData?.oak}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Toasted"
            emoji="🍞"
            name="toasted"
            value={state.toasted}
            defaultValue={formData?.toasted}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Smokey"
            emoji="💨"
            name="smokey"
            value={state.smokey}
            defaultValue={formData?.smokey}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Peanut"
            emoji="🥜"
            name="peanut"
            value={state.peanut}
            defaultValue={formData?.peanut}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            labelName="Almond"
            noteSource={almond}
            name="almond"
            value={state.almond}
            defaultValue={formData?.almond}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            labelName="Pecan"
            noteSource={pecan}
            name="pecan"
            value={state.pecan}
            defaultValue={formData?.pecan}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputCustom
            labelName="Walnut"
            noteSource={walnut}
            name="walnut"
            value={state.walnut}
            defaultValue={formData?.walnut}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Oily"
            emoji="🛢️"
            name="oily"
            value={state.oily}
            defaultValue={formData?.oily}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Floral"
            emoji="🌹"
            name="floral"
            value={state.floral}
            defaultValue={formData?.floral}
            changeHandler={(e) => changeHandler(e)}
          />
        </div>
      </div>
    </>
  );
}
