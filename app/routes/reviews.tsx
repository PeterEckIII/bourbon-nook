import { Outlet, Link } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction, LinksFunction } from "@remix-run/server-runtime";
import { useState } from "react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getReviewListItems } from "~/models/review.server";
import Glencairn from "~/components/Icons/Glencairn";
import Menu from "~/components/UI/Menu/Menu";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Courgette&family=Satisfy&display=swap",
    },
  ];
};

type LoaderData = {
  reviewListItems: Awaited<ReturnType<typeof getReviewListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const reviewListItems = await getReviewListItems({ userId });
  return json<LoaderData>({ reviewListItems });
};

export default function ReviewsPage() {
  const user = useUser();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="flex items-center text-white">
            <div className="flex">
              <Glencairn />
              <div className="text-center font-['Satisfy'] text-2xl leading-7">
                THE
                <br />
                BOURBON
                <br />
                NOOK
              </div>
            </div>
          </Link>
        </h1>
        <p className="font-['Courgette'] text-xl">{user.email}</p>
        <Menu opened={opened} setOpened={setOpened} />
      </header>

      <main className="flex h-full bg-white" aria-roledescription="aside">
        <div className="flex w-full justify-center p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
