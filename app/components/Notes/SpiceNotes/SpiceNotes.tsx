import cinnamon from "~/images/cinnamon.webp";
import pepper from "~/images/pepper.webp";
import anise from "~/images/anise.jpeg";
import mint from "~/images/mint.png";
import NoteInput from "~/components/UI/Inputs/NoteInput";
import NoteInputWithImage from "~/components/UI/Inputs/NoteInputWithImage";
import type { RedisFormData, SpiceNotesErrors } from "~/utils/types";

interface SpiceNoteProps {
  data: RedisFormData | null;
  errors: SpiceNotesErrors | null;
}

export default function SpiceNotes({ data, errors }: SpiceNoteProps) {
  return (
    <>
      <h4>Spice Notes</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            imageSource={pepper}
            name="pepper"
            labelName="Black Pepper"
            defaultValue={data?.pepper}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            imageSource={cinnamon}
            name="cinnamon"
            labelName="Cinnamon"
            defaultValue={data?.cinnamon}
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            imageSource={anise}
            name="bakingSpice"
            labelName="Baking Spice"
            defaultValue={data?.bakingSpice}
          />
        </div>

        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInput
            name="herbal"
            labelName="Herbal"
            defaultValue={data?.herbal}
            emoji="🌿"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2 lg:w-1/3">
          <NoteInputWithImage
            imageSource={mint}
            name="mint"
            labelName="Mint"
            defaultValue={data?.mint}
          />
        </div>
      </div>
    </>
  );
}
