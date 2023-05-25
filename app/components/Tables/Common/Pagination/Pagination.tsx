type PaginationProps = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  setCurrentPage: (nextPage: number) => void;
  onFirst: () => void;
  onLast: () => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  totalPages,
  onFirst,
  onLast,
  setCurrentPage,
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
          className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
          onClick={() => onFirst()}
          disabled={currentPage === 0}
          aria-disabled={currentPage === 0}
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
              disabled={currentPage === index}
              aria-disabled={currentPage === index}
            >
              {index + 1}
            </button>
          ))}
        <button
          onClick={() => onLast()}
          className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages}
        >
          &#62;&#62;
        </button>
      </div>
      <div className="mx-2 my-1 bg-gray-100 p-4 text-gray-700">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
}
