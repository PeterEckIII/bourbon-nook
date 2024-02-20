import { flexRender, type Table } from "@tanstack/react-table";

interface TableProps<T> {
  table: Table<T>;
}

export default function GenericTable<T>({ table }: TableProps<T>) {
  return (
    <table
      className="table w-full border-collapse overflow-x-auto"
      aria-labelledby="caption"
    >
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} scope="col" className="p-2 text-left">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="odd:bg-gray-50 bg-gray-200 hover:bg-blue-200"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-4 py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
