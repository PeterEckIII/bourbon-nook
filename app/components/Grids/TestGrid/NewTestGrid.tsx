import { useCallback, useEffect, useMemo, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import Spinner from "~/components/Icons/Spinner";
import type { GridBottle } from "~/models/bottle.server";
import type { BottleSearchData } from "~/routes/services/search/bottle";

type Limit = 10 | 25 | 50 | 75 | 100 | 250;

type Data = {
  bottles: GridBottle[] | [];
  totalPages: number;
};

export default function Table() {
  const [data, setData] = useState<Data>({
    bottles: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<Limit>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const searchFetcher = useTypedFetcher<BottleSearchData>();

  const columns = useMemo(
    () => [
      {
        header: "Name",
        field: "name",
      },
      {
        header: "Status",
        field: "status",
      },
      {
        header: "Type",
        field: "type",
      },
      {
        header: "Distiller",
        field: "distiller",
      },
      {
        header: "Producer",
        field: "producer",
      },
      {
        header: "Price",
        field: "price",
      },
      {
        header: "Barrel #",
        field: "batch",
      },
      {
        header: "ABV",
        field: "alcoholPercent",
      },
      {
        header: "Proof",
        field: "proof",
      },
      {
        header: "Country",
        field: "country",
      },
      {
        header: "Region",
        field: "region",
      },
      {
        header: "Color",
        field: "color",
      },
      {
        header: "Finishing",
        field: "finishing",
      },
      {
        header: "Size",
        field: "size",
      },
    ],
    []
  );

  const onPaginationChange = useCallback(
    (page: number) => {
      setLoading(true);
      searchFetcher.load(
        `/services/search/bottle?query=&page=${page}&limit=${limit}`
      );
      if (searchFetcher.type == "done") {
        setData({
          bottles: searchFetcher.data.data,
          totalPages: searchFetcher.data.totalPages,
        });
      }
      setLoading(false);
    },
    [limit, searchFetcher]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const firstPage = () => {
    setCurrentPage(0);
    onPaginationChange(0);
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    if (searchFetcher.type === "init") {
      searchFetcher.load(
        `/services/search/bottle?query=&page=${currentPage}&limit=${limit}`
      );
    }
    if (searchFetcher.type === "done") {
      setData({
        bottles: searchFetcher.data.data,
        totalPages: searchFetcher.data.totalPages,
      });
    }
    setLoading(false);
  }, [searchFetcher, limit, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex min-h-[500px] flex-col">
      <div></div>
      <div>
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
              {data.bottles.map((item, index) => (
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
      <div className="my-4 mx-4 flex justify-between justify-self-end border-t-2 border-b-2 border-gray-400 pt-2">
        <div className="flex items-center">
          <span className="mx-2 my-2 rounded-lg bg-gray-100 p-4 text-gray-700">
            Total Pages: {searchFetcher?.data?.totalPages}
          </span>
        </div>
        <div>
          <span>
            <button
              className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
              onClick={firstPage}
            >
              &#60;&#60;
            </button>
            {Array(data.totalPages)
              .fill(data.totalPages)
              .map((_, index) => (
                <button
                  className={
                    currentPage === index
                      ? "mx-2 my-1 rounded bg-blue-500 p-4 font-bold text-gray-50 hover:bg-blue-700"
                      : "mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
                  }
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    onPaginationChange(index);
                  }}
                >
                  {index + 1}
                </button>
              ))}
            <button
              className="mx-2 my-1 rounded bg-gray-100 p-4 text-gray-700 hover:bg-blue-500 hover:text-gray-100"
              onClick={() => {
                handlePageChange(data.totalPages - 1);
                onPaginationChange(data.totalPages - 1);
              }}
            >
              &#62;&#62;
            </button>
          </span>
        </div>
        <div className="flex items-center">
          <span className="mx-2 my-2 rounded-lg bg-gray-100 p-4 text-gray-700">
            Page {currentPage + 1} of {searchFetcher?.data?.totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}

/*
const columnDefs: (
    | BottleColumn
    | BottleColumn<"imageUrl">
    | BottleColumn<"name">
    | BottleColumn<"status">
    | BottleColumn<"type">
    | BottleColumn<"distiller">
    | BottleColumn<"producer">
    | BottleColumn<"country">
    | BottleColumn<"region">
    | BottleColumn<"price">
    | BottleColumn<"age">
    | BottleColumn<"year">
    | BottleColumn<"batch">
    | BottleColumn<"alcoholPercent">
    | BottleColumn<"proof">
    | BottleColumn<"color">
    | BottleColumn<"finishing">
    | BottleColumn<"reviews">
  )[] = useMemo(
    () => [
      columnHelper.accessor("imageUrl", {
        id: "imageUrl",
        header: "Bottle",
        cell: (cell) => cell.getValue(),
      }) as BottleColumn<"imageUrl">,
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
      }) as BottleColumn<"status">,
      columnHelper.accessor("type", {
        id: "type",
        header: "Type",
      }) as BottleColumn<"type">,
      columnHelper.accessor("distiller", {
        id: "distiller",
        header: "Distiller",
      }) as BottleColumn<"distiller">,
      columnHelper.accessor("producer", {
        id: "producer",
        header: "Producer",
      }) as BottleColumn<"producer">,
      columnHelper.accessor("price", {
        id: "price",
        header: "Price",
      }) as BottleColumn<"price">,
      columnHelper.accessor("alcoholPercent", {
        id: "alcoholPercent",
        header: "ABV",
      }) as BottleColumn<"alcoholPercent">,
      columnHelper.accessor("proof", {
        id: "proof",
        header: "Proof",
      }) as BottleColumn<"proof">,
      columnHelper.accessor("batch", {
        id: "batch",
        header: "Barrel #",
      }) as BottleColumn<"batch">,
      columnHelper.accessor("country", {
        id: "country",
        header: "Country",
      }) as BottleColumn<"country">,
      columnHelper.accessor("region", {
        id: "region",
        header: "Region",
      }) as BottleColumn<"region">,
      columnHelper.accessor("age", {
        id: "age",
        header: "Age",
      }) as BottleColumn<"age">,
      columnHelper.accessor("year", {
        id: "year",
        header: "Year",
      }) as BottleColumn<"year">,
      columnHelper.accessor("color", {
        id: "color",
        header: "Color",
      }) as BottleColumn<"color">,
      columnHelper.accessor("finishing", {
        id: "finishing",
        header: "Finishing",
      }) as BottleColumn<"finishing">,
      columnHelper.accessor("reviews", {
        id: "reviews",
        header: "Review",
        cell: (cellProps) => {
          const val = cellProps.getValue();
          return (
            <div>
              <ExternalLink />
            </div>
          );
        },
      }) as BottleColumn<"reviews">,
    ],
    [columnHelper]
  );

*/

// export type BottleColumn<T extends keyof GridBottle | undefined = undefined> =
//   ColumnDef<
//     GridBottle,
//     T extends keyof GridBottle ? GridBottle[T] : GridBottle
//   >;
