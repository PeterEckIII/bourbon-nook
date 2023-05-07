import type { ErrorBoundaryComponent } from "@remix-run/server-runtime";
import { useCatch } from "@remix-run/react";
import BottleTable from "~/components/Tables/Bottle";
import type { BottleSearchData, Column } from "../services/search/bottle/fetch";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTypedFetcher } from "remix-typedjson";

export default function GridRoute() {
  const columns: Column[] = [
    {
      header: "Name",
      field: "name",
      sort: true,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Status",
      field: "status",
      sort: true,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Type",
      field: "type",
      sort: true,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Distiller",
      field: "distiller",
      sort: true,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Producer",
      field: "producer",
      sort: true,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Price",
      field: "price",
      sort: true,
      sortDirection: "desc",
      textPosition: "text-right",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Batch",
      field: "batch",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "ABV",
      field: "alcoholPercent",
      sort: true,
      sortDirection: "desc",
      textPosition: "text-right",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Proof",
      field: "proof",
      sort: true,
      sortDirection: "desc",
      textPosition: "text-right",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Country",
      field: "country",
      sort: true,
      sortDirection: "desc",
      textPosition: "text-right",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Region",
      field: "region",
      sort: true,
      sortDirection: "desc",
      textPosition: "text-right",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Color",
      field: "color",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Finishing",
      field: "finishing",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Size",
      field: "size",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
  ];
  const { data, load } = useTypedFetcher<BottleSearchData>();
  const items = useMemo(() => {
    return data?.items || [];
  }, [data]);

  const totalPages = data?.totalPages || 0;
  const totalBottles = data?.totalBottles || 0;

  const getInitialData = useCallback(() => {
    load(`/services/search/bottle/fetch?page=0&limit=10`);
  }, [load]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    function loadPageData() {
      load(`/services/search/bottle/fetch?page=0&limit=100`);
    }
    loadPageData();
  }, [load]);

  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <BottleTable columns={columns} items={items} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="h-[1000px] w-[500px] bg-white">
      <h1>Caught</h1>
      <p>Status: {caught.status} </p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="h-[1000px] w-[500px] bg-white">
      <h1>Error!</h1>
      <p>{error.message}</p>
      <p>Stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
};
