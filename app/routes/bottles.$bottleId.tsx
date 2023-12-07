import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getBottle } from "~/models/bottle.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(
    params.bottleId,
    "params.bottleId is required, but missing in the URL parameters",
  );
  const bottleId = params.bottleId;

  const bottle = await getBottle(bottleId);
  if (!bottle) {
    throw new Response("Not found", { status: 404 });
  }

  invariant(bottle, "There is no bottle under that ID");

  return json({
    bottle,
  });
};

export default function BottleSlug() {
  const { bottle } = useLoaderData<typeof loader>();
  return (
    <main className="m-4 p-4">
      <h1 className="text-3xl underline">{bottle.name}</h1>
      <div className="flex justify-between">
        <div>Type: {bottle.type}</div>
        <div>Distillery: {bottle.distiller}</div>
        <div>Producer: {bottle.producer}</div>
        <div>Country: {bottle.country}</div>
        <div>Region: {bottle.region}</div>
        <div></div>
      </div>
    </main>
  );
}
