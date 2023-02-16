import type { TypedFetcherWithComponents } from "remix-typedjson";
import Button from "~/components/UI/Button";
import type { ImageActionData } from "~/routes/services/image";
import ImageUploader from "../ImageUploader";

type ImageFormProps = {
  imageFetcher: TypedFetcherWithComponents<ImageActionData>;
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
        <Button
          type="submit"
          callToAction={imageIsSubmitting ? "Uploading..." : "Upload Image"}
        />
      </imageFetcher.Form>
    </div>
  );
}
