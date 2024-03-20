interface PageCountProps {
  pageIndex: number;
  getPageCount: () => number;
}

export default function PageCount({ pageIndex, getPageCount }: PageCountProps) {
  return (
    <div className="">
      Page {pageIndex + 1} of {getPageCount().toLocaleString()}
    </div>
  );
}
