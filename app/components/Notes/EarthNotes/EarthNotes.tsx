import NoteInput from "~/components/UI/Inputs/NoteInput";
import NoteInputWithImage from "~/components/UI/Inputs/NoteInputWithImage";

import leather from "~/images/leather.webp";
import almond from "~/images/almond.png";
import pecan from "~/images/pecan.png";
import walnut from "~/images/walnut.webp";
import type { EarthNoteErrors, RedisFormData } from "~/utils/types";

interface IEarthNoteProps {
  data: RedisFormData | null;
  errors: EarthNoteErrors | null;
}

export default function EarthNotes({ data, errors }: IEarthNoteProps) {
  return (
    <>
      <h4>Earth Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Coffee"
            emoji="☕"
            name="coffee"
            defaultValue={data?.coffee}
            error={errors?.coffee}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Tobacco Leaf"
            emoji="🍁"
            name="tobacco"
            defaultValue={data?.tobacco}
            error={errors?.tobacco}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            name="leather"
            labelName="Leather"
            defaultValue={data?.leather}
            error={errors?.leather}
            imageSource={leather}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Oak"
            emoji="🪵"
            name="oak"
            defaultValue={data?.oak}
            error={errors?.oak}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Toasted"
            emoji="🍞"
            name="toasted"
            defaultValue={data?.toasted}
            error={errors?.toasted}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Smokey"
            emoji="💨"
            name="smokey"
            defaultValue={data?.smokey}
            error={errors?.smokey}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Peanut"
            emoji="🥜"
            name="peanut"
            defaultValue={data?.peanut}
            error={errors?.peanut}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            labelName="Almond"
            imageSource={almond}
            name="almond"
            defaultValue={data?.almond}
            error={errors?.almond}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            labelName="Pecan"
            imageSource={pecan}
            name="pecan"
            defaultValue={data?.pecan}
            error={errors?.pecan}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            labelName="Walnut"
            imageSource={walnut}
            name="walnut"
            defaultValue={data?.walnut}
            error={errors?.walnut}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Oily"
            emoji="🛢️"
            name="oily"
            defaultValue={data?.oily}
            error={errors?.oily}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            labelName="Floral"
            emoji="🌹"
            name="floral"
            defaultValue={data?.floral}
            error={errors?.floral}
          />
        </div>
      </div>
    </>
  );
}
