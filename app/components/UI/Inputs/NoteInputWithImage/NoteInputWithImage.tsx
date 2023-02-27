import type { InputHTMLAttributes } from "react";
import ValidationMessage from "../../ValidationMessage";

interface NoteInputWithImageProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
  imageSource: string;
  error?: string;
}

export default function NoteInputWithImage({
  name,
  labelName,
  imageSource,
  error,
}: NoteInputWithImageProps) {
  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="my-2 inline w-full gap-1">
        {labelName} &nbsp;
        <img
          src={imageSource}
          alt={`${name} emoji`}
          height={20}
          width={20}
          className="inline"
        />{" "}
      </label>
      <div className="flex">
        <input
          name={name}
          aria-label={`${labelName}`}
          id={name}
          type={"number"}
          className={
            "block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          }
        />
      </div>
      {error && <ValidationMessage error={error} isSubmitting={false} />}
    </div>
  );
}
