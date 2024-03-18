import { BottleStatus, bottle } from "@prisma/client";
import {
  type LoaderFunctionArgs,
  json,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import Input from "~/components/Input/Input";
import Status from "~/components/Status/Status";
import { editBottle, getBottle } from "~/models/bottle.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  if (!userId) {
    return redirect("/login");
  }
  invariant(params.bottleId, "Missing bottle ID");
  const bottle = await getBottle(params.bottleId);
  if (!bottle) {
    throw new Response("Not found", { status: 404 });
  }

  return json({ bottle });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const userId = await requireUserId(request);
  const status =
    (formData.get("status")?.toString() as BottleStatus) ?? "OPENED";
  const bottleId = formData.get("bottleId")?.toString() ?? "";
  const name = formData.get("name")?.toString() ?? "";
  const type = formData.get("type")?.toString() ?? "";
  const distiller = formData.get("distiller")?.toString() ?? "";
  const producer = formData.get("producer")?.toString() ?? "";
  const country = formData.get("country")?.toString() ?? "";
  const region = formData.get("region")?.toString() ?? "";
  const price = formData.get("price")?.toString() ?? "";
  const age = formData.get("age")?.toString() ?? "";
  const year = formData.get("year")?.toString() ?? "";
  const batch = formData.get("batch")?.toString() ?? "";
  const barrel = formData.get("barrel")?.toString() ?? "";
  const alcoholPercent = formData.get("alcoholPercent")?.toString() ?? "";
  const proof = formData.get("proof")?.toString() ?? "";
  const size = formData.get("size")?.toString() ?? "";
  const color = formData.get("color")?.toString() ?? "";
  const finishing = formData.get("finishing")?.toString() ?? "";
  const imageUrl = formData.get("imageUrl")?.toString() ?? "";
  const openDate = formData.get("openDate")?.toString() ?? "";
  const killDate = formData.get("killDate")?.toString() ?? "";

  const errors = {
    userId: userId ? null : "userId is not supplied",
    bottleId: bottleId ? null : "Bottle ID is required",
    status: status ? null : "Status is required",
    name: name ? null : "Bottle name is required",
    type: type ? null : "Type is required",
    distiller: distiller ? null : "Distiller is required",
    producer: producer ? null : "Producer is required",
    country: country ? null : "Country is required",
    region: region ? null : "Region is required",
    price: price ? null : "Price is required",
    age: age ? null : "Age is required. Put 'NAS' if not provided",
    year: year ? null : "Year is required",
    batch: batch ? null : "Batch is required. Put 'N/A' if not relevant",
    barrel: barrel ? null : "Barrel is required. Put 'N/A' if not relevant",
    alcoholPercent: alcoholPercent ? null : "ABV is required",
    proof: proof ? null : "Proof is required. Enter 2x ABV to get the proof",
    size: size ? null : "Size is required",
    color: color ? null : "Color is required. Use your best judgement!",
    finishing: finishing
      ? null
      : "Finishing is required. Put 'N/A' if not relevant",
    imageUrl: imageUrl ? null : "An image must be provided",
    openDate: openDate ? null : "Open Date is required",
    killDate: killDate ? null : "Kill date is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json({ errors });
  }

  const updates = Object.fromEntries(formData) as Omit<
    bottle,
    "createdAt" | "updatedAt" | "userId" | "id"
  >;
  await editBottle({
    userId,
    id: bottleId,
    ...updates,
  });

  return redirect(`/bottles/${bottleId}`);
};

export default function EditBottle() {
  const { bottle } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <Form id="bottle-form" method="POST">
      <input type="hidden" value={bottle.id} name="bottleId" />
      <Input
        type="text"
        label="Name"
        name="name"
        placeholder="Bottle name"
        defaultValue={bottle.name}
        error={errors?.errors.name ? errors.errors.name : undefined}
        onChange={(e) => console.log(e.target.value)}
        navigationState={navigation.state}
      />
      <Status
        options={[
          {
            value: "CLOSED",
            label: "Closed",
          },
          {
            value: "OPENED",
            label: "Opened",
          },
          {
            value: "FINISHED",
            label: "Finished",
          },
        ]}
      />
      <Input
        type="text"
        label="Type"
        name="type"
        placeholder="Whiskey type (bourbon, rye, single malt)"
        error={errors?.errors.type ? errors.errors.type : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.type}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Distiller"
        name="distiller"
        placeholder="Distillery"
        error={errors?.errors.distiller ? errors.errors.distiller : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.distiller ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Producer"
        name="producer"
        placeholder="Producer"
        error={errors?.errors.producer ? errors.errors.producer : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.producer ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Country of Origin"
        name="country"
        placeholder="Country of Origin"
        error={errors?.errors.country ? errors.errors.country : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.country ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Region"
        name="region"
        placeholder="Region"
        error={errors?.errors.region ? errors.errors.region : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.region ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Price"
        name="price"
        placeholder="$64.99"
        error={errors?.errors.price ? errors.errors.price : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.price ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Age"
        name="age"
        placeholder="Age"
        error={errors?.errors.age ? errors.errors.age : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.age ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Year"
        name="year"
        placeholder="2023"
        error={errors?.errors.year ? errors.errors.year : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.year ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Batch"
        name="batch"
        placeholder="Batch"
        error={errors?.errors.batch ? errors.errors.batch : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.batch ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Barrel"
        name="barrel"
        placeholder="Barrel"
        error={errors?.errors.barrel ? errors.errors.barrel : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.barrel ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="ABV"
        name="alcoholPercent"
        placeholder="52.7%"
        error={
          errors?.errors.alcoholPercent
            ? errors.errors.alcoholPercent
            : undefined
        }
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.alcoholPercent ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Proof"
        name="proof"
        placeholder="Proof"
        error={errors?.errors.proof ? errors.errors.proof : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.proof ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Size"
        name="size"
        placeholder="Size"
        error={errors?.errors.size ? errors.errors.size : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.size ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Color"
        name="color"
        placeholder="Color"
        error={errors?.errors.color ? errors.errors.color : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.color ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Finishing"
        name="finishing"
        placeholder="Finishing"
        error={errors?.errors.finishing ? errors.errors.finishing : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.finishing ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Bottle Image"
        name="imageUrl"
        placeholder="Bottle Image"
        error={errors?.errors.imageUrl ? errors.errors.imageUrl : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.imageUrl ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Open Date"
        name="openDate"
        placeholder="6/2/2022"
        error={errors?.errors.openDate ? errors.errors.openDate : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.openDate ?? ""}
        navigationState={navigation.state}
      />
      <Input
        type="text"
        label="Kill Date"
        name="killDate"
        placeholder="11/27/2022"
        error={errors?.errors.killDate ? errors.errors.killDate : undefined}
        onChange={(e) => console.log(e.target.value)}
        defaultValue={bottle.killDate ?? ""}
        navigationState={navigation.state}
      />
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}
