import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import type { LoaderFunction } from "@remix-run/server-runtime";
import { requireUserId } from "~/session.server";
import { getReviewsForTable } from "~/models/review.server";
import type { SortDirection, SortFields } from "~/routes/bottles/index";
import DataGrid from "~/components/Review/Grid/DataGrid";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useDebounce from "~/utils/useDebounce";
import type {
  SortableColumn,
  UnsortableColumn,
  ReviewSortOptions,
} from "../services/search/review/fetch";
import { useTypedFetcher } from "remix-typedjson";
import type { ReviewSearchData } from "../services/search/review/fetch";
import Filter from "~/components/Grids/Common/GlobalFilter/GlobalFilter";
import Pagination from "~/components/Grids/Common/Pagination/Pagination";
import type { Limit } from "../services/search/review/fetch";
import ReviewTable from "~/components/Grids/ReviewTable";

type Column = SortableColumn | UnsortableColumn;

export default function ReviewIndexPage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<Limit>(10);
  const [query, setQuery] = useState<string>("");
  const [sortField, setSortField] = useState<ReviewSortOptions>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [tableHeight, setTableHeight] = useState<string | number>("auto");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const searchTerm = useDebounce(query, 300);

  const columns: Column[] = [
    {
      kind: "sortable",
      header: "Name",
      field: "name",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Date",
      field: "date",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Status",
      field: "status",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Type",
      field: "type",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Distiller",
      field: "distiller",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Producer",
      field: "producer",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "unsortable",
      header: "ABV",
      field: "alcoholPercent",
      sort: false,
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "unsortable",
      header: "Proof",
      field: "proof",
      sort: false,
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "unsortable",
      header: "Age",
      field: "age",
      sort: false,
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Price",
      field: "price",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Value",
      field: "value",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "sortable",
      header: "Rating",
      field: "overallRating",
      sort: true,
      sortDirection: "asc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      kind: "unsortable",
      header: "Review",
      field: "id",
      sort: false,
      ref: useRef<HTMLTableCellElement | null>(null),
    },
  ];

  const { data, load } = useTypedFetcher<ReviewSearchData>();
  const items = useMemo(() => {
    return data?.items || [];
  }, [data]);

  const totalPages = data?.totalPages || 0;
  const totalItems = data?.totalReviews || 0;

  const getInitialData = useCallback(() => {
    load(`/services/search/review/fetch?page=0&limit=${limit}`);
  }, [load, limit]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    function loadPageData() {
      load(
        `/services/search/review/fetch?query=${searchTerm}&page=${currentPage}&limit=${limit}&sort=${sortField}&direction=${sortDirection}`
      );
    }
    loadPageData();
  }, [load, currentPage, limit, searchTerm, sortField, sortDirection]);

  const onFirst = () => setCurrentPage(0);
  const onLast = () => setCurrentPage(totalPages - 1);
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);
  const handleSortingChange = (field: ReviewSortOptions) => {
    const sortOrder =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(sortOrder);
  };

  return (
    <div className="w-full">
      <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
        <div className="flex flex-col">
          <Filter
            query={query}
            limit={limit}
            handleQueryChange={handleQueryChange}
            setLimit={setLimit}
          />
          <ReviewTable
            columns={columns}
            items={items}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSortingChange={handleSortingChange}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            totalPages={totalPages}
            onFirst={onFirst}
            onLast={onLast}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
