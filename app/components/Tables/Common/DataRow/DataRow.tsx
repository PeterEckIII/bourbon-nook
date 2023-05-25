import type { GridBottle } from "~/utils/types";
import DataCell from "../DataCell";
import NameCell from "../NameCell";
import StatusCell from "../StatusCell";
import ProducerCell from "../ProducerCell/ProducerCell";

type DataRowProps = {
  item: GridBottle;
};

export default function DataRow({ item }: DataRowProps) {
  return (
    <tr className="group h-14 hover:bg-gray-200">
      <NameCell value={item.name} batch={item.batch} barrel={item.barrel} />
      <StatusCell status={item.status} />
      <DataCell value={item.type} />
      <ProducerCell value={item.distiller} />
      <ProducerCell value={item.producer} />
      <DataCell value={`$${item.price}`} />
      <DataCell value={`${item.alcoholPercent}%`} />
      <DataCell value={`${item.proof}pf`} />
      <DataCell value={item.country} />
      <DataCell value={item.region} />
      <DataCell value={item.color} />
      <DataCell value={item.finishing} />
      <DataCell value={item.size} />
    </tr>
  );
}
