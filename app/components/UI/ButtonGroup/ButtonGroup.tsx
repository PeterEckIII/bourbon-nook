import { Link } from "@remix-run/react";
import Button from "../Button/Button";

type ButtonGroupProps = {
  ctaBack: string;
  ctaForward: string;
  linkTo: string;
};

export default function ButtonGroup({
  ctaBack,
  ctaForward,
  linkTo,
}: ButtonGroupProps) {
  return (
    <div className="flex justify-between">
      <div>
        <Link to={linkTo}>
          <Button primary callToAction={ctaBack} type="button" />
        </Link>
      </div>
      <div>
        <Button primary callToAction={ctaForward} type="submit" />
      </div>
    </div>
  );
}
