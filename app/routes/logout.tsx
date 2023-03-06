import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { logout } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  return logout(request);
};

export const loader = async ({}: LoaderArgs) => {
  return redirect("/");
};
