import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type {
  BottleSearchData,
  Column,
  Limit,
} from "~/routes/services/search/bottle/fetch";
import type {} from "./NewTestGrid";
import useDebounce from "~/utils/useDebounce";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import BottleTable from "../BottleTable/BottleTable";

export type SortDirection = "asc" | "desc";
export type SortFields =
  | "name"
  | "status"
  | "type"
  | "distiller"
  | "producer"
  | "country"
  | "region";

export default function Grid() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<Limit>(10);
  const [query, setQuery] = useState<string>("");
  const [sortField, setSortField] = useState<SortFields>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [tableHeight, setTableHeight] = useState<string | number>("auto");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const searchTerm = useDebounce(query, 300);

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
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Barrel #",
      field: "batch",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "ABV",
      field: "alcoholPercent",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Proof",
      field: "proof",
      sort: false,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Country",
      field: "country",
      sort: true,
      sortDirection: "desc",
      ref: useRef<HTMLTableCellElement | null>(null),
    },
    {
      header: "Region",
      field: "region",
      sort: true,
      sortDirection: "desc",
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
  const totalItems = data?.totalBottles || 0;

  const getInitialData = useCallback(() => {
    load(`/services/search/bottle/fetch?page=0&limit=${limit}`);
  }, [load, limit]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    function loadPageData() {
      load(
        `/services/search/bottle/fetch?query=${searchTerm}&page=${currentPage}&limit=${limit}&sort=${sortField}&direction=${sortDirection}`
      );
    }
    loadPageData();
  }, [load, currentPage, limit, searchTerm, sortField, sortDirection]);

  useEffect(() => {
    const offsetHeight = tableRef.current?.offsetHeight;
    if (offsetHeight) {
      setTableHeight(offsetHeight);
    }
  }, []);

  const onFirst = () => setCurrentPage(0);
  const onLast = () => setCurrentPage(totalPages - 1);
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSortingChange = (field: SortFields) => {
    const sortOrder =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(sortOrder);
  };
  const mouseDown = (index: number) => setActiveIndex(index);

  return (
    <div className="">
      <div className="flex flex-col">
        <GlobalFilter
          query={query}
          limit={limit}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
        />
        <BottleTable
          columns={columns}
          items={items}
          sortField={sortField}
          sortDirection={sortDirection}
          tableHeight={tableHeight}
          activeIndex={activeIndex}
          handleSortingChange={handleSortingChange}
          mouseDown={mouseDown}
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
  );
}
