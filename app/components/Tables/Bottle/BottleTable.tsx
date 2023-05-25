import type { Column, TableData, Sort, GridBottle } from "~/utils/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { Limit } from "~/utils/types";
import useDebounce from "~/utils/useDebounce";
import { useTypedFetcher } from "remix-typedjson";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import Caption from "../Common/Caption";
import Body from "../Common/Body/Body";
import Head from "../Common/Head";
import Table from "../Common/Table";
import { Link } from "@remix-run/react";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";

export default function BottleTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState<Limit>(10);
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [sort, setSort] = useState<Sort>({
    field: "name",
    direction: "asc",
  });

  const [ableToBeTabbedTo, setAbleToBeTabbedTo] = useState(false);
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    const tableContainer = tableRef?.current;
    let scrollable =
      tableContainer?.scrollWidth! > tableContainer?.clientWidth!;
    scrollable ? setAbleToBeTabbedTo(true) : setAbleToBeTabbedTo(false);
  }, []);

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

  const { data, load } = useTypedFetcher<TableData<GridBottle[]>>();
  const items = useMemo(() => {
    return data?.items || [];
  }, [data]);

  const totalBottles = data?.totalItems || 0;
  const totalPages = data?.totalPages || 0;

  const getInitialData = useCallback(() => {
    load(`/services/search/bottle/fetch?page=0&limit=${limit}`);
  }, [load, limit]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const reloadData = useCallback(() => {
    load(
      `/services/search/bottle/fetch?page=${currentPage}&query=${searchTerm}&limit=${limit}&sort=${sort.field}&direction=${sort.direction}`
    );
  }, [load, limit, currentPage, searchTerm, sort.field, sort.direction]);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const onFirst = () => setCurrentPage(0);
  const onLast = () => setCurrentPage(totalPages - 1);
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSortingChange = (field: Sort["field"]) => {
    setSort((prevSort) => ({
      field: field,
      direction:
        prevSort.direction === "asc" && prevSort.field === field
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="flex flex-col">
      <>
        <GlobalFilter
          query={query}
          limit={limit}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
        />
        {items.length > 0 ? (
          <Table
            tabIndex={ableToBeTabbedTo ? 0 : undefined}
            columns={columns}
            totalItems={totalBottles}
            tableRef={tableRef}
          >
            <Caption
              caption="Bottles in your collection"
              info="Each row represents a bottle in your collection. The first column
              is the bottle name. Subsequent columns show the details for each
              bottle"
              ableToBeTabbedTo={ableToBeTabbedTo}
            />
            <Head
              columns={columns}
              sort={true}
              handleSortingChange={handleSortingChange}
            />
            <Body items={items} />
          </Table>
        ) : (
          <div className="m-8 h-20 p-4">
            <Link to="/bottles/new/bottle" className="flex text-blue-500">
              <div className="flex items-center">
                <p className="text-xl">Add your first bottle</p>{" "}
              </div>
              <div className="mx-2 flex items-center">
                <RightArrowCircle />
              </div>
            </Link>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalItems={totalBottles}
          totalPages={totalPages}
          onFirst={onFirst}
          onLast={onLast}
          setCurrentPage={setCurrentPage}
        />
      </>
    </div>
  );
}
