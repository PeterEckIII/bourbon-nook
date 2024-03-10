import ChevronDoubleLeft from "../Icons/ChevronDoubleLeft";
import ChevronDoubleRight from "../Icons/ChevronDoubleRight";
import ChevronLeft from "../Icons/ChevronLeft";
import ChevronRight from "../Icons/ChevronRight";

interface PaginationProps {
  page: number;
  totalItems: number;
  totalPages: number;
  setPage: (nextPage: number) => void;
  onFirst: () => void;
  onLast: () => void;
}

export default function Pagination({
  page,
  totalItems,
  totalPages,
  setPage,
  onFirst,
  onLast,
}: PaginationProps) {
  return (
    <div className="mx-4 my-4 flex justify-between justify-self-end border-b-2 border-t-2 border-gray-400 pt-2">
      <div className="flex items-center">
        <span className="mx-2 my-2 rounded-lg bg-gray-100 p-4 text-gray-700">
          Total Results: {totalItems}
        </span>
      </div>
      <div className="flex items-center">
        <button
          className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100 disabled:cursor-not-allowed"
          onClick={() => onFirst()}
          disabled={page === 0}
          aria-disabled={page === 0}
        >
          <ChevronDoubleLeft />
        </button>
        <button
          onClick={() => setPage(page - 1)}
          className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100 disabled:cursor-not-allowed"
          disabled={page === 0}
          aria-disabled={page === 0}
        >
          <ChevronLeft />
        </button>
        {Array(totalPages)
          .fill(totalPages)
          .map((_, index) => (
            <button
              className={
                page === index
                  ? "mx-2 my-1 rounded bg-blue-500 p-4 font-bold text-gray-50 hover:bg-blue-700"
                  : "mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
              }
              key={index}
              onClick={() => setPage(index)}
              disabled={page === index}
              aria-disabled={page === index}
            >
              {index + 1}
            </button>
          ))}
        <button
          className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100 disabled:cursor-not-allowed"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1}
        >
          {" "}
          <ChevronRight />
        </button>
        <button
          onClick={() => onLast()}
          className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100 disabled:cursor-not-allowed"
          disabled={page === totalPages - 1}
        >
          <ChevronDoubleRight />
        </button>
      </div>
      <div className="mx-2 my-1 bg-gray-100 p-4 text-gray-700">
        Page {page + 1} of {totalPages}
      </div>
    </div>
  );
}
