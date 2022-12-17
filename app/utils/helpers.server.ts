import "dotenv/config";
import cloudinary from "cloudinary";
import { writeAsyncIterableToWritable } from "@remix-run/node";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function assertNonNullable<T>(
  value: unknown
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Value is undefined or null`);
  }
}

interface UploadImageProps {
  data: AsyncIterable<Uint8Array>;
  userId: string;
}

export async function uploadImage({ data, userId }: UploadImageProps) {
  const uploadPromise = new Promise(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder: userId },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        console.log(`RESULT: ${JSON.stringify(result)}`);
        resolve(result);
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });

  return uploadPromise;
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

export type SavedRedisData = { redisId: string } & (
  | BottleInfoFormData
  | SettingInfoFormData
  | NotesInfoFormData
  | { imageUrl: string }
);

export interface CustomFormData {
  redisId: string;
  name: string;
  type: string;
  distiller: string;
  bottler: string;
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
  | "name"
  | "type"
  | "distiller"
  | "producer"
  | "bottler"
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
