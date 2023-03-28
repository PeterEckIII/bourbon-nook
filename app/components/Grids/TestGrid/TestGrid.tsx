import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useTypedFetcher } from "remix-typedjson";
import Spinner from "~/components/Icons/Spinner";
import type { GridBottle } from "~/models/bottle.server";
import type {
  BottleSearchData,
  Column,
  Limit,
} from "~/routes/services/search/bottle/fetch";
import type {} from "./NewTestGrid";
import useDebounce from "~/utils/useDebounce";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import Table from "../Common/Table";
import FilterArrows from "~/components/Icons/FilterArrows";
import FilterArrowUp from "~/components/Icons/FilterArrowUp";
import FilterArrowDown from "~/components/Icons/FilterArrowDown";

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
  const searchTerm = useDebounce(query, 300);

  const columns: Column[] = useMemo(
    () => [
      {
        header: "Name",
        field: "name",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Status",
        field: "status",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Type",
        field: "type",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Distiller",
        field: "distiller",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Producer",
        field: "producer",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Price",
        field: "price",
        sort: false,
        sortDirection: "desc",
      },
      {
        header: "Barrel #",
        field: "batch",
        sort: false,
        sortDirection: "desc",
      },
      {
        header: "ABV",
        field: "alcoholPercent",
        sort: false,
        sortDirection: "desc",
      },
      {
        header: "Proof",
        field: "proof",
        sort: false,
        sortDirection: "desc",
      },
      {
        header: "Country",
        field: "country",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Region",
        field: "region",
        sort: true,
        sortDirection: "desc",
      },
      {
        header: "Color",
        field: "color",
        sort: false,
        sortDirection: "desc",
      },
      {
        header: "Finishing",
        field: "finishing",
        sort: false,
        sortDirection: "desc",
      },
      {
        header: "Size",
        field: "size",
        sort: false,
        sortDirection: "desc",
      },
    ],
    []
  );

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

  return (
    <div className="">
      <div className="flex flex-col">
        <GlobalFilter
          query={query}
          limit={limit}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
        />
        <div>
          <div className="overflow-x-scroll">
            <table className="w-full border-collapse">
              <caption className="sr-only table-caption">
                Bottles in your collection <br />
                <span>
                  Each row represents a bottle in your collection. The first
                  column is the bottle name. Subsequent columns show the details
                  for each bottle
                </span>
              </caption>
              <thead className="border-b-2 border-blue-500">
                <tr className="overflow-hidden border-b-2 text-gray-700">
                  {columns.map((column, index) => {
                    return column.sort ? (
                      <th
                        scope="col"
                        key={column.field}
                        onClick={() =>
                          handleSortingChange(column.field as SortFields)
                        }
                        className="border-b-2 text-left text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
                      >
                        <div className="flex resize justify-between overflow-auto">
                          <div>{column.header}</div>
                          <div className="mr-4">
                            {column.sort &&
                            column.field === sortField &&
                            sortDirection === "asc" ? (
                              <FilterArrowUp />
                            ) : column.field === sortField &&
                              sortDirection === "desc" ? (
                              <FilterArrowDown />
                            ) : (
                              <FilterArrows />
                            )}
                          </div>
                        </div>
                      </th>
                    ) : (
                      <th
                        scope="col"
                        key={column.field}
                        className="border-b-2 text-left text-gray-700 first-of-type:sticky first-of-type:left-0 first-of-type:w-[300px] first-of-type:min-w-[300px] first-of-type:bg-white"
                      >
                        <div className="flex resize-x justify-between overflow-auto">
                          <div>{column.header}</div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {items.map((bottle, index) => (
                  <tr key={bottle.id} className="mx-2 h-[50px] overflow-hidden">
                    <th
                      scope="row"
                      className="sticky left-0 z-50 w-[300px] min-w-[300px] bg-white p-4 text-left"
                    >
                      {bottle.name}
                    </th>
                    <td className="w-[115px] min-w-[115px]">
                      <span
                        className={
                          bottle.status === "OPENED"
                            ? "rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-left text-green-700 "
                            : bottle.status === "CLOSED"
                            ? "rounded-lg bg-yellow-500 bg-opacity-60 p-2 px-2 py-1 text-left text-yellow-700 "
                            : bottle.status === "FINISHED"
                            ? "rounded-lg bg-gray-300 bg-opacity-60 p-2 px-2 py-1 text-left text-gray-700 "
                            : "rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-left text-green-700 "
                        }
                      >
                        {bottle.status}
                      </span>
                    </td>
                    <td className="mx-4 w-[100px] min-w-[100px] p-2 text-left">
                      {bottle.type}
                    </td>
                    <td className="mx-4 w-[200px] min-w-[200px] p-2 text-left">
                      {bottle.distiller}
                    </td>
                    <td className="mx-4 w-[200px] min-w-[200px] p-2 text-left">
                      {bottle.producer}
                    </td>
                    <td className="mx-4 w-[50px] min-w-[50px] p-2 text-right ">
                      ${bottle.price}
                    </td>
                    <td className="mx-4 w-[100px] min-w-[100px] p-2 text-left">
                      {bottle.batch}
                    </td>
                    <td className="mx-4 w-[65px] min-w-[65px] p-2 text-right">
                      {bottle.alcoholPercent}%
                    </td>
                    <td className="mx-4 w-[65px] min-w-[65px] p-2 text-right">
                      {bottle.proof}pf
                    </td>
                    <td className="mx-4 w-[90px] min-w-[90px] p-2 text-left">
                      {bottle.country}
                    </td>
                    <td className="mx-4 w-[100px] min-w-[100px] p-2 text-left">
                      {bottle.region}
                    </td>
                    <td className="mx-4 w-[85px] min-w-[85px] p-2 text-left">
                      {bottle.color}
                    </td>
                    <td className="mx-4 w-[150px] min-w-[150px] whitespace-nowrap p-2 text-left">
                      {bottle.finishing}
                    </td>
                    <td className="mx-4 w-[65px] min-w-[65px] p-2 text-right">
                      {bottle.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-4 mx-4 flex justify-between justify-self-end border-t-2 border-b-2 border-gray-400 pt-2">
          <div className="flex items-center">
            <span className="mx-2 my-2 rounded-lg bg-gray-100 p-4 text-gray-700">
              Total Results: {totalItems}
            </span>
          </div>
          <div className="flex items-center">
            <button
              className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
              onClick={() => onFirst()}
            >
              &#60;&#60;
            </button>
            {Array(totalPages)
              .fill(totalPages)
              .map((_, index) => (
                <button
                  className={
                    currentPage === index
                      ? "mx-2 my-1 rounded bg-blue-500 p-4 font-bold text-gray-50 hover:bg-blue-700"
                      : "mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
                  }
                  key={index}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </button>
              ))}
            <button
              onClick={() => onLast()}
              className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
            >
              &#62;&#62;
            </button>
          </div>
          <div className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}
