type SkeletonFilterProps = {};

export default function SkeletonFilter({}: SkeletonFilterProps) {
  return (
    <div className="mx-2 my-8 flex max-w-[1200px] flex-col">
      <div className="flex justify-between border-blue-500">
        <div className="flex w-4/12 items-center border-b py-2">
          <span className="mx-2 inline">Search</span>
          <div className="mx-2 flex h-2 w-9/12 animate-pulse flex-row items-center justify-center gap-2 rounded-full bg-gray-300 p-2 shadow-lg" />
        </div>
        <div className="flex w-3/12 items-center justify-center">
          <span className="inline">Results per page:</span>
          <div className="mx-2 flex h-2 w-9/12 animate-pulse flex-row items-center justify-center gap-2 rounded-full bg-gray-300 p-2 shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}
