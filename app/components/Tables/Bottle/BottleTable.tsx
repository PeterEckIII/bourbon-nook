import type {
  Column,
  TableData,
  Sort,
  GridBottle,
  APIBottle,
} from "~/utils/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent, SetStateAction } from "react";
import type { Limit } from "~/utils/types";
import useDebounce from "~/utils/useDebounce";
import { useTypedFetcher } from "remix-typedjson";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import Caption from "../Common/Caption";
import Body from "../Common/Body/Body";
import Head from "../Common/Head";
import Table from "../Common/Table";
import { Link, useFetcher } from "@remix-run/react";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import { BottleSearchData } from "~/routes/services/search/bottle";
import NameCell from "../Common/NameCell";
import StatusCell from "../Common/StatusCell";

type BottleTableProps = {
  query: string;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setLimit: React.Dispatch<SetStateAction<Limit>>;
  limit: Limit;
  optionToHide: boolean;
  hideFinished: boolean;
  setHideFinished: React.Dispatch<SetStateAction<boolean>>;
  bottles: [] | APIBottle[];
  columns: Column[];
  data: BottleSearchData;
  sort: {
    field: string;
    direction: string;
  };
  setSort: React.Dispatch<SetStateAction<BottleTableProps["sort"]>>;
  visibleBottles: APIBottle[];
  page: number;
  totalItems: any;
  totalPages: any;
  setPage: React.Dispatch<SetStateAction<number>>;
};

export default function BottleTable({
  query,
  handleQueryChange,
  setLimit,
  limit,
  optionToHide,
  hideFinished,
  setHideFinished,
  bottles,
  columns,
  data,
  sort,
  setSort,
  visibleBottles,
  page,
  totalItems,
  totalPages,
  setPage,
}: BottleTableProps) {
  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <div className="">
        <GlobalFilter
          query={query}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
          limit={limit}
          optionToHide
          hideFinished={hideFinished}
          setHideFinished={setHideFinished}
        />
        {bottles.length > 0 ? (
          <div className="m-4 overflow-x-scroll" role="group">
            <table
              role="grid"
              aria-describedby="caption"
              id="bottle-grid"
              aria-colcount={columns.length}
              aria-rowcount={data?.totalBottles || -1}
            >
              <Caption
                caption="Bottles in your collection"
                info="Each row represents a bottle in your collection. The first column
              is the bottle name. Subsequent columns show the details for each
              bottle"
              />
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.field}
                      scope="col"
                      role="columnheader"
                      // aria-colindex={index + 1}
                      className={`border-1 border-gray-100 bg-blue-500 px-4 py-6 text-left text-sm uppercase text-white first-of-type:sticky first-of-type:left-0 first-of-type:z-10 first-of-type:min-w-[300px]`}
                    >
                      <div className="flex items-center justify-between">
                        <div>{column.header}</div>
                        <div className="flex flex-col">
                          <button
                            onClick={() =>
                              setSort({ field: column.field, direction: "asc" })
                            }
                            className={
                              sort.field === column.field &&
                              sort.direction === "asc"
                                ? "-mb-1 text-white"
                                : "-mb-1 text-blue-300"
                            }
                          >
                            ▲
                          </button>
                          <button
                            onClick={() =>
                              setSort({
                                field: column.field,
                                direction: "desc",
                              })
                            }
                            className={
                              sort.field === column.field &&
                              sort.direction === "desc"
                                ? "-mt-1 text-white"
                                : "-mt-1 text-blue-300"
                            }
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleBottles.map((bottle) => (
                  <tr key={bottle.id} className="h-12">
                    <NameCell
                      value={bottle.name}
                      batch={bottle.batch}
                      barrel={bottle.barrel}
                    />
                    <StatusCell status={bottle.status} />
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.type}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.distiller}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.producer}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      ${bottle.price}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.alcoholPercent}%
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.proof}pf
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.country}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.region}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.color}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.finishing}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          page={page}
          totalItems={data?.totalBottles || 0}
          totalPages={data?.totalPages || 0}
          onFirst={() => setPage(0)}
          onLast={() => setPage(data?.totalPages || 0)}
          setPage={(nextPage) => setPage(nextPage)}
        />
      </div>
    </div>
  );
}
