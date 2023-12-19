interface ReviewImageProps {
  bottleName: string;
  imageUrl: string | undefined;
}

export default function ReviewImage({
  bottleName,
  imageUrl,
}: ReviewImageProps) {
  return (
    <div className="w-1/2">
      <img
        src={imageUrl}
        alt={`Bottle of ${bottleName}`}
        className="w-[850px] h-[850px]"
      />
    </div>
  );
}
