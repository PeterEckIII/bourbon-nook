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
import ReviewTable from "~/components/Tables/Review";
import SkeletonTable from "~/components/Skeleton/SkeletonTable";

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
    <>
      {reviews.length < 1 ? (
        <SkeletonTable numRows={5} columns={columns} />
      ) : (
        <ReviewTable
          query={query}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
          limit={limit}
          reviews={reviews}
          columns={columns}
          data={data}
          sort={sort}
          setSort={setSort}
          visibleReviews={reviews}
          page={page}
          totalItems={data?.totalReviews || 0}
          totalPages={data?.totalPages || 0}
          setPage={setPage}
        />
      )}
    </>
  );
}
