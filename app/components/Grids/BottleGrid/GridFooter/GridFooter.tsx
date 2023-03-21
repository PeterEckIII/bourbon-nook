import type { Pagination } from "@table-library/react-table-library/types/pagination";
import type { Dispatch, SetStateAction } from "react";
import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { GridBottle } from "~/models/bottle.server";
import type { BottleSearchData } from "~/routes/services/search/bottle";

type GridFooterProps = {
  searchFetcher: TypedFetcherWithComponents<BottleSearchData>;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  pagination: Pagination;
  data: {
    nodes: GridBottle[] | [];
    totalPages: number;
  };
};

export default function GridFooter({
  searchFetcher,
  setPage,
  page,
  pagination,
  data,
}: GridFooterProps) {
  return (
    <div className="mt-8 flex flex-col">
      <div className="flex justify-between">
        <div className="ml-4 flex items-center text-lg">
          Total Pages: {searchFetcher?.data?.totalPages}
        </div>

        <span>
          <button
            className="mx-2 my-1 rounded bg-gray-100 p-4 hover:bg-blue-500 hover:text-gray-100 disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:bg-slate-200 disabled:text-slate-400"
            disabled={page === 0}
            onClick={() => {
              setPage(0);
              pagination.fns.onSetPage(0);
            }}
          >
            &#60;&#60;
          </button>
          {Array(data.totalPages)
            .fill(data.totalPages)
            .map((_: any, index: any) => (
              <button
                key={index}
                type="button"
                className={
                  pagination.state.page === index
                    ? "mx-2 my-1 rounded bg-blue-500 p-4 font-bold text-gray-50 hover:bg-blue-700"
                    : "mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
                }
                onClick={() => {
                  setPage(index);
                  pagination.fns.onSetPage(index);
                }}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="mx-2 my-1 rounded bg-gray-100 p-4 hover:bg-blue-500 hover:text-gray-100 disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:bg-slate-200 disabled:text-slate-400"
            disabled={page + 1 === searchFetcher?.data?.totalPages}
            onClick={() => {
              setPage(searchFetcher?.data?.totalPages - 1);
              pagination.fns.onSetPage(searchFetcher?.data?.totalPages - 1);
            }}
          >
            &#62;&#62;
          </button>
        </span>
        <div className="mr-4 flex items-center text-lg">
          Page: {page + 1} of {searchFetcher?.data?.totalPages}
        </div>
      </div>
    </div>
  );
}
