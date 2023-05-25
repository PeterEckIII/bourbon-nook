import type { ChangeEvent } from "react";
import Download from "../../Icons/Download";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { ImageActionData } from "~/routes/services/image";
import CheckIcon from "../../Icons/CheckIcon";
import Spinner from "../../Icons/Spinner";
import type { ImageUpdateData } from "~/routes/services/updateImage";

type ImageUploaderProps = {
  imageFetcher: TypedFetcherWithComponents<ImageActionData | ImageUpdateData>;
  handlePreviewChange: (e: ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string;
};

export default function ImageUploader({
  imageFetcher,
  previewUrl,
  handlePreviewChange,
}: ImageUploaderProps) {
  return (
    <div className="m-2 mb-2 ml-0 mr-0 mt-0 rounded-lg bg-white p-2">
      <span className="text-lg">Image of Bottle</span>
      <div className="clear-both mx-auto my-0 block w-full max-w-[600px]">
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="img"
            className="float-left clear-both mx-2 my-4 w-full cursor-pointer select-none rounded-lg border-[3px] border-gray-300 bg-white px-6 py-8 text-center transition-all duration-200 ease-linear hover:border-blue-500"
          >
            <input
              type="file"
              name="img"
              accept="image/*"
              className="hidden"
              id="img"
              onChange={(e) => handlePreviewChange(e)}
            />
            <div className="">
              {previewUrl !== "" && imageFetcher.type === "init" ? (
                <div className="">
                  <img
                    src={previewUrl}
                    alt={`The bottle you uploaded]`}
                    className="mx-auto my-0 h-[450px] w-[275px] object-cover lg:h-[600px] lg:w-[400px]"
                  />
                </div>
              ) : imageFetcher.type === "actionSubmission" ? (
                <div>
                  <Spinner />
                </div>
              ) : imageFetcher.type === "done" ? (
                <div
                  id="uploadConfirmation"
                  className="border-black-100 m-4 flex items-center justify-center rounded-md p-4 text-green-700"
                >
                  <CheckIcon />
                  <span>&nbsp;</span>Successfully uploaded!
                </div>
              ) : (
                <div className="clear-both mb-2 ml-0 mr-0 mt-0 w-full">
                  <Download classes="h-10 w-10 my-4 mx-auto" />
                  <div className="float-left clear-both block w-full">
                    Select an image from your device
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
