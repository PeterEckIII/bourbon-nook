import { formatDistance } from "date-fns";
import { useState } from "react";
import ChevronDown from "../Icons/ChevronDown";
import ChevronUp from "../Icons/ChevronUp";

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

export default function FancyComment({ comment }: CommentProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const readableDate = formatDistance(new Date(comment.createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <details open={isOpen} className="relative my-[20px] mx-auto">
      <summary className={`relative cursor-pointer list-none`}>
        {/* Heading */}
        <div
          className={`after:align-center flex h-[50px] items-center text-sm after:absolute after:right-[5px] after:inline-block after:text-xs after:text-[rgba(0,0,0,0.55)] ${
            !isOpen
              ? "after:content-['Click to Show'] border-b-2 border-b-[rgba(0,0,0,0.2)]"
              : "after:content-['Click to Hide'] border-b-2 border-b-[rgba(0,0,0,0.2)]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Voting */}
          <div className="border-1 h-[32px] w-[20px] rounded-2xl border-[rgba(0,0,0,0.2)]">
            <button
              type="button"
              className="block h-1/2 w-full border-0 p-0 text-xs"
            >
              <span aria-hidden="true">
                <ChevronUp className="" />
              </span>
              <span className="sr-only">Vote up</span>
            </button>
            <button
              type="button"
              className="block h-1/2 w-full border-0 p-0 text-xs"
            >
              <span aria-hidden="true">
                <ChevronDown />
              </span>
              <span className="sr-only">Vote down</span>
            </button>
          </div>
          <div className="ml-3 text-[rgba(0,0,0,0.5)]">
            <a
              href="/"
              className="font-bold text-[rgba(0,0,0,0.85)] no-underline hover:underline"
            >
              {comment.author.email}
            </a>
            <p className="m-0">
              {/* VOTES */} &bull; {readableDate}
            </p>
          </div>
        </div>
      </summary>
      <div className="py-0 px-5">
        <p>{comment.body}</p>
        <button
          className="appearance-none rounded border-2 border-[rgba(0,0,0,0.2)] py-1 px-2 text-sm text-[rgba(0,0,0,0.2)]"
          type="button"
        >
          Reply
        </button>
      </div>
    </details>
  );
}
