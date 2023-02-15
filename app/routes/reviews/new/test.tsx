import { json, redirect } from "@remix-run/server-runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import type { UploadApiResponse } from "cloudinary";
import { randomUUID } from "crypto";
import { requireUserId } from "~/session.server";
import { upload } from "~/utils/cloudinary.server";
import invariant from "tiny-invariant";

export const action = async ({ request }: ActionArgs) => {
  const redirectIfLoggedOut = new URL(request.url);
  const userId = await requireUserId(request);
  invariant(userId, "No user in session");
  if (!userId || typeof userId === "undefined") {
    redirect(`/login?redirectTo=${redirectIfLoggedOut}`);
  }

  const formData = await request.formData();

  const name = formData.get("name")?.toString();
  const status = formData.get("status")?.toString();
  const type = formData.get("type")?.toString();
  const distiller = formData.get("distiller")?.toString();
  const producer = formData.get("producer")?.toString();
  const country = formData.get("country")?.toString();
  const region = formData.get("region")?.toString();
  const price = formData.get("price")?.toString();
  const age = formData.get("age")?.toString();
  const year = formData.get("year")?.toString();
  const batch = formData.get("batch")?.toString();
  const alcoholPercent = formData.get("alcoholPercent")?.toString();
  const proof = formData.get("proof")?.toString();
  const size = formData.get("size")?.toString();
  const color = formData.get("color")?.toString();
  const finishing = formData.get("finishing")?.toString();

  const errors = {
    name: name ? undefined : "Name is required",
    status:
      status && ["CLOSED", "OPENED", "FINISHED"].indexOf(status) > -1
        ? undefined
        : "Status must be one of 'OPENED', 'CLOSED', or 'FINISHED'",
    type: type ? undefined : "Type is required",
    distiller: distiller ? undefined : "Distiller is required",
    producer: producer ? undefined : "Producer is required",
    country: country ? undefined : "Country is required",
    region: region ? undefined : "Region is required",
    price: price ? undefined : "Price is required",
    age: age ? undefined : "Age is required",
    year: year ? undefined : "Year is required",
    batch: batch
      ? undefined
      : "Batch is required. Please put 'N/A' if no batch",
    alcoholPercent: alcoholPercent ? undefined : "Alcohol Percent is required",
    proof: proof ? undefined : "Proof is required",
    size: size ? undefined : "Size is required",
    color: color ? undefined : "Color is required",
    finishing: finishing
      ? undefined
      : "Finishing is required. Please put 'None' if no finish",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  if (
    typeof name !== "string" ||
    typeof status !== "string" ||
    typeof type !== "string" ||
    typeof distiller !== "string" ||
    typeof producer !== "string" ||
    typeof country !== "string" ||
    typeof region !== "string" ||
    typeof price !== "string" ||
    typeof age !== "string" ||
    typeof year !== "string" ||
    typeof batch !== "string" ||
    typeof alcoholPercent !== "string" ||
    typeof proof !== "string" ||
    typeof size !== "string" ||
    typeof color !== "string" ||
    typeof finishing !== "string"
  ) {
    throw new Error(
      `Invalid input. Please only use letters, numbers, and symbols`
    );
  }
};

export default function TestRoute() {
  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
}
