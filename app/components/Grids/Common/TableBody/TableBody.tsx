import type { GridBottle } from "~/models/bottle.server";

type TableBodyProps = {
  items: GridBottle[] | [];
};

export default function TableBody({ items }: TableBodyProps) {
  return (
    <tbody>
      {items.map((bottle, index) => (
        <tr key={bottle.id} className="mx-2 h-[50px] overflow-hidden">
          <th
            scope="row"
            className="sticky left-0 z-50 w-[300px] min-w-[300px] bg-white p-4 text-left"
          >
            {bottle.name}
          </th>
          <td className="w-[115px] min-w-[115px]">
            <span
              className={
                bottle.status === "OPENED"
                  ? "rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-left text-green-700 "
                  : bottle.status === "CLOSED"
                  ? "rounded-lg bg-yellow-500 bg-opacity-60 p-2 px-2 py-1 text-left text-yellow-700 "
                  : bottle.status === "FINISHED"
                  ? "rounded-lg bg-gray-300 bg-opacity-60 p-2 px-2 py-1 text-left text-gray-700 "
                  : "rounded-lg bg-green-500 bg-opacity-60 p-2 px-2 py-1 text-left text-green-700 "
              }
            >
              {bottle.status}
            </span>
          </td>
          <td className="mx-4 w-[100px] min-w-[100px] p-2 text-left">
            {bottle.type}
          </td>
          <td className="mx-4 w-[200px] min-w-[200px] p-2 text-left">
            {bottle.distiller}
          </td>
          <td className="mx-4 w-[200px] min-w-[200px] p-2 text-left">
            {bottle.producer}
          </td>
          <td className="mx-4 w-[50px] min-w-[50px] p-2 text-right ">
            ${bottle.price}
          </td>
          <td className="mx-4 w-[100px] min-w-[100px] p-2 text-left">
            {bottle.batch}
          </td>
          <td className="mx-4 w-[65px] min-w-[65px] p-2 text-right">
            {bottle.alcoholPercent}%
          </td>
          <td className="mx-4 w-[65px] min-w-[65px] p-2 text-right">
            {bottle.proof}pf
          </td>
          <td className="mx-4 w-[90px] min-w-[90px] p-2 text-left">
            {bottle.country}
          </td>
          <td className="mx-4 w-[100px] min-w-[100px] p-2 text-left">
            {bottle.region}
          </td>
          <td className="mx-4 w-[85px] min-w-[85px] p-2 text-left">
            {bottle.color}
          </td>
          <td className="mx-4 w-[150px] min-w-[150px] whitespace-nowrap p-2 text-left">
            {bottle.finishing}
          </td>
          <td className="mx-4 w-[65px] min-w-[65px] p-2 text-right">
            {bottle.size}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
