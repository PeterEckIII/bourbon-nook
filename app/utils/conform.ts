import { parse } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { TypeOf, ZodType, z } from "zod";

import { getUserByEmail, getUserByUsername } from "~/models/user.server";

export type ErrorObject = Record<string, string>;

export function validateSchema<
  T extends ZodType<Record<string | number, unknown>>,
>(schema: T, data: unknown): TypeOf<T> {
  const parsedData = schema.parse(data);
  return parsedData;
}

export async function handleFormData<
  T extends ZodType<Record<number, unknown>>,
>(request: Request, schema: T): Promise<TypeOf<T>> {
  const formData = await request.formData();

  const submission = parse(formData, { schema });
  if (!submission.value || submission.intent !== "submit") {
    return json(submission);
  }

  const formPayload = Object.fromEntries(formData);
  const result = validateSchema(schema, formPayload);

  return result;
}

export async function handleSubmission<
  T extends ZodType<Record<string | number, unknown>>,
>(request: Request, schema: T) {
  const formData = await request.formData();
  const submission = parse(formData, { schema });

  const formPayload = Object.fromEntries(formData);
  const result = validateSchema(schema, formPayload);

  return { result, submission };
}

export const userSchema = z.object({
  username: z.string().refine(async (i) => {
    const userExists = await getUserByUsername(i);
    if (userExists) return false;
    if (!userExists) return true;
  }),
  email: z
    .string()
    .email()
    .refine(async (i) => {
      const emailExists = await getUserByEmail(i);
      if (emailExists) return false;
      if (!emailExists) return true;
    }),
  password: z.string(),
  confirmPassword: z.string(),
});

export const bottleSchema = z.object({
  userId: z.string(),
  name: z.string({ required_error: "Please add a name to the bottle" }),
  status: z.enum(["CLOSED", "OPENED", "FINISHED"]),
  type: z.string({ required_error: "Please add the spirit type" }),
  distiller: z.string(),
  producer: z.string(),
  country: z.string(),
  region: z.string(),
  price: z.string(),
  age: z.string(),
  year: z.string(),
  batch: z.string({
    required_error: "Add `N/A` if there is no batch information",
  }),
  barrel: z.string({
    required_error: "Add `N/A` if there is no barrel information",
  }),
  alcoholPercent: z.string(),
  proof: z.string(),
  size: z.string(),
  color: z.string(),
  finishing: z.string({
    required_error: "Add `None` if no finishing barrels are used",
  }),
  imageUrl: z.string(),
  openDate: z.string(),
  killDate: z.string(),
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
