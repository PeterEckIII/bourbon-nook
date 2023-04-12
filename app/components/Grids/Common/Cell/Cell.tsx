type CellProps = {
  rowIndex: number;
  value: string | number;
};

export default function Cell({ value, rowIndex }: CellProps) {
  return <div className="py-2 px-4">{value}</div>;
}
