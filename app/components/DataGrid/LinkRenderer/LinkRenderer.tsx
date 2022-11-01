import { Link } from "@remix-run/react";
import ExternalLink from "~/components/Icons/ExternalLink";

export default function LinkRenderer(params: any) {
  return (
    <div className="flex items-end justify-center pt-2">
      <Link className="mb-4 text-blue-600" to={`${params.value}`}>
        <ExternalLink className="" />
      </Link>
    </div>
  );
}
