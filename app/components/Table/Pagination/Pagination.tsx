import Controls from "./Controls";
import PageCount from "./PageCount";
import TotalResults from "./TotalResults";

interface PaginationProps {
  resultsShown: number;
  itemCount: number;
  setPageIndex: (pageNum: number) => void;
  getCanPreviousPage: () => boolean;
  previousPage: () => void;
  getCanNextPage: () => boolean;
  nextPage: () => void;
  getPageCount: () => number;
  pageIndex: number;
}

export default function Pagination({
  resultsShown,
  itemCount,
  setPageIndex,
  getCanPreviousPage,
  previousPage,
  getCanNextPage,
  nextPage,
  getPageCount,
  pageIndex,
}: PaginationProps) {
  return (
    <div className="flex sm:flex-row justify-between flex-col w-full mt-8 items-center gap-2 text-xs">
      <TotalResults resultsShown={resultsShown} itemCount={itemCount} />
      <Controls
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        getCanPreviousPage={getCanPreviousPage}
        previousPage={previousPage}
        getCanNextPage={getCanNextPage}
        nextPage={nextPage}
        getPageCount={getPageCount}
      />
      <PageCount pageIndex={pageIndex} getPageCount={getPageCount} />
    </div>
  );
}
