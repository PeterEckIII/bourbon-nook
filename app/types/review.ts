import { review } from "@prisma/client";

import { TableBottle } from "./bottle";
import { GridItem } from "./models";

export interface GridReview extends GridItem {
  kind: "review";
  id: string;
  date: string | null;
  setting: string | null;
  glassware: string | null;
  restTime: string | null;
  nose: string | null;
  palate: string | null;
  finish: string | null;
  thoughts: string | null;

  pepper: string | null;
  bakingSpice: string | null;
  cinnamon: string | null;
  herbal: string | null;
  mint: string | null;

  cherry: string | null;
  strawberry: string | null;
  raspberry: string | null;
  blackberry: string | null;
  blueberry: string | null;
  apple: string | null;
  banana: string | null;
  grape: string | null;
  stone: string | null;
  citrus: string | null;
  tropical: string | null;

  coffee: string | null;
  tobacco: string | null;
  leather: string | null;
  oak: string | null;
  toasted: string | null;
  smokey: string | null;
  peanut: string | null;
  almond: string | null;
  pecan: string | null;
  walnut: string | null;
  oily: string | null;
  floral: string | null;

  corn: string | null;
  rye: string | null;
  wheat: string | null;
  malt: string | null;
  dough: string | null;

  vanilla: string | null;
  caramel: string | null;
  molasses: string | null;
  butterscotch: string | null;
  honey: string | null;
  chocolate: string | null;
  toffee: string | null;
  sugar: string | null;

  overallRating: string | null;
  value: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}

export type TableReview = Pick<review, "overallRating" | "value" | "id"> & {
  bottle: TableBottle;
  createdAt: string;
  date: string;
};
