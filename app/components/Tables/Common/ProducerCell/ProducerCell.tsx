type ProducerCellProps = {
  value: string | null;
};

export default function ProducerCell({ value }: ProducerCellProps) {
  return (
    <td className="ml-2 min-w-[140px] whitespace-nowrap px-4 text-center group-hover:text-gray-700">
      {value}
    </td>
  );
}
