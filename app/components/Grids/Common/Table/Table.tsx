import Spinner from "~/components/Icons/Spinner";
import type { GridBottle } from "~/models/bottle.server";
import type { Column } from "../../TestGrid/NewTestGrid";

type TableProps = {
  columns: Column[];
  data: GridBottle[] | [];
  loading: boolean;
};

export default function Table({ columns, data, loading }: TableProps) {
  return (
    <div>
      <div className="overflow-x-scroll">
        <table className="table min-w-[1000px]">
          <thead>
            <tr
              className="bg-gray-200 text-gray-700"
              role="rowheader"
              aria-rowindex={1}
            >
              {columns.map((column, index) => (
                <th
                  className="border-b-2 border-blue-500 text-left"
                  key={column.field}
                  role="columnheader"
                  aria-colindex={index}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <>
              {data.map((item, index) => (
                <tr key={item.name} role="row" aria-rowindex={index}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <td role="gridcell" aria-colindex={1}>
                        {item.name}
                      </td>
                      <td role="gridcell" aria-colindex={2}>
                        {item.status}
                      </td>
                      <td role="gridcell" aria-colindex={3}>
                        {item.type}
                      </td>
                      <td role="gridcell" aria-colindex={4}>
                        {item.distiller}
                      </td>
                      <td role="gridcell" aria-colindex={5}>
                        {item.producer}
                      </td>
                      <td role="gridcell" aria-colindex={6}>
                        {item.price}
                      </td>
                      <td role="gridcell" aria-colindex={7}>
                        {item.batch}
                      </td>
                      <td role="gridcell" aria-colindex={8}>
                        {item.alcoholPercent}
                      </td>
                      <td role="gridcell" aria-colindex={9}>
                        {item.proof}
                      </td>
                      <td role="gridcell" aria-colindex={10}>
                        {item.country}
                      </td>
                      <td role="gridcell" aria-colindex={11}>
                        {item.region}
                      </td>
                      <td role="gridcell" aria-colindex={12}>
                        {item.color}
                      </td>
                      <td role="gridcell" aria-colindex={13}>
                        {item.finishing}
                      </td>
                      <td role="gridcell" aria-colindex={14}>
                        {item.size}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
}
