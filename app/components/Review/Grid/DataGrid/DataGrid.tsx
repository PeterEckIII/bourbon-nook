import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import ImageRenderer from "../ImageRenderer/ImageRenderer";
import RatingRenderer from "../RatingRenderer/RatingRenderer";
import LinkRenderer from "../LinkRenderer/LinkRenderer";
import PriceRenderer from "../PriceRenderer/PriceRenderer";
import ABVRenderer from "~/components/Review/Grid/ABVRenderer/ABVRenderer";
import ProofRenderer from "../ProofRenderer/ProofRenderer";
import AddIcon from "~/components/Icons/AddIcon";
import { Link } from "@remix-run/react";

type NumberParserParams = {
  newValue: string;
};

const numberParser = (params: NumberParserParams) => {
  const newValue = params.newValue;
  let valueAsNumber;
  if (newValue === null || newValue === undefined || newValue === "") {
    valueAsNumber = null;
  } else {
    valueAsNumber = parseFloat(params.newValue);
  }
  return valueAsNumber;
};

// function nameGetter(params: ValueGetterParams) {
//   if (!params.data) return `loading...`;
//   return {
//     name: params.data.name,
//     imageUrl: params.data.imageUrl,
//   };
// }

export default function DataGrid({ initialData }: any) {
  // const grid = useRef<AgGridReactType>(null);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [records, setRecords] = useState<number>(0);
  const [rowData, setRowData] = useState(initialData);
  // const [columnDefs, setColumnDefs] = useState<ColDef[]>([
  //   {
  //     field: "name",
  //     minWidth: 300,
  //     maxWidth: 350,
  //     lockPosition: "left",
  //     valueGetter: nameGetter,
  //     cellRenderer: ImageRenderer,
  //     cellStyle: { display: "flex" },
  //     filter: "agTextColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     getQuickFilterText: (params) => params.value,
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //     tooltipComponent: NameTooltip,
  //     tooltipField: "name",
  //   },
  //   {
  //     field: "date",
  //     sort: "desc",
  //     minWidth: 130,
  //     maxWidth: 130,
  //     cellStyle: {
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //       fontWeight: 500,
  //     },
  //     filter: "agDateColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "type",
  //     minWidth: 150,
  //     maxWidth: 150,
  //     cellStyle: {
  //       display: "flex",
  //       // justifyContent: "center",
  //       alignItems: "center",
  //       fontWeight: "500",
  //     },
  //     filter: "agTextColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     getQuickFilterText: (params) => params.value,
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "price",
  //     minWidth: 97,
  //     maxWidth: 100,
  //     cellStyle: {
  //       display: "flex",
  //       alignItems: "center",
  //     },
  //     filter: "agNumberColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     cellRenderer: PriceRenderer,
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     headerName: "ABV",
  //     field: "alcoholPercent",
  //     minWidth: 92,
  //     maxWidth: 92,
  //     cellRenderer: ABVRenderer,
  //     cellStyle: {
  //       display: "flex",
  //       alignItems: "center",
  //     },
  //     filter: "agNumberColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "proof",
  //     minWidth: 107,
  //     maxWidth: 110,
  //     cellStyle: {
  //       display: "flex",
  //       alignItems: "center",
  //     },
  //     cellRenderer: ProofRenderer,
  //     filter: "agNumberColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "age",
  //     minWidth: 115,
  //     maxWidth: 120,
  //     cellStyle: {
  //       display: "flex",
  //       alignItems: "center",
  //       fontWeight: 500,
  //     },
  //     filter: "agNumberColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "distillery",
  //     minWidth: 100,
  //     maxWidth: 110,
  //     cellStyle: {
  //       display: "flex",
  //       alignItems: "center",
  //     },
  //     filter: "agTextColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     getQuickFilterText: (params) => params.value,
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "producer",
  //     minWidth: 100,
  //     maxWidth: 110,
  //     cellStyle: {
  //       display: "flex",
  //       alignItems: "center",
  //     },
  //     filter: "agTextColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     getQuickFilterText: (params) => params.value,
  //     icons: {
  //       menu: `
  //         <div class="text-xs">
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "value",
  //     valueParser: numberParser,
  //     cellRenderer: RatingRenderer,
  //     minWidth: 100,
  //     maxWidth: 100,
  //     cellStyle: {
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     },
  //     filter: "agNumberColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     icons: {
  //       menu: `
  //         <div>
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     field: "rating",
  //     valueParser: numberParser,
  //     cellRenderer: RatingRenderer,
  //     minWidth: 105,
  //     maxWidth: 105,
  //     cellStyle: {
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     },
  //     filter: "agNumberColumnFilter",
  //     filterParams: {
  //       buttons: ["apply", "reset"],
  //       closeOnApply: true,
  //     },
  //     icons: {
  //       menu: `
  //         <div>
  //           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 text-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  //             <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
  //           </svg>
  //         </div>
  //       `,
  //     },
  //   },
  //   {
  //     headerName: "Link",
  //     field: "reviewId",
  //     minWidth: 80,
  //     maxWidth: 80,
  //     cellRenderer: LinkRenderer,
  //     cellStyle: {
  //       display: "flex",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     },
  //     sortable: false,
  //     filter: false,
  //   },
  // ]);

  // const onFilterTextBoxChanged = useCallback(() => {
  //   grid!.current!.api.setQuickFilter(
  //     (document!.getElementById("filter-text-box") as HTMLInputElement).value
  //   );
  // }, []);

  // const defaultColDef = useMemo(
  //   () => ({
  //     resizable: true,
  //     sortable: true,
  //     filter: true,
  //   }),
  //   []
  // );

  // const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
  //   grid!.current!.api.sizeColumnsToFit();
  // }, []);

  // const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
  //   let gridWidth = document!.getElementById("grid-wrapper")
  //     ?.offsetWidth as number;
  //   let columnsToShow = [];
  //   let columnsToHide = [];
  //   let defaultColumnWidth = 350 + 105 + 80;

  //   let allColumns = grid.current?.columnApi.getColumns();
  //   if (allColumns && allColumns.length > 0) {
  //     for (let i = 0; i < allColumns.length; i++) {
  //       let column = allColumns[i];
  //       if (
  //         column.getColId() === "name" ||
  //         column.getColId() === "rating" ||
  //         column.getColId() === "reviewId"
  //       ) {
  //         columnsToShow.push(column);
  //       } else {
  //         defaultColumnWidth += column.getMinWidth() || 0;
  //         if (defaultColumnWidth > gridWidth) {
  //           columnsToHide.push(column.getColId());
  //         } else {
  //           columnsToShow.push(column.getColId());
  //         }
  //       }
  //     }
  //   }

  //   grid!.current!.columnApi.setColumnsVisible(columnsToShow, true);
  //   grid!.current!.columnApi.setColumnsVisible(columnsToHide, false);
  //   grid!.current!.api.sizeColumnsToFit();
  // }, []);

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   params.api.sizeColumnsToFit();
  //   params.api.refreshCells();
  // }, []);

  // useEffect(() => {
  //   setRecords(initialData.length);
  // }, [initialData]);

  return (
    <div className="mt-4 w-full rounded-lg bg-white px-4 pt-2 pb-8">
      <section id="grid-wrapper" className="mb-2">
        <div className="relative flex flex-col">
          <div className="absolute top-8 right-4 text-blue-500">
            <Link to="/reviews/new/bottle" className="">
              <AddIcon
                classes="inline filter hover:translate-y-[1px] hover:translate-x-[1px] hover:text-blue-600 "
                height={75}
                width={75}
              />
            </Link>
          </div>
          <h3 className="text-xl font-bold text-blue-700">My Reviews</h3>
          <div className="my-4 w-3/4 p-4 pl-0">
            {/* <input
              type="text"
              onInput={onFilterTextBoxChanged}
              id="filter-text-box"
              placeholder={`Filter ${records} ${
                records === 0 || records > 1 ? `records` : `record`
              }`}
              className="w-[100%] rounded-md border-2 border-blue-300 p-2 outline-blue-900 sm:w-[50%] md:w-[40%] lg:w-[25%]"
            /> */}
            <div className="ml-1 pt-2 italic text-blue-400">
              Filter all column data
            </div>
          </div>
        </div>
        <div className="ag-theme-alpine" style={gridStyle}>
          {/* <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            ref={grid}
            defaultColDef={defaultColDef}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
            onGridReady={onGridReady}
            animateRows={true}
            rowSelection="multiple"
            rowHeight={100}
            rowModelType="clientSide"
          /> */}
        </div>
      </section>
    </div>
  );
}
