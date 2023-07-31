import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { BottleSearchData } from "../services/search/bottle";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "~/utils/useDebounce";
import Pagination from "~/components/Tables/Common/Pagination/Pagination";
import type { Column, Limit } from "~/utils/types";
import { useTypedFetcher } from "remix-typedjson";
import GlobalFilter from "~/components/Tables/Common/GlobalFilter";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import Caption from "~/components/Tables/Common/Caption";
import NameCell from "~/components/Tables/Common/NameCell";
import StatusCell from "~/components/Tables/Common/StatusCell";
import BottleTable from "~/components/Tables/Bottle";
import SkeletonTable from "~/components/Skeleton/SkeletonTable";

export default function BottleIndexPage() {
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [limit, setLimit] = useState<Limit>(10);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    field: "name",
    direction: "asc",
  });
  const [hideFinishedStatus, setHideFinishedStatus] = useState(false);

  const columns: Column[] = useMemo(
    () => [
      {
        kind: "bottle",
        header: "Name",
        field: "name",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Status",
        field: "status",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Type",
        field: "type",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Distiller",
        field: "distiller",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Producer",
        field: "producer",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Price",
        field: "price",
        sort: true,
      },
      {
        kind: "bottle",
        header: "ABV",
        field: "alcoholPercent",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Proof",
        field: "proof",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Country",
        field: "country",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Region",
        field: "region",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Color",
        field: "color",
        sort: false,
      },
      {
        kind: "bottle",
        header: "Finishing",
        field: "finishing",
        sort: false,
      },
      {
        kind: "bottle",
        header: "Size",
        field: "size",
        sort: false,
      },
    ],
    []
  );

  const { load, data } = useTypedFetcher<BottleSearchData>();

  const bottles = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const loadBottles = useCallback(() => {
    load(`/services/search/bottle?query=&limit=${limit}&page=0`);
  }, [load, limit]);

  useEffect(() => {
    loadBottles();
  }, [loadBottles]);

  const reloadBottles = useCallback(() => {
    load(
      `/services/search/bottle?query=${searchTerm}&limit=${limit}&page=${page}&sort=${sort.field}&direction=${sort.direction}`
    );
  }, [load, searchTerm, limit, page, sort]);

  useEffect(() => {
    reloadBottles();
  }, [reloadBottles]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const visibleBottles = hideFinishedStatus
    ? bottles.filter((b) => b.status !== "FINISHED")
    : bottles;

  return (
    <>
      {visibleBottles.length < 1 ? (
        <SkeletonTable numRows={5} columns={columns} />
      ) : (
        <BottleTable
          query={query}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
          limit={limit}
          optionToHide
          hideFinished={hideFinishedStatus}
          setHideFinished={setHideFinishedStatus}
          bottles={bottles}
          columns={columns}
          data={data}
          sort={sort}
          setSort={setSort}
          visibleBottles={visibleBottles}
          page={page}
          totalItems={data?.totalBottles || 0}
          totalPages={data?.totalPages || 0}
          setPage={setPage}
        />
      )}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown error";

  if (typeof error !== "undefined" && error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh...</h1>
      <p>Something went wrong</p>
      <p>{errorMessage}</p>
    </div>
  );
}
