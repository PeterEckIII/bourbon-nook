import { useEffect, useMemo, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type { GridBottle } from "~/models/bottle.server";
import type { BottleSearchData } from "~/routes/services/search/bottle";
import Spinner from "../Icons/Spinner";
import Pagination from "./Pagination/Pagination";

export type Data = {
  items: GridBottle[] | [];
  totalBottles: number;
  totalPages: number;
};

export default function BottleTable() {
  const [data, setData] = useState<Data>({
    items: [],
    totalBottles: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<10 | 25 | 50 | 100 | 200>(10);
  const [page, setPage] = useState(0);

  const searchFetcher = useTypedFetcher<BottleSearchData>();

  const columns = useMemo(
    () => [
      {
        header: "Name",
        field: "name",
      },
      {
        header: "Status",
        field: "status",
      },
      {
        header: "Type",
        field: "type",
      },
      {
        header: "Distiller",
        field: "distiller",
      },
      {
        header: "Producer",
        field: "producer",
      },
      {
        header: "Price",
        field: "price",
      },
      {
        header: "Barrel #",
        field: "batch",
      },
      {
        header: "ABV",
        field: "alcoholPercent",
      },
      {
        header: "Proof",
        field: "proof",
      },
      {
        header: "Country",
        field: "country",
      },
      {
        header: "Region",
        field: "region",
      },
      {
        header: "Color",
        field: "color",
      },
      {
        header: "Finishing",
        field: "finishing",
      },
      {
        header: "Size",
        field: "size",
      },
    ],
    []
  );

  useEffect(() => {
    setLoading(true);
    if (searchFetcher.type === "init") {
      searchFetcher.load(
        `/services/search/bottle?query=${query}&page=0&limit=${limit}`
      );
    }
    if (searchFetcher.type === "done") {
      setData({
        items: searchFetcher.data.data,
        totalBottles: searchFetcher.data.totalBottles,
        totalPages: searchFetcher.data.totalPages,
      });
      setLoading(false);
    }
  }, [searchFetcher, query, limit]);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center overflow-x-scroll"
      role="grid"
      aria-rowcount={limit}
      aria-colcount={columns.length}
    >
      <div></div>
      <div>
        <table className="table min-w-[1000px]">
          <thead>
            <tr
              className="bg-gray-200 text-gray-700"
              role="rowheader"
              aria-rowindex={1}
            >
              {columns.map((column, index) => (
                <th
                  className="border-b-2 border-blue-500 text-left"
                  key={column.field}
                  role="columnheader"
                  // aria-sort="" // THIS COMES LATER
                  // aria-selected="" THIS COMES LATER
                  aria-colindex={index}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <>
              {data.items.map((item, index) => (
                <tr key={item.name} role="row" aria-rowindex={index}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <td role="gridcell" aria-colindex={1}>
                        {item.name}
                      </td>
                      <td role="gridcell" aria-colindex={2}>
                        {item.status}
                      </td>
                      <td role="gridcell" aria-colindex={3}>
                        {item.type}
                      </td>
                      <td role="gridcell" aria-colindex={4}>
                        {item.distiller}
                      </td>
                      <td role="gridcell" aria-colindex={5}>
                        {item.producer}
                      </td>
                      <td role="gridcell" aria-colindex={6}>
                        {item.price}
                      </td>
                      <td role="gridcell" aria-colindex={7}>
                        {item.batch}
                      </td>
                      <td role="gridcell" aria-colindex={8}>
                        {item.alcoholPercent}
                      </td>
                      <td role="gridcell" aria-colindex={9}>
                        {item.proof}
                      </td>
                      <td role="gridcell" aria-colindex={10}>
                        {item.country}
                      </td>
                      <td role="gridcell" aria-colindex={11}>
                        {item.region}
                      </td>
                      <td role="gridcell" aria-colindex={12}>
                        {item.color}
                      </td>
                      <td role="gridcell" aria-colindex={13}>
                        {item.finishing}
                      </td>
                      <td role="gridcell" aria-colindex={14}>
                        {item.size}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
      <div className="my-8 flex justify-between">
        <div>Total Pages: {data.totalPages}</div>
        <div>
          {/* <Pagination
            searchFetcher={searchFetcher}
            setData={setData}
            totalCount={searchFetcher.data?.totalBottles ?? 0}
            siblingCount={2}
            currentPage={page}
            query={query}
            limit={limit}
            onPageChange={(page) => setPage(page)}
          /> */}
        </div>
        <div>
          Page {page} of {data.totalPages}
        </div>
      </div>
    </div>
  );
}
