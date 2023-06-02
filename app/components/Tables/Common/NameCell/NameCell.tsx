type NameCellProps = {
  value: any;
  batch: any;
  barrel: any;
};

export default function NameCell({ value, batch, barrel }: NameCellProps) {
  const showBarrel =
    !batch &&
    barrel !== "N/A" &&
    barrel !== "n/a" &&
    barrel !== "None" &&
    barrel !== "none" &&
    barrel !== null &&
    barrel !== "";
  const showBatch =
    !barrel &&
    batch !== "N/A" &&
    batch !== "n/a" &&
    batch !== "None" &&
    batch !== "none" &&
    batch !== null &&
    batch !== "";

  return (
    <th
      scope="row"
      className="sticky left-0 z-10 min-w-[300px] whitespace-nowrap bg-white pl-2 text-left group-hover:bg-gray-200 group-hover:text-gray-700"
    >
      {value}
      {(batch || barrel) && " - "}{" "}
      <span className="text-xs font-normal">
        {showBarrel && `Barrel ${barrel}`}
        {showBatch && `Batch ${batch}`}
      </span>
    </th>
  );
}
