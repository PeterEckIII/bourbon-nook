import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { useTypedFetcher } from "remix-typedjson";
import Spinner from "~/components/Icons/Spinner";
import type { GridBottle } from "~/models/bottle.server";
import type { BottleSearchData } from "~/routes/services/search/bottle/fetch";
import type { Column, Limit } from "./NewTestGrid";
import useDebounce from "~/utils/useDebounce";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import Table from "../Common/Table";

export default function Grid() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<Limit>(10);
  const [query, setQuery] = useState<string>("");
  const searchTerm = useDebounce(query, 300);

  const columns: Column[] = useMemo(
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

  const { data, load } = useTypedFetcher<BottleSearchData>();
  const items = useMemo(() => {
    return data?.items || [];
  }, [data]);

  const totalPages = data?.totalPages || 0;

  const getInitialData = useCallback(() => {
    load(`/services/search/bottle/fetch?page=0&limit=${limit}`);
  }, [load, limit]);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  useEffect(() => {
    function loadPageData() {
      load(
        `/services/search/bottle/fetch?query=${searchTerm}&page=${currentPage}&limit=${limit}`
      );
    }
    loadPageData();
  }, [load, currentPage, limit, searchTerm]);

  const onFirst = () => setCurrentPage(0);
  const onLast = () => setCurrentPage(totalPages - 1);
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <div className="flex flex-col">
        <GlobalFilter
          query={query}
          limit={limit}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
        />
        <div>
          <table>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={column.field}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((bottle, index) => (
                <tr key={bottle.id}>
                  <td>{bottle.name}</td>
                  <td>{bottle.status}</td>
                  <td>{bottle.type}</td>
                  <td>{bottle.distiller}</td>
                  <td>{bottle.producer}</td>
                  <td>{bottle.price}</td>
                  <td>{bottle.batch}</td>
                  <td>{bottle.alcoholPercent}</td>
                  <td>{bottle.proof}</td>
                  <td>{bottle.country}</td>
                  <td>{bottle.region}</td>
                  <td>{bottle.color}</td>
                  <td>{bottle.finishing}</td>
                  <td>{bottle.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          <div>Total Pages: {totalPages}</div>
          <div>
            <button onClick={() => onFirst()}>&#60;&#60;</button>
            {Array(totalPages)
              .fill(totalPages)
              .map((_, index) => (
                <button
                  className="rounded border-2 border-black px-2 py-1"
                  key={index}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </button>
              ))}
            <button onClick={() => onLast()}>&#62;&#62;</button>
          </div>
          <div>
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}
