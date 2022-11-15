import type { FC } from "react";
import AddIcon from "~/components/Icons/AddIcon";
import FollowIcon from "~/components/Icons/FollowIcon";

interface FollowButtonProps {
  callToAction: string;
}

const FollowButton: FC<FollowButtonProps> = ({ callToAction }) => {
  return (
    <div className="inline">
      <button className="m-1 rounded border-2 border-followerBtn px-4 py-2 duration-[.25s] hover:font-semibold hover:text-white hover:shadow-followBtnHover">
        <FollowIcon classes="inline" /> {callToAction}
      </button>
    </div>
  );
};

export default FollowButton;
