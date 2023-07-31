import type { Column, Limit, APIReview } from "~/utils/types";
import GlobalFilter from "../Common/GlobalFilter";
import { type SetStateAction } from "react";
import Caption from "../Common/Caption";
import { Link } from "@remix-run/react";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import Pagination from "../Common/Pagination/Pagination";
import ExternalLink from "~/components/Icons/ExternalLink";
import type { ReviewSearchData } from "~/routes/services/search/review";
import NameCell from "../Common/NameCell";
import StatusCell from "../Common/StatusCell";

type ReviewTableProps = {
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLimit: React.Dispatch<SetStateAction<Limit>>;
  limit: Limit;
  reviews: [] | APIReview[];
  columns: Column[];
  data: ReviewSearchData;
  sort: {
    field: string;
    direction: string;
  };
  setSort: React.Dispatch<SetStateAction<ReviewTableProps["sort"]>>;
  visibleReviews: APIReview[];
  page: number;
  totalItems: any;
  totalPages: any;
  setPage: React.Dispatch<SetStateAction<number>>;
};

export default function ReviewTable({
  query,
  handleQueryChange,
  setLimit,
  limit,
  reviews,
  columns,
  data,
  sort,
  setSort,
  visibleReviews,
  page,
  totalItems,
  totalPages,
  setPage,
}: ReviewTableProps) {
  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <div className="">
        <GlobalFilter
          query={query}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
          limit={limit}
          hideFinished={false}
          setHideFinished={null}
        />
        {reviews.length > 0 ? (
          <div className="m-4 overflow-x-scroll" role="group">
            <table
              role="grid"
              aria-describedby="caption"
              id="review-grid"
              aria-colcount={columns.length}
              aria-rowcount={data?.totalReviews || -1}
            >
              <Caption
                caption="Your bottle reviews"
                info="Each row represents a bottle you've reviewed. The first column
                        is the bottle name. Subsequent columns show the details for each
                        reviews"
              />
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.field}
                      scope="col"
                      role="columnheader"
                      // aria-colindex={index + 1}
                      className={`border-1 border-gray-100 bg-blue-500 px-4 py-6 text-left text-sm uppercase text-white first-of-type:sticky first-of-type:left-0 first-of-type:z-10 first-of-type:min-w-[300px]`}
                    >
                      <div className="flex items-center justify-between">
                        <div>{column.header}</div>
                        <div className="flex flex-col">
                          <button
                            onClick={() =>
                              setSort({ field: column.field, direction: "asc" })
                            }
                            className={
                              sort.field === column.field &&
                              sort.direction === "asc"
                                ? "-mb-1 text-white"
                                : "-mb-1 text-blue-300"
                            }
                          >
                            ▲
                          </button>
                          <button
                            onClick={() =>
                              setSort({
                                field: column.field,
                                direction: "desc",
                              })
                            }
                            className={
                              sort.field === column.field &&
                              sort.direction === "desc"
                                ? "-mt-1 text-white"
                                : "-mt-1 text-blue-300"
                            }
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    role="row"
                    className="group h-12 hover:bg-gray-200"
                  >
                    <NameCell
                      value={review.bottle?.name}
                      batch={review.bottle?.batch}
                      barrel={review.bottle?.barrel}
                    />
                    <td className="mx-2 whitespace-nowrap px-4">
                      {new Date(review.date!).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <StatusCell status={review.bottle?.status!} />
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.bottle?.type}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.bottle?.distiller}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.bottle?.producer}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.bottle?.alcoholPercent}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.bottle?.proof}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.bottle?.price}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.value}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {review.overallRating}
                    </td>
                    <td>
                      <Link to={`/reviews/${review.id}/comments`}>
                        <ExternalLink />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="m-8 h-20 p-4">
            <Link to="/reviews/new/bottle" className="flex text-blue-500">
              <div className="flex items-center">
                <p className="text-xl">Add your first review</p>{" "}
              </div>
              <div className="mx-2 flex items-center">
                <RightArrowCircle />
              </div>
            </Link>
          </div>
        )}
        <Pagination
          page={page}
          totalPages={data?.totalPages || 0}
          totalItems={data?.totalReviews || 0}
          onFirst={() => setPage(0)}
          onLast={() => setPage(data?.totalPages || 0)}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
