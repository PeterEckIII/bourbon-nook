import Comment from "../Comment";

export type CommentPartial = {
  body: string;
  id: string;
  createdAt: string;
  author: {
    email: string;
  };
};

interface CommentSectionProps {
  comments: CommentPartial[];
}

export function CommentSection({ comments }: CommentSectionProps) {
  console.log(`COMMENTS: ${JSON.stringify(comments, null, 2)}`);
  return (
    <div>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
}

export default CommentSection;
