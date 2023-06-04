import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { ReviewSearchData } from "../services/search/review";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "~/utils/useDebounce";
import Pagination from "~/components/Tables/Common/Pagination/Pagination";
import type { Column, Limit } from "~/utils/types";
import { useTypedFetcher } from "remix-typedjson";
import GlobalFilter from "~/components/Tables/Common/GlobalFilter";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import Caption from "~/components/Tables/Common/Caption";
import NameCell from "~/components/Tables/Common/NameCell";
import StatusCell from "~/components/Tables/Common/StatusCell";
import ExternalLink from "~/components/Icons/ExternalLink";

export default function ReviewsRoute() {
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [limit, setLimit] = useState<Limit>(10);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    field: "name",
    direction: "asc",
  });

  const columns: Column[] = useMemo(
    () => [
      {
        kind: "review",
        header: "Name",
        field: "name",
        sort: true,
      },
      {
        kind: "review",
        header: "Date",
        field: "date",
        sort: true,
      },
      {
        kind: "review",
        header: "Bottle Status",
        field: "status",
        sort: true,
      },
      {
        kind: "review",
        header: "Type",
        field: "type",
        sort: true,
      },
      {
        kind: "review",
        header: "Distiller",
        field: "distiller",
        sort: true,
      },
      {
        kind: "review",
        header: "Producer",
        field: "producer",
        sort: true,
      },
      {
        kind: "review",
        header: "ABV",
        field: "alcoholPercent",
        sort: true,
      },
      {
        kind: "review",
        header: "Proof",
        field: "proof",
        sort: true,
      },
      {
        kind: "review",
        header: "Price",
        field: "price",
        sort: true,
      },
      {
        kind: "review",
        header: "Value",
        field: "value",
        sort: true,
      },
      {
        kind: "review",
        header: "Rating",
        field: "overallRating",
        sort: true,
      },
      {
        kind: "review",
        header: "Link",
        field: "link",
        sort: false,
      },
    ],
    []
  );

  const { data, load } = useTypedFetcher<ReviewSearchData>();
  const reviews = useMemo(() => data?.data ?? [], [data?.data]);

  const loadReviews = useCallback(() => {
    load(`/services/search/review?query=&limit=${limit}&page=0`);
  }, [load, limit]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const reloadReviews = useCallback(() => {
    load(
      `/services/search/review?query=${searchTerm}&limit=${limit}&page=${page}&sort=${sort.field}&direction=${sort.direction}`
    );
  }, [load, searchTerm, limit, page, sort]);

  useEffect(() => {
    reloadReviews();
  }, [reloadReviews]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

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
          currentPage={page}
          totalPages={data?.totalPages || 0}
          totalItems={data?.totalReviews || 0}
          onFirst={() => setPage(0)}
          onLast={() => setPage(data?.totalPages || 0)}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
}
