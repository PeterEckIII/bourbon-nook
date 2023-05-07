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
    <div tabIndex={0}>
      <div className="overflow-x-scroll">
        <table
          className="w-full border-collapse focus:border-2 focus:border-blue-500"
          role="grid"
          aria-describedby="caption"
          tabIndex={0}
          aria-colcount={13}
          // this means total number of rows is unknown
          aria-rowcount={-1}
        >
          <Caption
            caption="Your bottle reviews"
            info="Each row represents a bottle you've reviewed. The first column
              is the bottle name. Subsequent columns show the details for each
              review"
          />
          <thead className="border-b-2 border-blue-500">
            <tr
              className="overflow-hidden border-b-2 text-gray-700"
              role="row"
              aria-rowindex={1}
              tabIndex={0}
            >
              {columns.map((column, index) => (
                <>
                  {column.kind === "sortable" && column.sort ? (
                    <th
                      ref={column.ref}
                      scope="col"
                      role="columnheader"
                      aria-colindex={index + 1}
                      aria-sort={
                        column.sortDirection === "asc"
                          ? "ascending"
                          : column.sortDirection === "desc"
                          ? "descending"
                          : "none"
                      }
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
                      role="columnheader"
                      aria-colindex={index + 1}
                      aria-sort="none"
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
          <tbody role="presentation">
            {items.map((review, index) => (
              <tr
                key={review.id}
                className="mx-2 h-[50px] overflow-hidden"
                role="row"
                aria-rowindex={index + 2}
              >
                <td
                  role="gridcell"
                  className="sticky left-0 z-50 w-[300px] min-w-[300px] bg-white p-4 text-left"
                  aria-colindex={1}
                >
                  {review?.bottle?.name}
                </td>
                <td
                  className="w-[115px] min-w-[115px]"
                  role="gridcell"
                  aria-colindex={2}
                >
                  {new Date(review?.date as string).toLocaleString("en-us", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td
                  className="w-[115px] min-w-[115px]"
                  role="gridcell"
                  aria-colindex={3}
                >
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
                <td
                  className="w-[100px] min-w-[100px] text-left"
                  role="gridcell"
                  aria-colindex={4}
                >
                  {review?.bottle?.type}
                </td>
                <td
                  aria-colindex={5}
                  className="w-[200px] min-w-[200px] text-left"
                  role="gridcell"
                >
                  {review?.bottle?.distiller}
                </td>
                <td
                  className="w-[200px] min-w-[200px] text-left"
                  role="gridcell"
                  aria-colindex={6}
                >
                  {review?.bottle?.producer}
                </td>
                <td
                  className="w-[85px] min-w-[85px] text-center"
                  role="gridcell"
                  aria-colindex={7}
                >
                  {review?.bottle?.alcoholPercent}%
                </td>
                <td
                  className="w-[85px] min-w-[85px] text-center"
                  role="gridcell"
                  aria-colindex={8}
                >
                  {review?.bottle?.proof}pf
                </td>
                <td
                  className="w-[125px] min-w-[125px] text-center"
                  role="gridcell"
                  aria-colindex={9}
                >
                  {review?.bottle?.age}
                </td>
                <td
                  className="w-[50px] min-w-[50px] text-center"
                  role="gridcell"
                  aria-colindex={10}
                >
                  ${review?.bottle?.price}
                </td>
                <td
                  className="w-[px] min-w-[px] text-right"
                  role="gridcell"
                  aria-colindex={11}
                >
                  {review?.value}
                </td>
                <td
                  className="w-[px] min-w-[px] text-right"
                  role="gridcell"
                  aria-colindex={12}
                >
                  {review?.overallRating}
                </td>
                <td
                  className="w-[px] min-w-[px] text-center"
                  role="gridcell"
                  aria-colindex={13}
                >
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
