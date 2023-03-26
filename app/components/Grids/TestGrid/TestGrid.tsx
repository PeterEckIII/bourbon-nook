import { useCallback, useEffect, useMemo, useState } from "react";
import type { MouseEventHandler } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type { BottleSearchData } from "~/routes/services/search/bottle";
import type { GridBottle } from "~/models/bottle.server";
import useBottleCols from "~/utils/useBottleCols";
import ChevronUp from "~/components/Icons/ChevronUp";
import ChevronDown from "~/components/Icons/ChevronDown";
import { NONAME } from "dns";
import FilterArrowUp from "~/components/Icons/FilterArrowUp";
import FilterArrowDown from "~/components/Icons/FilterArrowDown";
import FilterArrows from "~/components/Icons/FilterArrows";
import Spinner from "~/components/Icons/Spinner";

type Limit = 10 | 25 | 50 | 100 | 250;
type SortState = {
  sortDirection: "none" | "ASC" | "DESC";
  accessor: string;
};

export default function TestGrid() {
  const [data, setData] = useState<GridBottle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<Limit>(10);
  const [sort, setSort] = useState<SortState>({
    sortDirection: "none",
    accessor: "",
  });

  const columns = useMemo(
    () => [
      {
        Header: "Bottle",
        accessor: "imageUrl",
        id: "image",
      },
      {
        Header: "Name",
        accessor: "name",
        id: "name",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "name" ? sort.sortDirection : "none",
      },
      {
        Header: "Status",
        accessor: "status",
        id: "status",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "status" ? sort.sortDirection : "none",
      },
      {
        Header: "Type",
        accessor: "type",
        id: "type",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "type" ? sort.sortDirection : "none",
      },
      {
        Header: "Distiller",
        accessor: "distiller",
        id: "distiller",
        canSort: true,
        sortType: "basic",
        sortDirection:
          sort.accessor === "distiller" ? sort.sortDirection : "none",
      },
      {
        Header: "Producer",
        accessor: "producer",
        id: "producer",
        canSort: true,
        sortType: "basic",
        sortDirection:
          sort.accessor === "producer" ? sort.sortDirection : "none",
      },
      {
        Header: "ABV",
        accessor: "alcoholPercent",
        id: "alcoholPercent",
        canSort: true,
        sortType: "basic",
        sortDirection:
          sort.accessor === "alcoholPercent" ? sort.sortDirection : "none",
      },
      {
        Header: "Proof",
        accessor: "proof",
        id: "proof",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "proof" ? sort.sortDirection : "none",
      },
      {
        Header: "Price",
        accessor: "price",
        id: "price",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "price" ? sort.sortDirection : "none",
      },
      {
        Header: "Age",
        accessor: "age",
        id: "age",
      },
      {
        Header: "Barrel/Batch #",
        accessor: "batch",
        id: "batch",
      },
      {
        Header: "Country",
        accessor: "country",
        id: "country",
        canSort: true,
        sortType: "basic",
        sortDirection:
          sort.accessor === "country" ? sort.sortDirection : "none",
      },
      {
        Header: "Region",
        accessor: "region",
        id: "region",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "region" ? sort.sortDirection : "none",
      },
      {
        Header: "Color",
        accessor: "color",
        id: "color",
        canSort: true,
        sortType: "basic",
        sortDirection: sort.accessor === "color" ? sort.sortDirection : "none",
      },
      {
        Header: "Finishing",
        accessor: "finishing",
        id: "finishing",
        canSort: true,
        sortType: "basic",
        sortDirection:
          sort.accessor === "finishing" ? sort.sortDirection : "none",
      },
      {
        Header: "Review",
        accessor: "reviews[0].id",
        id: "review",
      },
    ],
    [sort]
  );

  const searchFetcher = useTypedFetcher<BottleSearchData>();

  useEffect(() => {
    if (searchFetcher.type === "init") {
      setLoading(true);
      searchFetcher.load(
        `/services/search/bottle?query=&page=0&limit=${limit}`
      );
    }
    if (searchFetcher.type === "done") {
      setData(searchFetcher.data.data);
      setLoading(false);
    }
  }, [searchFetcher, limit]);

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   useTable(
  //     {
  //       data,
  //       columns,
  //     },
  //     useSortBy,
  //     usePagination
  //   );

  // const onHeaderClick = useCallback(
  //   (column: Column) => {
  //     switch (column.sortDirection) {
  //       case "none": {
  //         setLoading(true);
  //         setSort({
  //           sortDirection: "ASC",
  //           accessor: column.accessor as string,
  //         });
  //         console.log(`Sort: ${sort.sortDirection}`);
  //         console.log(`Accessor: ${sort.accessor}`);
  //         searchFetcher.load(
  //           // Add sort and field to searchFetcher return
  //           `/services/sort/bottle?query=&page=0&limit=${limit}&sort=${sort.sortDirection}&field=${sort.accessor}`
  //         );
  //         if (searchFetcher.type === "done") {
  //           setData(searchFetcher.data.data);
  //         }
  //         setLoading(false);
  //         break;
  //       }
  //       case "ASC": {
  //         setLoading(true);
  //         setSort({
  //           sortDirection: "DESC",
  //           accessor: column.accessor as string,
  //         });
  //         console.log(`Sort: ${sort.sortDirection}`);
  //         console.log(`Accessor: ${sort.accessor}`);

  //         searchFetcher.load(
  //           `/services/sort/bottle?query=&page=0&limit=${limit}&sort=${sort.sortDirection}&field=${sort.accessor}`
  //         );
  //         if (searchFetcher.type === "done") {
  //           setData(searchFetcher.data.data);
  //         }
  //         setLoading(false);
  //         break;
  //       }
  //       case "DESC": {
  //         setLoading(true);
  //         setSort({ sortDirection: "none", accessor: column.id as string });
  //         console.log(`Sort: ${sort.sortDirection}`);
  //         console.log(`Accessor: ${sort.accessor}`);
  //         searchFetcher.load(
  //           `/services/search/bottle?query=&page=0&limit=${limit}`
  //         );
  //         if (searchFetcher.type === "done") {
  //           setData(searchFetcher.data.data);
  //         }
  //         setLoading(false);
  //         break;
  //       }
  //     }
  //   },
  //   [searchFetcher, limit, sort]
  // );

  return (
    <div className="flex max-h-screen max-w-screen-xl justify-center overflow-x-scroll">
      {/* <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={a}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex justify-between">
                    <div>{column.render("Header")}</div>
                    <div></div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return loading ? (
              <Spinner />
            ) : (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, i) => (
                  <td className="px-4 py-2" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}
