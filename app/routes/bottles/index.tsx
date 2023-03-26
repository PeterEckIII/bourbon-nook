import type { bottle, review } from "@prisma/client";
import BottleGrid from "~/components/Grids/BottleGrid";

export interface LoaderData {
  collection: (bottle & { reviews: review[] })[];
  userId: string;
}

export default function BottleIndexPage() {
  return (
    <div className="w-full bg-white">
      <BottleGrid />
    </div>
  );
}
