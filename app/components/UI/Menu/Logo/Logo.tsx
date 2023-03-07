import { Link } from "react-router-dom";
import Glencairn from "~/components/Icons/Glencairn";

export default function Logo() {
  return (
    <Link to="/" className="text-3xl font-bold leading-none">
      <div className="flex items-center">
        <Glencairn height="90px" width="90px" />
        <div className="p-4 pl-0 text-center font-['Satisfy'] text-2xl leading-7 text-blue-500">
          THE
          <br />
          BOURBON
          <br />
          NOOK
        </div>
      </div>
    </Link>
  );
}
