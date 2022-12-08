import type { user } from "@prisma/client";
import Comment from "../Comment/Comment";
import type { CommentFromDB } from "~/routes/reviews/$reviewId/comments";
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
  console.log(`Comments: ${JSON.stringify(comments, null, 2)}`);
  return (
    <div>
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
