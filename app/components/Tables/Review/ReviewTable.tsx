import type { GridReview, Column, TableData, Sort, Limit } from "~/utils/types";
import Head from "../Common/Head";
import GlobalFilter from "../Common/GlobalFilter";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useDebounce from "~/utils/useDebounce";
import { useTypedFetcher } from "remix-typedjson";
import Table from "../Common/Table";
import Caption from "../Common/Caption";
import Body from "../Common/Body";
import { Link } from "@remix-run/react";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import Pagination from "../Common/Pagination/Pagination";

export default function ReviewTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState<Limit>(10);
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
        kind: "review",
        header: "Name",
        field: "name",
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
        header: "Date",
        field: "date",
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

  const { data, load } = useTypedFetcher<TableData<GridReview[]>>();
  const items = useMemo(() => {
    return data?.items;
  }, [data]);

  const totalReviews = data?.totalItems;
  const totalPages = data?.totalPages;

  const getInitialData = useCallback(() => {
    load(`/services/search/review/fetch?page=0&limit=${limit}`);
  }, [load, limit]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  const reloadData = useCallback(() => {
    load(
      `/services/search/review/fetch?page=${currentPage}&query=${searchTerm}&limit=${limit}&sort=${sort.field}&direction=${sort.direction}`
    );
  }, [load, limit, currentPage, searchTerm, sort.field, sort.direction]);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const onFirst = () => setCurrentPage(0);
  const onLast = () => setCurrentPage(totalPages! - 1);
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSortingChange = (field: Sort["field"]) => {
    setSort((prev) => ({
      field,
      direction:
        prev.direction === "asc" && prev.field === field ? "desc" : "asc",
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
            totalItems={totalReviews}
            tableRef={tableRef}
          >
            <Caption
              caption="Your reviews"
              info="Each row represents a review you have written. The first column is the bottle name. Subsequent columns show the details for each review"
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
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalReviews}
          onFirst={onFirst}
          onLast={onLast}
          setCurrentPage={setCurrentPage}
        />
      </>
    </div>
  );
}
