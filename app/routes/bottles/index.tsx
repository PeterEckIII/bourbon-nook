import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { BottleSearchData } from "../services/search/bottle";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "~/utils/useDebounce";
import Pagination from "~/components/Tables/Common/Pagination/Pagination";
import type { Column, Limit } from "~/utils/types";
import { useTypedFetcher } from "remix-typedjson";
import GlobalFilter from "~/components/Tables/Common/GlobalFilter";
import RightArrowCircle from "~/components/Icons/RightArrowCircle";
import Caption from "~/components/Tables/Common/Caption";
import NameCell from "~/components/Tables/Common/NameCell";
import StatusCell from "~/components/Tables/Common/StatusCell";

export default function BottleIndexPage() {
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  const [limit, setLimit] = useState<Limit>(10);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({
    field: "name",
    direction: "asc",
  });
  const [hideFinishedStatus, setHideFinishedStatus] = useState(false);

  const columns: Column[] = useMemo(
    () => [
      {
        kind: "bottle",
        header: "Name",
        field: "name",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Status",
        field: "status",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Type",
        field: "type",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Distiller",
        field: "distiller",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Producer",
        field: "producer",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Price",
        field: "price",
        sort: true,
      },
      {
        kind: "bottle",
        header: "ABV",
        field: "alcoholPercent",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Proof",
        field: "proof",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Country",
        field: "country",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Region",
        field: "region",
        sort: true,
      },
      {
        kind: "bottle",
        header: "Color",
        field: "color",
        sort: false,
      },
      {
        kind: "bottle",
        header: "Finishing",
        field: "finishing",
        sort: false,
      },
      {
        kind: "bottle",
        header: "Size",
        field: "size",
        sort: false,
      },
    ],
    []
  );

  const { load, data } = useTypedFetcher<BottleSearchData>();

  const bottles = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const loadBottles = useCallback(() => {
    load(`/services/search/bottle?query=&limit=${limit}&page=0`);
  }, [load, limit]);

  useEffect(() => {
    loadBottles();
  }, [loadBottles]);

  const reloadBottles = useCallback(() => {
    load(
      `/services/search/bottle?query=${searchTerm}&limit=${limit}&page=${page}&sort=${sort.field}&direction=${sort.direction}`
    );
  }, [load, searchTerm, limit, page, sort]);

  useEffect(() => {
    reloadBottles();
  }, [reloadBottles]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const visibleBottles = hideFinishedStatus
    ? bottles.filter((b) => b.status !== "FINISHED")
    : bottles;

  return (
    <div className="m-2 w-full rounded bg-white p-4 shadow-lg shadow-blue-700">
      <div className="">
        <GlobalFilter
          query={query}
          handleQueryChange={handleQueryChange}
          setLimit={setLimit}
          limit={limit}
          optionToHide
          hideFinished={hideFinishedStatus}
          setHideFinished={setHideFinishedStatus}
        />
        {bottles.length > 0 ? (
          <div className="m-4 overflow-x-scroll" role="group">
            <table
              role="grid"
              aria-describedby="caption"
              id="bottle-grid"
              aria-colcount={columns.length}
              aria-rowcount={data?.totalBottles || -1}
            >
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
                          <button
                            onClick={() =>
                              setSort({ field: column.field, direction: "asc" })
                            }
                            className={
                              sort.field === column.field &&
                              sort.direction === "asc"
                                ? "-mb-1 text-white"
                                : "-mb-1 text-blue-300"
                            }
                          >
                            ▲
                          </button>
                          <button
                            onClick={() =>
                              setSort({
                                field: column.field,
                                direction: "desc",
                              })
                            }
                            className={
                              sort.field === column.field &&
                              sort.direction === "desc"
                                ? "-mt-1 text-white"
                                : "-mt-1 text-blue-300"
                            }
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleBottles.map((bottle) => (
                  <tr key={bottle.id} className="h-12">
                    <NameCell
                      value={bottle.name}
                      batch={bottle.batch}
                      barrel={bottle.barrel}
                    />
                    <StatusCell status={bottle.status} />
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.type}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.distiller}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.producer}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      ${bottle.price}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.alcoholPercent}%
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.proof}pf
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.country}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.region}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.color}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.finishing}
                    </td>
                    <td className="mx-2 whitespace-nowrap px-4">
                      {bottle.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="m-8 h-20 p-4">
            <Link to="/bottles/new/bottle" className="flex text-blue-500">
              <div className="flex items-center">
                <p className="text-xl">Add your first bottle</p>{" "}
              </div>
              <div className="mx-2 flex items-center">
                <RightArrowCircle />
              </div>
            </Link>
          </div>
        )}
        <Pagination
          currentPage={page}
          totalItems={data?.totalBottles || 0}
          totalPages={data?.totalPages || 0}
          onFirst={() => setPage(0)}
          onLast={() => setPage(data?.totalPages || 0)}
          setCurrentPage={(nextPage) => setPage(nextPage)}
        />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  let errorMessage = "Unknown error";

  if (typeof error !== "undefined" && error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh...</h1>
      <p>Something went wrong</p>
      <p>{errorMessage}</p>
    </div>
  );
}
