import NoteInput from "~/components/UI/Inputs/NoteInput";
import NoteInputWithImage from "~/components/UI/Inputs/NoteInputWithImage";
import rye from "~/images/rye.png";
import wheat from "~/images/wheat.png";
import type { GrainNotesErrors, RedisFormData } from "~/utils/types";

interface GrainNoteProps {
  data: RedisFormData | null;
  errors: GrainNotesErrors | null;
}

export default function GrainNotes({ data, errors }: GrainNoteProps) {
  return (
    <>
      <h4>Grain Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="corn"
            defaultValue={data?.corn}
            error={errors?.corn}
            emoji="🌽"
            labelName="Corn"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            name="rye"
            labelName="Rye"
            defaultValue={data?.rye}
            error={errors?.rye}
            imageSource={rye}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            name="wheat"
            labelName="Wheat"
            defaultValue={data?.wheat}
            error={errors?.wheat}
            imageSource={wheat}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="malt"
            emoji="🍺"
            defaultValue={data?.malt}
            error={errors?.malt}
            labelName="Malt"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="dough"
            emoji="🥖"
            defaultValue={data?.dough}
            error={errors?.dough}
            labelName="Dough / Bread"
          />
        </div>
      </div>
    </>
  );
}
