import type { user, follows } from "@prisma/client";
import type { FC } from "react";
import { useMemo } from "react";
import React from "react";
import FollowIcon from "~/components/Icons/FollowIcon";
import FollowButton from "~/components/UI/FollowButton";

interface FollowFormProps {
  ref: React.Ref<HTMLFormElement | null>;
  user: user;
  author: user;
  CustomForm: any;
  following: follows[] | [];
}

const FollowForm: FC<FollowFormProps> = ({
  ref,
  user,
  author,
  CustomForm,
  following,
}) => {
  const alreadyFollowing = useMemo(() => {
    return (
      following.length > 0 &&
      following.some((f) => {
        return f.followingId === author.id;
      })
    );
  }, [following, author]);

  return (
    <div>
      <CustomForm method="post" action="/reviews/follow" ref={ref}>
        <input
          type="hidden"
          name="followerId"
          id="followerId"
          value={user.id}
        />
        <input type="hidden" name="authorId" id="authorId" value={author.id} />
        <div>
          <button type="submit" disabled={alreadyFollowing}>
            {alreadyFollowing ? (
              <p>Following</p>
            ) : (
              <>
                <FollowButton />
              </>
            )}
          </button>
        </div>
      </CustomForm>
    </div>
  );
};

export default FollowForm;
