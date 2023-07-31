import Caption from "../Tables/Common/Caption";
import type { Column } from "~/utils/types";
import SkeletonFilter from "./SkeletonFilter";
import SkeletonPagination from "./SkeletonPagination";

type SkeletonTableProps = {
  numRows: number;
  columns: Column[];
};

export default function SkeletonTable({
  numRows,
  columns,
}: SkeletonTableProps) {
  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <div>
        <SkeletonFilter />
        <div className="m-4 overflow-x-scroll" role="group">
          <table role="grid" aria-describedby="caption" id="bottle-grid">
            <Caption
              caption="Bottles in your collection"
              info="Each row represents a bottle in your collection. The first column
              is the bottle name. Subsequent columns show the details for each
              bottle"
            />
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    scope="col"
                    role="columnheader"
                    // aria-colindex={index + 1}
                    className={`border-1 border-gray-100 bg-blue-500 px-4 py-6 text-left text-sm uppercase text-white first-of-type:sticky first-of-type:left-0 first-of-type:z-10 first-of-type:min-w-[300px]`}
                  >
                    <div className="flex items-center justify-between">
                      <div>{column.header}</div>
                      <div className="flex flex-col">
                        <button>▲</button>
                        <button>▼</button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(numRows)
                .fill(0)
                .map((bottle, index) => (
                  <tr className="h-12 border-b" key={index}>
                    {Array(columns.length)
                      .fill(0)
                      .map((c, index) => {
                        return (
                          <td key={index}>
                            <div className="mx-2 flex h-2 w-9/12 animate-pulse flex-row items-center justify-center gap-2 rounded-full bg-gray-300 p-2 shadow-lg">
                              {bottle.name}
                            </div>
                          </td>
                        );
                      })}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <SkeletonPagination />
      </div>
    </div>
  );
}
