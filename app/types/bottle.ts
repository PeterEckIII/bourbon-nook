import type { BottleStatus, bottle } from "@prisma/client";

import type { GridItem } from "./models";

export interface GridBottle extends GridItem {
  kind: "bottle";
  id: string;
  status: BottleStatus;
  name: string;
  type: string;
  distiller: string | null;
  producer: string | null;
  country: string | null;
  region: string | null;
  price: string | null;
  age: string | null;
  year: string | null;
  batch: string | null;
  barrel: string | null;
  alcoholPercent: string | null;
  proof: string | null;
  size: string | null;
  color: string | null;
  finishing: string | null;
  imageUrl: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type TableBottle = Omit<
  bottle,
  | "kind"
  | "age"
  | "batch"
  | "barrel"
  | "proof"
  | "size"
  | "color"
  | "finishing"
  | "imageUrl"
  | "updatedAt"
  | "openDate"
  | "killDate"
  | "userId"
  | "createdAt"
> & { createdAt: string };

export type APIBottle = Omit<GridBottle, "kind">;
