import type { user } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useTypedFetcher } from "remix-typedjson";
import AddIcon from "~/components/Icons/AddIcon";
import CalendarDays from "~/components/Icons/CalendarDays";
import ChatBubble from "~/components/Icons/ChatBubble";
import User from "~/components/Icons/User";

type ReviewHeaderProps = {
  name: string;
  author: user;
  date: string;
  numComments: number;
  user: user;
  following: any[];
};

export default function ReviewHeader({
  name,
  author,
  date,
  numComments,
  user,
  following,
}: ReviewHeaderProps) {
  const followFetcher = useTypedFetcher<{ ok: true } | { error: any }>();
  // const alreadyFollowing = following.find((f) => f.id === author.id);
  return (
    <div className="flex h-36 flex-col rounded bg-white shadow-lg shadow-blue-700">
      <div className="mb-4 pl-4 pt-4">
        <h1 className="text-3xl">{name}</h1>
      </div>
      <div className="flow flex"></div>
      <div className="mt-6 flex justify-between px-4 md:justify-around md:px-0">
        <div className="flex w-1/3 justify-center">
          <div className="flex">
            <User className="h-10 w-10" />
            <div className="flex items-center">
              <span className="text-2xl">{author.email.split("@")[0]}</span>
            </div>
            <followFetcher.Form
              action={`/services/follow`}
              method="post"
              className="inline"
            >
              <input type="hidden" value={author.id} name="authorId" />
              <button
                className="group relative inline"
                // disabled={alreadyFollowing}
                // aria-disabled={alreadyFollowing}
              >
                <AddIcon
                  classes="bg-none text-blue-500"
                  height={38}
                  width={38}
                />
                <span className="absolute top-10 scale-0 rounded bg-gray-600 p-2 text-xs text-white group-hover:scale-100">
                  {/* {alreadyFollowing ? "Following" : "Follow"} */}Follow
                </span>
              </button>
            </followFetcher.Form>
          </div>
        </div>
        <div className="flex w-1/3 justify-center">
          <div>
            <CalendarDays className="h-10 w-10" />
          </div>
          <div className="flex items-center">
            <span className="text-2xl">
              {new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>
        <Link
          to="#comment-section"
          className="flex w-1/3 justify-center hover:text-blue-500"
        >
          <div>
            <ChatBubble className="h-10 w-10" />
          </div>
          <div className="flex items-center">
            <span className="text-2xl">{numComments}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
