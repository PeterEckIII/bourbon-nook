import type { Prisma } from "@prisma/client";
import { Link } from "@remix-run/react";
import ExternalLink from "~/components/Icons/ExternalLink";
import FilterArrowDown from "~/components/Icons/FilterArrowDown";
import FilterArrows from "~/components/Icons/FilterArrows";
import FilterArrowUp from "~/components/Icons/FilterArrowUp";
import type {
  SortableColumn,
  UnsortableColumn,
  ReviewSortOptions,
  GridReview,
} from "~/routes/services/search/review/fetch";
import Caption from "../Common/Caption";
import Thead from "../Common/Thead";

type Column = SortableColumn | UnsortableColumn;

export type ReviewTableProps = {
  columns: Column[];
  items: GridReview[] | [];
  sortField: ReviewSortOptions;
  sortDirection: Prisma.SortOrder;
  handleSortingChange: (field: ReviewSortOptions) => void;
};

export default function ReviewTable({
  columns,
  items,
  sortField,
  sortDirection,
  handleSortingChange,
}: ReviewTableProps) {
  return (
    <div>
      <div className="overflow-x-scroll">
        <table className="w-full border-collapse">
          <Caption
            caption="Your bottle reviews"
            info="Each row represents a bottle you've reviewed. The first column
              is the bottle name. Subsequent columns show the details for each
              review"
          />
          <thead className="border-b-2 border-blue-500">
            <tr className="overflow-hidden border-b-2 text-gray-700">
              {columns.map((column, index) => (
                <>
                  {column.kind === "sortable" && column.sort ? (
                    <th
                      ref={column.ref}
                      scope="col"
                      key={column.field}
                      onClick={() => handleSortingChange(column.field)}
                      className="border-b-2 text-left text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
                    >
                      <div className="flex">
                        <div className="mx-4">{column.header}</div>
                        <div className="mx-4">
                          {column.sort &&
                          column.field === sortField &&
                          sortDirection === "asc" ? (
                            <FilterArrowUp />
                          ) : column.field === sortField &&
                            sortDirection === "desc" ? (
                            <FilterArrowDown />
                          ) : (
                            <FilterArrows />
                          )}
                        </div>
                      </div>
                    </th>
                  ) : (
                    <th
                      ref={column.ref}
                      scope="col"
                      key={column.field}
                      className="border-b-2 text-left text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
                    >
                      <span>{column.header}</span>
                    </th>
                  )}
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((review, index) => (
              <tr key={review.id} className="mx-2 h-[50px] overflow-hidden">
                <th
                  scope="row"
                  className="sticky left-0 z-50 w-[300px] min-w-[300px] bg-white p-4 text-left"
                >
                  {review?.bottle?.name}
                </th>
                <td className="w-[115px] min-w-[115px]">
                  {new Date(review?.date as string).toLocaleString("en-us", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td className="w-[115px] min-w-[115px]">
                  <span
                    className={
                      review?.bottle?.status === "OPENED"
                        ? "rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-left text-green-700 "
                        : review?.bottle?.status === "CLOSED"
                        ? "rounded-lg bg-yellow-500 bg-opacity-60 p-2 px-2 py-1 text-left text-yellow-700 "
                        : review?.bottle?.status === "FINISHED"
                        ? "rounded-lg bg-gray-300 bg-opacity-60 p-2 px-2 py-1 text-left text-gray-700 "
                        : "rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-left text-green-700 "
                    }
                  >
                    {review?.bottle?.status}
                  </span>
                </td>
                <td className="w-[100px] min-w-[100px] text-left">
                  {review?.bottle?.type}
                </td>
                <td className="w-[200px] min-w-[200px] text-left">
                  {review?.bottle?.distiller}
                </td>
                <td className="w-[200px] min-w-[200px] text-left">
                  {review?.bottle?.producer}
                </td>
                <td className="w-[85px] min-w-[85px] text-center">
                  {review?.bottle?.alcoholPercent}%
                </td>
                <td className="w-[85px] min-w-[85px] text-center">
                  {review?.bottle?.proof}pf
                </td>
                <td className="w-[125px] min-w-[125px] text-center">
                  {review?.bottle?.age}
                </td>
                <td className="w-[50px] min-w-[50px] text-center">
                  ${review?.bottle?.price}
                </td>
                <td className="w-[px] min-w-[px] text-right">
                  {review?.value}
                </td>
                <td className="w-[px] min-w-[px] text-right">
                  {review?.overallRating}
                </td>
                <td className="w-[px] min-w-[px] text-center">
                  <Link to={`/reviews/${review?.id}/comments`}>
                    <ExternalLink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
