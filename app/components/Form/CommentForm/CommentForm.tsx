import type { FC } from "react";
import Button from "~/components/UI/Button";

interface CommentFormProps {
  Form: any;
  state: "idle" | "submitting" | "loading";
  type:
    | "init"
    | "done"
    | "actionSubmission"
    | "loaderSubmission"
    | "actionReload"
    | "actionRedirect"
    | "normalLoad";
  data: any;
}

const CommentForm: FC<CommentFormProps> = ({ Form, state, type, data }) => {
  return (
    <div>
      <Form method="post">
        <div className="mx-2">
          <label className="my-2 flex w-full flex-col gap-1" htmlFor="body">
            Add Comment
          </label>
          <textarea
            aria-label="comment"
            name="body"
            id="body"
            rows={3}
            className="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button callToAction="Add comment" type="submit" />
      </Form>
    </div>
  );
};

export default CommentForm;
