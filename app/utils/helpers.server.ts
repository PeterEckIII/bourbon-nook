import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Status } from "~/routes/reviews/new";
import { useFetcher } from "@remix-run/react";
import type { FetcherWithComponents } from "@remix-run/react";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { ImageActionData } from "~/routes/services/image";
import type { LoaderData } from "~/routes/services/combo";
import type { action as newReviewBottleAction } from "~/routes/reviews/new/bottle";
import type { action as newBottleAction } from "~/routes/bottles/new/bottle";

export function assertNonNullable<T>(
  value: unknown
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Value is undefined or null`);
  }
}

export const generateCode = (length: number): string => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export function useFetcherNoSerialize<
  TData = any
>(): FetcherWithComponents<TData> {
  return useFetcher<TData>() as FetcherWithComponents<TData>;
}

export type SavedRedisData = { redisId: string } & (
  | BottleInfoFormData
  | SettingInfoFormData
  | NotesInfoFormData
  | { imageUrl?: string }
);

export interface CustomFormData {
  redisId: string;
  status: Status;
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
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
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
}

export type BottleInfoFormData = Pick<
  CustomFormData,
  | "userId"
  | "status"
  | "name"
  | "type"
  | "distiller"
  | "producer"
  | "country"
  | "region"
  | "price"
  | "age"
  | "year"
  | "batch"
  | "alcoholPercent"
  | "proof"
  | "size"
  | "color"
  | "finishing"
  | "redisId"
>;

export type SettingInfoFormData = Pick<
  CustomFormData,
  | "date"
  | "setting"
  | "glassware"
  | "restTime"
  | "nose"
  | "palate"
  | "finish"
  | "thoughts"
>;

export type NotesInfoFormData =
  | FruitNotesFormData
  | SpiceNotesFormData
  | EarthNotesFormData
  | GrainNotesFormData
  | SweetNotesFormData
  | RatingNotesFormData;

export type FruitNotesFormData = Pick<
  CustomFormData,
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

export type SpiceNotesFormData = Pick<
  CustomFormData,
  "pepper" | "bakingSpice" | "cinnamon" | "herbal" | "mint"
>;

export type EarthNotesFormData = Pick<
  CustomFormData,
  | "coffee"
  | "tobacco"
  | "leather"
  | "oak"
  | "toasted"
  | "smokey"
  | "peanut"
  | "almond"
  | "pecan"
  | "walnut"
  | "oily"
  | "floral"
>;

export type GrainNotesFormData = Pick<
  CustomFormData,
  "corn" | "rye" | "wheat" | "dough" | "malt"
>;

export type SweetNotesFormData = Pick<
  CustomFormData,
  | "vanilla"
  | "caramel"
  | "molasses"
  | "butterscotch"
  | "honey"
  | "chocolate"
  | "toffee"
  | "sugar"
>;

export type RatingNotesFormData = Pick<
  CustomFormData,
  "overallRating" | "value"
>;

export type CustomBottleFormData = {
  redisId: string;
  status: Status;
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
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  imageUrl?: string;
};

export interface BottleFormValues {
  redisId: string;
  status: Status;
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
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  imageUrl?: string;
}

export interface ReviewFormValues extends BottleFormValues {
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
}

export type BottleContext = {
  name: string;
  status: Status;
  type: string;
  distiller: string;
  producer: string;
  country: string;
  region: string;
  price: string;
  age: string;
  year: string;
  batch: string;
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  imageUrl?: string;
};

export type ReviewContext = {
  name: string;
  status: Status;
  type: string;
  distiller: string;
  producer: string;
  country: string;
  region: string;
  price: string;
  age: string;
  year: string;
  batch: string;
  alcoholPercent: string;
  proof: string;
  size: string;
  color: string;
  finishing: string;
  imageUrl: string;

  date: string;
  setting: string;
  glassware: string;
  restTime: string;
  nose: string;
  palate: string;
  finish: string;
  thoughts: string;
  cherry: number;
  strawberry: number;
  raspberry: number;
  blackberry: number;
  blueberry: number;
  apple: number;
  banana: number;
  grape: number;
  stone: number;
  citrus: number;
  tropical: number;
  pepper: number;
  bakingSpice: number;
  cinnamon: number;
  herbal: number;
  mint: number;
  coffee: number;
  tobacco: number;
  leather: number;
  oak: number;
  toasted: number;
  smokey: number;
  peanut: number;
  almond: number;
  pecan: number;
  walnut: number;
  oily: number;
  floral: number;
  corn: number;
  rye: number;
  wheat: number;
  malt: number;
  dough: number;
  vanilla: number;
  caramel: number;
  molasses: number;
  butterscotch: number;
  honey: number;
  chocolate: number;
  toffee: number;
  sugar: number;
  overallRating: number;
  value: number;
};

type Errors<T> = { general?: string } & {
  [P in keyof T]?: string;
};

export type BottleImageProps<
  ContextType extends BottleContext | ReviewContext,
  Action extends typeof newReviewBottleAction | typeof newBottleAction,
  Loader extends CustomFormData | BottleInfoFormData
> = {
  state: ContextType;
  loaderData: Loader;
  actionData?: Action;
  errors: Errors<ContextType>;
  combo: TypedFetcherWithComponents<LoaderData>;
  imageFetcher: TypedFetcherWithComponents<ImageActionData>;
  formIsSubmitting: boolean;
  stateSetter: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setFormState: Dispatch<SetStateAction<ContextType>> | undefined;
};
