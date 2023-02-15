import type { user } from "@prisma/client";
import Comment from "../Comment/Comment";
import type { Comments } from "~/routes/reviews/$reviewId/comments";

interface CommentSectionProps {
  comments: Comments[];
  user: user;
  reviewId: string;
}

export function CommentSection({
  comments,
  reviewId,
  user,
}: CommentSectionProps) {
  return (
    <div>
      <h4 className="my-2 text-2xl text-blue-700">Comments</h4>
      <span className="text-sm "></span>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="comment-stack">
            <Comment comment={comment} user={user} reviewId={reviewId} />
          </div>
        );
      })}
    </div>
  );
}

export default CommentSection;
