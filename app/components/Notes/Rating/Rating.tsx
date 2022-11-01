import NoteInput from "~/components/UI/Inputs/NoteInput/NoteInput";
import type { FormState } from "~/routes/reviews/new";
import type { CustomFormData } from "~/utils/helpers.server";

interface IRatingProps {
  state: FormState;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: CustomFormData;
}

export default function Rating({
  state,
  changeHandler,
  formData,
}: IRatingProps) {
  return (
    <>
      <h4>Rating</h4>
      <div className="-mx-3 my-3 mb-6 flex flex-wrap rounded-xl border border-gray-200 bg-white bg-gradient-to-r p-2 sm:p-6">
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2">
          <NoteInput
            labelName="Value for Money"
            name="value"
            value={state.value}
            defaultValue={formData?.value}
            changeHandler={(e) => changeHandler(e)}
            emoji="💰"
          />
        </div>
        <div className="mb-2 w-full px-3 md:mb-0 md:w-1/2">
          <NoteInput
            labelName="Overall Rating"
            name="overallRating"
            value={state.overallRating}
            defaultValue={formData?.overallRating}
            changeHandler={(e) => changeHandler(e)}
            emoji="💯"
          />
        </div>
      </div>
    </>
  );
}
