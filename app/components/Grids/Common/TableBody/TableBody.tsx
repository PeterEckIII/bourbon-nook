import type { GridBottle } from "~/models/bottle.server";

type TableBodyProps = {
  items: GridBottle[] | [];
};

export default function TableBody({ items }: TableBodyProps) {
  return (
    <tbody role="presentation">
      {items.map((bottle, index) => (
        <tr
          key={bottle.id}
          className="mx-2 h-[50px] overflow-hidden"
          role="row"
          aria-rowindex={index + 2}
        >
          <td
            role="gridcell"
            aria-colindex={1}
            className="sticky left-0 z-50 w-[300px] min-w-[300px] bg-white p-4 text-left"
            id={index === 0 ? "firstCell" : ""}
          >
            {bottle.name}
          </td>
          <td
            role="gridcell"
            className="w-[115px] min-w-[115px]"
            aria-colindex={2}
          >
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
          <td
            role="gridcell"
            className="mx-4 w-[100px] min-w-[100px] p-2 text-left"
            aria-colindex={3}
          >
            {bottle.type}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[200px] min-w-[200px] p-2 text-left"
            aria-colindex={4}
          >
            {bottle.distiller}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[200px] min-w-[200px] p-2 text-left"
            aria-colindex={5}
          >
            {bottle.producer}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[50px] min-w-[50px] p-2 text-right"
            aria-colindex={6}
          >
            ${bottle.price}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[100px] min-w-[100px] p-2 text-right"
            aria-colindex={7}
          >
            {bottle.batch}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[65px] min-w-[65px] p-2 text-right"
            aria-colindex={8}
          >
            {bottle.alcoholPercent}%
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[65px] min-w-[65px] p-2 text-right"
            aria-colindex={9}
          >
            {bottle.proof}pf
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[90px] min-w-[90px] p-2 text-center"
            aria-colindex={10}
          >
            {bottle.country}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[100px] min-w-[100px] p-2 text-center"
            aria-colindex={11}
          >
            {bottle.region}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[85px] min-w-[85px] p-2 text-left"
            aria-colindex={12}
          >
            {bottle.color}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[150px] min-w-[150px] whitespace-nowrap p-2 text-left"
            aria-colindex={13}
          >
            {bottle.finishing}
          </td>
          <td
            role="gridcell"
            className="mx-4 w-[65px] min-w-[65px] p-2 text-right"
            aria-colindex={14}
          >
            {bottle.size}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
