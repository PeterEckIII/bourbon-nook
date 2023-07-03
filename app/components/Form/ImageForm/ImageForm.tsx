import type { TypedFetcherWithComponents } from "remix-typedjson";
import ImageUploader from "~/components/UI/ImageUploader/ImageUploader";
import Button from "~/components/UI/Button";
import type { ImageData } from "~/utils/types";
import { useState } from "react";
import type { ChangeEvent } from "react";

type ImageFormProps = {
  imageFetcher: TypedFetcherWithComponents<ImageData>;
  imageIsSubmitting: boolean;
};

export default function ImageForm({
  imageFetcher,
  imageIsSubmitting,
}: ImageFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handlePreviewChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files)
      throw new Error(`Error reading files from import`);
    if (e.currentTarget.files && e.currentTarget.files[0] !== undefined) {
      console.log(`Handling preview image`);
      const newUrl = URL.createObjectURL(e.currentTarget.files[0]);
      setPreviewUrl(newUrl);
    } else {
      console.log(`Cannot handle preview image`);
      setPreviewUrl("");
    }
  };

  const handleClearSelection = () => {
    setPreviewUrl("");
  };

  return (
    <div id="image-container" className="w-full lg:block lg:h-full">
      <imageFetcher.Form
        encType="multipart/form-data"
        method="post"
        action="/services/image"
        className="h-full"
      >
        <ImageUploader
          imageFetcher={imageFetcher}
          previewUrl={previewUrl}
          handlePreviewChange={handlePreviewChange}
        />
        <div className="flex w-full justify-end">
          <div className="my-2 text-right">
            <button
              type="button"
              onClick={handleClearSelection}
              className="focus:shadow-outline mr-2 h-10 rounded-lg border border-blue-600 px-5 text-blue-700 transition-colors duration-150 hover:bg-blue-500 hover:text-blue-100"
              disabled={previewUrl === ""}
              aria-disabled={previewUrl === ""}
            >
              Clear Image
            </button>
          </div>
          <Button
            type="submit"
            callToAction={imageIsSubmitting ? "Uploading..." : "Upload Image"}
          />
        </div>
      </imageFetcher.Form>
    </div>
  );
}
