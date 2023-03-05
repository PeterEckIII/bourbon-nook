import type { bottle } from "@prisma/client";

type BottleImageProps = {
  bottle: bottle;
};

export default function BottleImage({ bottle }: BottleImageProps) {
  return (
    <div className="flex justify-center">
      {bottle.imageUrl !== "" && typeof bottle.imageUrl === "string" && (
        <div className="w-[300px]">
          <div className="flex h-[450px] w-[300px] items-center">
            <img
              src={bottle.imageUrl}
              alt={`Bottle of ${bottle.name}`}
              className="h-full rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
