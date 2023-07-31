type SkeletonPaginationProps = {};

export default function SkeletonPagination({}: SkeletonPaginationProps) {
  return (
    <div className="mx-4 my-4 flex justify-between justify-self-end border-b-2 border-t-2 border-gray-400 pt-2">
      <div className="flex items-center">
        Total:{" "}
        <span className="mx-2 my-1 w-[50px] animate-pulse bg-gray-100 p-4 text-gray-700"></span>
      </div>
      <div className="flex items-center">
        <button className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100 ">
          &#60;&#60;
        </button>
        <div className="mx-2 my-1 h-[85%] animate-pulse rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"></div>
        <button className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100">
          &#62;&#62;
        </button>
      </div>
      <div className="flex items-center">
        Page{" "}
        <span className="mx-2 my-1 w-[50px] animate-pulse bg-gray-100 p-4 text-gray-700"></span>
      </div>
    </div>
  );
}
