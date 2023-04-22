import { getAnyDataFromRedis } from "~/utils/redis.server";
import { z, ZodError } from "zod";

export type ErrorObject = {
  [name: string]: string;
};

export type Payload = {
  [name: string]: number | string;
};

export async function handleFormData(request: Request, schema: z.Schema) {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  let result;
  let errors: ErrorObject = {};

  try {
    const validatedBottle = schema.parse(formPayload);
    result = validatedBottle;
  } catch (error) {
    if (error instanceof ZodError) {
      for (let err of error.issues) {
        errors[err.path[0]] = err.message;
      }
    }
  }
  return { result, errors, formData };
}

export async function handleRedisData(id: string, formData: FormData) {
  const data = await getAnyDataFromRedis(id);
  if (!data) {
    throw new Error(`No Redis Data stored for this form`);
  }
  return data;
}

// FORM DATA SCHEMAS

export const bottleSchema = z.object({
  name: z.string().trim().min(1, { message: `Name is required` }),
  imageUrl: z.string(),
  type: z.string().trim().min(1, { message: `Type of alcohol is required` }),
  distiller: z.string().trim().min(1, { message: `Distiller is required` }),
  producer: z.string().trim().min(1, { message: `Producer is required` }),
  country: z.string().trim().min(1, { message: `Country is required` }),
  region: z.string().trim().min(1, { message: `Region is required` }),
  price: z.string().trim().min(1, { message: `Price is required` }),
  age: z.string().trim().min(1, { message: `Age is required` }),
  alcoholPercent: z.string().trim().min(1, { message: `ABV is required` }),
  proof: z.string().trim().min(1, { message: `Proof is required` }),
  color: z.string().trim().min(1, { message: `Color is required` }),
  size: z.string().trim() || null,
  year: z.string().trim() || null,
  batch: z.string().trim() || null,
  barrel: z.string().trim() || null,
  finishing: z.string().trim() || null,
  openDate: z.string() || null,
  killDate: z.string() || null,
  redisId: z.string(),
});

export const settingSchema = z.object({
  date: z.string().trim().min(1, { message: "Date of review is required" }),
  setting: z.string().trim().min(1, { message: "Review setting is required" }),
  glassware: z.string().trim().min(1, { message: "Glassware is required" }),
  restTime: z.string().trim().min(1, { message: "Rest time is required" }),
  nose: z.string().trim().min(1, { message: "Nose notes are required" }),
  palate: z.string().trim().min(1, { message: "Palate notes are required" }),
  finish: z.string().trim().min(1, { message: "Finish notes are required" }),
  thoughts: z
    .string()
    .trim()
    .min(1, { message: "General thoughts are required" }),
  redisId: z.string(),
});

export const noteSchema = z.object({
  pepper: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  bakingSpice: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  cinnamon: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  herbal: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  mint: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  cherry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  strawberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  raspberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  blackberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  blueberry: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  apple: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  banana: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  grape: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  stone: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  citrus: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  tropical: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  coffee: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  tobacco: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  leather: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  oak: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  toasted: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  smokey: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  peanut: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  almond: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  pecan: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  walnut: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  oily: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  floral: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  corn: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  rye: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  wheat: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  malt: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  dough: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  vanilla: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  caramel: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  molasses: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  butterscotch: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  honey: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  chocolate: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  toffee: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  sugar: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  overallRating: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
  value: z.string().trim().min(1, { message: "Enter 0 if no rating" }),
});
