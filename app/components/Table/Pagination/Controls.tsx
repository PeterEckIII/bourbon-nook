interface ControlsProps {
  setPageIndex: (pageNum: number) => void;
  getCanPreviousPage: () => boolean;
  previousPage: () => void;
  getCanNextPage: () => boolean;
  nextPage: () => void;
  getPageCount: () => number;
  pageIndex: number;
}

export default function Controls({
  setPageIndex,
  getCanPreviousPage,
  previousPage,
  getCanNextPage,
  nextPage,
  getPageCount,
  pageIndex,
}: ControlsProps) {
  return (
    <div className="">
      <button
        className="p-4 m-2 bg-gray-300 rounded text-gray-900 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
        onClick={() => setPageIndex(0)}
        disabled={!getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="p-4 m-2 bg-gray-300 rounded text-gray-900 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
      >
        {"<"}
      </button>

      {Array(getPageCount())
        .fill(getPageCount())
        .map((page, index) => (
          <button
            key={page}
            className={
              pageIndex === index
                ? "p-4 m-2 bg-blue-500 rounded text-gray-50 hover:bg-blue-700"
                : "p-4 m-2 bg-gray-300 rounded text-gray-900 hover:bg-blue-500 hover:text-white"
            }
            onClick={() => setPageIndex(index)}
          >
            {index + 1}
          </button>
        ))}

      <button
        className="p-4 m-2 bg-gray-300 rounded text-gray-900 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="p-4 m-2 bg-gray-300 rounded text-gray-900 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed"
        onClick={() => setPageIndex(getPageCount())}
        disabled={!getCanNextPage()}
      >
        {">>"}
      </button>
    </div>
  );
}
