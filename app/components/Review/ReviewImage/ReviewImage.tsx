interface ReviewImageProps {
  imageUrl: string;
  bottleName: string;
}

export default function ReviewImage({
  imageUrl,
  bottleName,
}: ReviewImageProps) {
  return (
    <div className="flex justify-center">
      <img
        src={imageUrl}
        alt={`Bottle of ${bottleName}`}
        className="object-contain"
      />
      {/* Consider adding object-fit: cover to image to maintain aspect ratio */}
    </div>
  );
}
