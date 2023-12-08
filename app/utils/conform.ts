import { parse } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { TypeOf, ZodType, z } from "zod";

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
  batch: z.string(),
  barrel: z.string(),
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
