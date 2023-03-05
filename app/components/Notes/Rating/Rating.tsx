import type { RedisFormData, RatingErrors } from "~/utils/types";
import NoteInput from "~/components/UI/Inputs/NoteInput";

interface IRatingProps {
  data: RedisFormData | null;
  errors: RatingErrors | null;
}

export default function Rating({ data, errors }: IRatingProps) {
  return (
    <>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <h4>Rating</h4>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2">
          <NoteInput
            labelName="Value for Money"
            name="value"
            defaultValue={data?.value}
            error={errors?.value}
            emoji="💰"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2">
          <NoteInput
            labelName="Overall Rating"
            name="overallRating"
            defaultValue={data?.overallRating}
            error={errors?.overallRating}
            emoji="💯"
          />
        </div>
      </div>
    </>
  );
}
