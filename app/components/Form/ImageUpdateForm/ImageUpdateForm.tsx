import type { ChangeEvent } from "react";
import { useState } from "react";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import Button from "~/components/UI/Button";
import ImageUploader from "~/components/UI/ImageUploader";
import type { ImageUpdateData } from "~/routes/services/updateImage";

type ImageUpdateFormProps = {
  fetcher: TypedFetcherWithComponents<ImageUpdateData>;
  isSubmitting: boolean;
  bottleId: string;
  redirectUrl: string;
};

export default function ImageUpdateForm({
  fetcher,
  isSubmitting,
  bottleId,
  redirectUrl,
}: ImageUpdateFormProps) {
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
    <div className="w-full lg:block lg:h-full lg:w-1/3">
      <fetcher.Form
        action={`/services/updateImage?bid=${bottleId}&redirectUrl=${redirectUrl}`}
        method="post"
        encType="multipart/form-data"
        className="h-full"
      >
        <ImageUploader
          imageFetcher={fetcher}
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
            callToAction={isSubmitting ? "Uploading..." : "Upload Image"}
          />
        </div>
      </fetcher.Form>
    </div>
  );
}
