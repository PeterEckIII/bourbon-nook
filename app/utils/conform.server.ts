import { parse } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { TypeOf, ZodType } from "zod";

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
