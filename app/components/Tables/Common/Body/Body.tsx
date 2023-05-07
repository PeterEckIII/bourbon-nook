import type { GridBottle } from "~/utils/types";
import NameCell from "../NameCell";
import StatusCell from "../StatusCell";

type BodyProps = {
  items: GridBottle[] | [];
};

export default function Body({ items }: BodyProps) {
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item.id} className="h-12">
          <NameCell value={item.name} batch={item.batch} barrel={item.barrel} />
          <StatusCell status={item.status} />
          <td className="mx-2 whitespace-nowrap px-4">{item.type}</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.distiller}</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.producer}</td>
          <td className="mx-2 whitespace-nowrap px-4">${item.price}</td>
          <td className="mx-2 whitespace-nowrap px-4">
            {item.alcoholPercent}%
          </td>
          <td className="mx-2 whitespace-nowrap px-4">{item.proof}pf</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.country}</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.region}</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.color}</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.finishing}</td>
          <td className="mx-2 whitespace-nowrap px-4">{item.size}</td>
        </tr>
      ))}
    </tbody>
  );
}
