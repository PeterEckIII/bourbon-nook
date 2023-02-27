import type { TypedFetcherWithComponents } from "remix-typedjson";
import ImageUploader from "~/components/UI/ImageUploader/ImageUploader";
import Button from "~/components/UI/Button";
import type { ImageData } from "~/utils/types";

type ImageFormProps = {
  imageFetcher: TypedFetcherWithComponents<ImageData>;
  imageIsSubmitting: boolean;
};

export default function ImageForm({
  imageFetcher,
  imageIsSubmitting,
}: ImageFormProps) {
  return (
    <div
      id="image-container"
      className="m-4 w-full lg:block lg:h-full lg:w-1/3"
    >
      <imageFetcher.Form
        encType="multipart/form-data"
        method="post"
        action="/services/image"
        className="h-full"
      >
        <ImageUploader imageFetcher={imageFetcher} />
        <div className="-mx-2 flex w-full justify-end">
          <Button
            type="submit"
            callToAction={imageIsSubmitting ? "Uploading..." : "Upload Image"}
          />
        </div>
      </imageFetcher.Form>
    </div>
  );
}
