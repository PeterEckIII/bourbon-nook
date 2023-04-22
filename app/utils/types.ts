import type { BottleStatus } from "@prisma/client";
import type { Bottle } from "~/components/UI/Combobox/Combobox";

// FETCHER TYPES
export type ComboData = {
  bottles: Bottle[];
};

export type ImageData = {
  errorMessage?: string;
  imageSrc?: string;
  publicId?: string;
};

// ERROR TYPES
export type BottleErrors = {
  imageSrc?: string;
  name?: string;
  status?: string;
  type?: string;
  distiller?: string;
  producer?: string;
  country?: string;
  region?: string;
  price?: string;
  age?: string;
  year?: string;
  batch?: string;
  barrel?: string;
  alcoholPercent?: string;
  proof?: string;
  size?: string;
  color?: string;
  finishing?: string;
  openDate?: string;
  killDate?: string;
  general?: string;
};

export type SettingErrors = {
  date?: string;
  setting?: string;
  glassware?: string;
  restTime?: string;
  nose?: string;
  palate?: string;
  finish?: string;
  thoughts?: string;
  general?: string;
};

export type NoteErrors = {
  pepper?: string;
  bakingSpice?: string;
  cinnamon?: string;
  herbal?: string;
  mint?: string;
  cherry?: string;
  strawberry?: string;
  raspberry?: string;
  blackberry?: string;
  blueberry?: string;
  apple?: string;
  banana?: string;
  grape?: string;
  stone?: string;
  citrus?: string;
  tropical?: string;
  coffee?: string;
  tobacco?: string;
  leather?: string;
  oak?: string;
  toasted?: string;
  smokey?: string;
  peanut?: string;
  almond?: string;
  pecan?: string;
  walnut?: string;
  oily?: string;
  floral?: string;
  corn?: string;
  rye?: string;
  wheat?: string;
  malt?: string;
  dough?: string;
  vanilla?: string;
  caramel?: string;
  molasses?: string;
  butterscotch?: string;
  honey?: string;
  chocolate?: string;
  toffee?: string;
  sugar?: string;
  overallRating?: string;
  value?: string;
  general?: string;
};

export type RedisFormData = {
  redisId: string;
  bottleId?: string;
  status: BottleStatus;
  userId: string;
  name: string;
  type: string;
  distiller: string;
  producer: string;
  country: string;
  region: string;
  price: string;
  age: string;
  year: string;
  batch: string;
  barrel: string;
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  openDate?: string;
  killDate?: string;
  imageUrl?: string;

  date?: string;
  setting?: string;
  glassware?: string;
  restTime?: string;
  nose?: string;
  palate?: string;
  finish?: string;
  thoughts?: string;

  cherry?: number;
  strawberry?: number;
  raspberry?: number;
  blackberry?: number;
  blueberry?: number;
  apple?: number;
  banana?: number;
  grape?: number;
  stone?: number;
  citrus?: number;
  tropical?: number;
  pepper?: number;
  bakingSpice?: number;
  cinnamon?: number;
  herbal?: number;
  mint?: number;
  coffee?: number;
  tobacco?: number;
  leather?: number;
  oak?: number;
  toasted?: number;
  smokey?: number;
  peanut?: number;
  almond?: number;
  pecan?: number;
  walnut?: number;
  oily?: number;
  floral?: number;
  corn?: number;
  rye?: number;
  wheat?: number;
  malt?: number;
  dough?: number;
  vanilla?: number;
  caramel?: number;
  molasses?: number;
  butterscotch?: number;
  honey?: number;
  chocolate?: number;
  toffee?: number;
  sugar?: number;
  overallRating?: number;
  value?: number;
};

// NOTE TYPES
export type EarthNoteErrors = Pick<
  NoteErrors,
  | "coffee"
  | "tobacco"
  | "leather"
  | "oak"
  | "toasted"
  | "smokey"
  | "peanut"
  | "almond"
  | "walnut"
  | "pecan"
  | "floral"
  | "oily"
>;

export type FruitNotesErrors = Pick<
  NoteErrors,
  | "cherry"
  | "strawberry"
  | "raspberry"
  | "blackberry"
  | "blueberry"
  | "apple"
  | "banana"
  | "grape"
  | "stone"
  | "citrus"
  | "tropical"
>;

export type GrainNotesErrors = Pick<
  NoteErrors,
  "corn" | "rye" | "wheat" | "malt" | "dough"
>;

export type SpiceNotesErrors = Pick<
  NoteErrors,
  "pepper" | "bakingSpice" | "cinnamon" | "herbal" | "mint"
>;

export type SweetNotesErrors = Pick<
  NoteErrors,
  | "vanilla"
  | "caramel"
  | "molasses"
  | "butterscotch"
  | "honey"
  | "chocolate"
  | "toffee"
  | "sugar"
>;
export type RatingErrors = Pick<NoteErrors, "value" | "overallRating">;

export type ValueOf<T> = T[keyof T];
