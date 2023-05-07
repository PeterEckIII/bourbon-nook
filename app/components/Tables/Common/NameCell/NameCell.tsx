type NameCellProps = {
  value: any;
  batch: any;
  barrel: any;
};

export default function NameCell({ value, batch, barrel }: NameCellProps) {
  return (
    <th
      scope="row"
      className="sticky left-0 z-10 min-w-[300px] whitespace-nowrap bg-white pl-2 text-left group-hover:bg-gray-200 group-hover:text-gray-700"
    >
      {value}
      {(batch || barrel) && " - "}{" "}
      <span className="text-xs font-normal">
        {batch ? `Batch ${batch}` : barrel ? `# ${barrel}` : ``}
      </span>
    </th>
  );
}
