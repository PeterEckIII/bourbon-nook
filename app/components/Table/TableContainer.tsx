import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import ActionBar from "./ActionBar";
import Table from "./Table";
import Tabs, { TabOption } from "./Tabs";

interface TableContainerProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  tabOptions: TabOption[];
}

export default function TableContainer<T extends object>({
  columns,
  data,
  tabOptions,
}: TableContainerProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col shadow-lg p-4 rounded m-4 bg-gray-100">
      <Tabs tabOptions={tabOptions} />
      <ActionBar />
      <div className="overflow-x-scroll">
        <Table<T> table={table} />
      </div>
    </div>
  );
}
