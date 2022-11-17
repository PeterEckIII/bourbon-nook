import type { comment } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useState } from "react";
import ChevronDown from "~/components/Icons/ChevronDown";
import ChevronUp from "~/components/Icons/ChevronUp";

export type CommentPartial = {
  body: string;
  id: string;
  createdAt: string;
  author: {
    email: string;
  };
};

type CommentProps = {
  comment: CommentPartial;
};

export default function Comment({ comment }: CommentProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const readableDate = formatDistance(new Date(comment.createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="flex flex-col">
      <details open={isOpen} className="m-2 flex flex-col">
        <summary className="flex cursor-pointer list-none">
          <div className="inline rounded-2xl border-gray-700">
            <button className="mr-2 block h-1/2 w-full border-0 p-0 text-xs">
              <span aria-hidden="true">
                <ChevronUp className="" />
              </span>
              <span className="sr-only">Vote up</span>
            </button>
            <button className="mr-2 block h-1/2 w-full border-0 p-0 text-xs">
              <span aria-hidden="true">
                <ChevronDown />
              </span>
              <span className="sr-only">Vote down</span>
            </button>
          </div>
          <div className="inline">
            <a href="/" className="font-bold text-gray-800">
              {comment.author.email}
            </a>
            <p className="italics text-gray-500">
              22 votes &bull; {readableDate}
            </p>
          </div>
        </summary>
        <div className="my-2 ml-8">
          <p>{comment.body}</p>
        </div>
      </details>
    </div>
  );
}
