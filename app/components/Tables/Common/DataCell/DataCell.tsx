type DataCellProps = {
  value: any;
};

export default function DataCell({ value }: DataCellProps) {
  return (
    <td className="ml-2 min-w-[125px] whitespace-nowrap px-4 text-center group-hover:text-gray-700">
      {value}
    </td>
  );
}
