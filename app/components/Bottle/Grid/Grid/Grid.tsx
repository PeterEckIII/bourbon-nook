import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  GridSizeChangedEvent,
  ValueGetterParams,
} from "ag-grid-community";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LinkRenderer from "~/components/Review/Grid/LinkRenderer";
import StatusPill from "../StatusPill";
import PriceRenderer from "~/components/Review/Grid/PriceRenderer";
import ABVRenderer from "~/components/Review/Grid/ABVRenderer";
import ProofRenderer from "~/components/Review/Grid/ProofRenderer";

export default function Grid({ initialData }: any) {
  const [records, setRecords] = useState<number>(0);
  const [rowData, setRowData] = useState(initialData);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const grid = useRef<AgGridReactType>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "name",
      minWidth: 300,
      maxWidth: 350,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      lockPosition: "left",
      pinned: "left",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    // {
    //   header: "Date Added"
    //   field: "date",
    //   sort: "desc",
    //   minWidth: 130,
    //   maxWidth: 130,
    //   cellStyle: {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     fontWeight: 500,
    //   },
    //   filter: "agDateColumnFilter",
    //   filterParams: {
    //     buttons: ["apply", "reset"],
    //     closeOnApply: true,
    //   },
    //   getQuickFilterText: (params) => params.value,
    // },
    {
      field: "status",
      minWidth: 115,
      maxWidth: 115,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      filter: "agTextColumnFilter",
      // TODO: Create custom filter
      cellRenderer: StatusPill,
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "type",
      minWidth: 150,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        fontWeight: "500",
      },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "price",
      minWidth: 97,
      maxWidth: 100,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      filter: "agNumberColumnFilter",
      cellRenderer: PriceRenderer,
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "age",
      minWidth: 97,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "distiller",
      minWidth: 123,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "producer",
      minWidth: 123,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      headerName: "ABV",
      minWidth: 92,
      field: "alcoholPercent",
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      cellRenderer: ABVRenderer,
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "proof",
      minWidth: 107,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      cellRenderer: ProofRenderer,
      filter: "agNumberColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
    },

    {
      field: "country",
      minWidth: 124,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "region",
      minWidth: 124,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },
    {
      field: "batch",
      minWidth: 105,
      cellStyle: { display: "flex", alignItems: "center" },
      filter: "agTextColumnFilter",
      filterParams: {
        buttons: ["apply", "reset"],
        closeOnApply: true,
      },
      getQuickFilterText: (params) => params.value,
    },

    {
      headerName: "Review",
      field: "reviewId",
      minWidth: 100,
      cellRenderer: LinkRenderer,
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      sortable: false,
      filter: false,
    },
  ]);

  const onFilterTextBoxChanged = useCallback(() => {
    grid!.current!.api.setQuickFilter(
      (document!.getElementById("bottle-filter-text-box") as HTMLInputElement)
        .value
    );
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    grid!.current!.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
    params.api.refreshCells();
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );

  useEffect(() => {
    setRecords(initialData.length);
  }, [initialData]);

  return (
    <div className="mt-4 w-full rounded-lg bg-white px-4 pt-2 pb-8">
      <section id="bottle-grid-wrapper" className="mb-2">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-blue-700">My Collection</h3>
          <div className="my-4 w-3/4 p-4 pl-0">
            <input
              type="text"
              onInput={onFilterTextBoxChanged}
              id="bottle-filter-text-box"
              placeholder={`Filter ${records} ${
                records === 0 || records > 1 ? `records` : `record`
              }`}
              className="w-full rounded-md border-2 border-blue-300 p-2 outline-blue-900 sm:w-[50%] md:w-[40%] lg:w-[25%]"
            />
          </div>
        </div>
        <div className="ag-theme-alpine" style={gridStyle}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            ref={grid}
            defaultColDef={defaultColDef}
            onFirstDataRendered={onFirstDataRendered}
            onGridReady={onGridReady}
            animateRows={true}
            rowSelection="multiple"
            rowHeight={70}
            rowModelType="clientSide"
            suppressMenuHide={true}
          />
        </div>
      </section>
    </div>
  );
}
