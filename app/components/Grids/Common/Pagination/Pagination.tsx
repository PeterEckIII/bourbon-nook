import type { TypedFetcherWithComponents } from "remix-typedjson";
import type { BottleSearchData } from "~/routes/services/search/bottle";

type PaginationProps = {
  searchData: TypedFetcherWithComponents<BottleSearchData>["data"];
  firstPage: () => void;
  currentPage: number;
  setCurrentPage: (nextPage: number) => void;
  onPaginationChange: (nextPage: number) => void;
  handlePageChange: (nextPage: number) => void;
};

export default function Pagination({
  searchData,
  firstPage,
  currentPage,
  setCurrentPage,
  onPaginationChange,
  handlePageChange,
}: PaginationProps) {
  return (
    <div className="my-4 mx-4 flex justify-between justify-self-end border-t-2 border-b-2 border-gray-400 pt-2">
      <div className="flex items-center">
        <span className="mx-2 my-2 rounded-lg bg-gray-100 p-4 text-gray-700">
          Total Pages: {searchData?.totalPages}
        </span>
        {/*  */}
      </div>
      <div>
        <span>
          <button
            className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
            onClick={firstPage}
          >
            &#60;&#60;
          </button>
          {Array(searchData?.totalPages)
            .fill(searchData?.totalPages)
            .map((_, index) => (
              <button
                className={
                  currentPage === index
                    ? "mx-2 my-1 rounded bg-blue-500 p-4 font-bold text-gray-50 hover:bg-blue-700"
                    : "mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
                }
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  onPaginationChange(index);
                }}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
            onClick={() => {
              handlePageChange(searchData?.totalPages - 1);
              onPaginationChange(searchData?.totalPages - 1);
            }}
          >
            &#62;&#62;
          </button>
        </span>
      </div>
      <div className="flex items-center">
        <span className="mx-2 my-2 rounded-lg bg-gray-100 p-4 text-gray-700">
          Page {currentPage + 1} of {searchData?.totalPages}
        </span>
      </div>
    </div>
  );
}
