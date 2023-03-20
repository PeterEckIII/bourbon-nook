import { ChangeEvent, useEffect } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useCallback, useState } from "react";
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  useCustom,
} from "@table-library/react-table-library";
import { useTypedFetcher } from "remix-typedjson";
import type { BottleSearchData } from "~/routes/services/search/bottle";
import type { GridBottle } from "~/models/bottle.server";
import { usePagination } from "@table-library/react-table-library/pagination";
import type {
  Action,
  State,
  Column,
} from "@table-library/react-table-library/types";
import { Link, useSearchParams } from "@remix-run/react";
import useDebounce from "~/utils/useDebounce";
import { Switch, Transition } from "@headlessui/react";
import ExternalLink from "~/components/Icons/ExternalLink";
import { useTheme } from "@table-library/react-table-library/theme";

type Data = {
  nodes: GridBottle[] | [];
  totalPages: number;
};

function formatImage(imageUrl: string) {
  const startIndex = imageUrl.indexOf(`/v`);
  const dimensions = `c_fill,h_125,w_125`;
  const newString = `${imageUrl.slice(
    0,
    startIndex
  )}/${dimensions}${imageUrl.slice(startIndex)}`;

  return newString;
}

const cols: Column[] = [
  {
    label: "Name",
    renderCell: (item: any) => item.name,
    pinLeft: true,
  },
  {
    label: "Status",
    renderCell: (item: any) => (
      <span
        className={
          item.status === "OPENED"
            ? "bg-opacity-65 rounded-xl bg-green-500 px-4 py-2 text-green-700"
            : item.status === "CLOSED"
            ? "bg-opacity-65 rounded-xl bg-yellow-500 px-4 py-2 text-yellow-700"
            : item.status === "FINISHED"
            ? "bg-opacity-65 rounded-xl bg-red-500 px-4 py-2 text-red-700"
            : ""
        }
      >
        {item.status}
      </span>
    ),
  },
  {
    label: "Type",
    renderCell: (item: any) => item.type,
  },
  {
    label: "Distiller",
    renderCell: (item: any) => item.distiller,
  },
  {
    label: "Producer",
    renderCell: (item: any) => item.producer,
  },
  {
    label: "Barrel / Batch",
    renderCell: (item: any) => item.batch,
  },
  {
    label: "ABV",
    renderCell: (item: any) => <span>{item.alcoholPercent}%</span>,
  },
  {
    label: "Proof",
    renderCell: (item: any) => <span>{item.proof}pf</span>,
  },
  {
    label: "Age",
    renderCell: (item: any) => item.age,
  },
  {
    label: "Price",
    renderCell: (item: any) => <span>${item.price}</span>,
  },
  {
    label: "Country",
    renderCell: (item: any) => item.country,
  },
  {
    label: "Region",
    renderCell: (item: any) => item.region,
  },
  {
    label: "Finishing",
    renderCell: (item: any) => item.finishing,
  },
  {
    label: "Review",
    renderCell: (item: any) => (
      <Link to={`/reviews/${item.reviews[0].id}/comments`}>
        <ExternalLink />
      </Link>
    ),
  },
];

export default function TestGrid() {
  const [data, setData] = useState<Data>({
    nodes: [],
    totalPages: 0,
  });
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [showImage, setShowImage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const searchFetcher = useTypedFetcher<BottleSearchData>();
  const pagination = usePagination(
    data,
    {
      state: {
        page,
        size: limit,
      },
      onChange: onPaginationChange,
    },
    { isServer: true }
  );
  const [params] = useSearchParams();
  const searchTerm = useDebounce(query, 300);

  useCustom("search", data, {
    state: { searchTerm },
    onChange: onSearchChange,
  });

  function onSearchChange(action: Action, state: State) {
    searchFetcher.load(
      `/services/search/bottle?query=${state.searchTerm}&page=0&limit=${limit}`
    );
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  function onPaginationChange(action: Action, state: State) {
    setPage(state.page);
    searchFetcher.load(
      `/services/search/bottle?query=${
        state.searchTerm || ""
      }&page=${page}&limit=${limit}`
    );
    if (searchFetcher.type === "done") {
      setData({
        nodes: searchFetcher.data.data,
        totalPages: searchFetcher.data.totalPages,
      });
    }
  }

  const fetchData = useCallback(() => {
    setIsLoading(true);
    if (searchFetcher.type === "init") {
      searchFetcher.load(
        `/services/search/bottle?query=&page=0&limit=${limit}`
      );
    }
    if (searchFetcher.type === "done") {
      setData({
        nodes: searchFetcher.data.data,
        totalPages: searchFetcher.data.totalPages,
      });
    }
    setIsLoading(false);
  }, [searchFetcher, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="mb-6 mr-4 ml-0 flex justify-between p-4">
        <div className="w-1/2 border-b-2 border-blue-500">
          <label htmlFor="search" className="mr-2 w-full p-4 pl-0 text-xl">
            Search:
            <input
              className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
              type="text"
              placeholder="Name, Distillery, Producer, Type..."
              id="search"
              aria-label="Search"
              onChange={handleSearch}
              defaultValue={params.get("query") ?? ""}
            />
            {searchFetcher.data?.error ? (
              <span className="bg-red-300 text-red-500">
                {searchFetcher.data.error}
              </span>
            ) : null}
          </label>
        </div>
      </div>
      <div className="mb-8 overflow-x-scroll">
        <Table
          data={data}
          layout={{ custom: true, horizontalScroll: true }}
          // className="table-fixed"
        >
          {(tableList) => (
            <>
              <Header>
                <HeaderRow className="border-b-4 border-blue-300">
                  <HeaderCell
                    pinLeft
                    className="sticky left-0 w-[400px] min-w-[400px] overflow-hidden bg-white text-left"
                  >
                    Name
                  </HeaderCell>
                  <HeaderCell className="min-w-[150px] text-left">
                    Status
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    Type
                  </HeaderCell>
                  <HeaderCell className="min-w-[200px] text-left">
                    Distiller
                  </HeaderCell>
                  <HeaderCell className="min-w-[200px] text-left">
                    Producer
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    ABV
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    Proof
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    Price
                  </HeaderCell>
                  <HeaderCell className="min-w-[150px] text-left">
                    Age
                  </HeaderCell>
                  <HeaderCell className="min-w-[150px] text-left">
                    Barrel/Batch
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    Country
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    Region
                  </HeaderCell>
                  <HeaderCell className="min-w-[100px] text-left">
                    Finishing
                  </HeaderCell>
                  <HeaderCell className="mx-4 min-w-[100px] text-left">
                    Review
                  </HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((item) => (
                  <Row
                    key={item.id}
                    item={item}
                    className="h-11 max-h-[50px] border-b-2 border-blue-500"
                  >
                    <Cell
                      pinLeft
                      className="sticky left-0 w-[400px] min-w-[400px] overflow-hidden bg-gray-50 text-left"
                    >
                      {item.name}
                    </Cell>
                    <Cell className="-ml-4">
                      <span
                        className={
                          item.status === "OPENED"
                            ? "rounded-xl bg-green-500 bg-opacity-60 px-4 py-2 text-green-700"
                            : item.status === "CLOSED"
                            ? "rounded-xl bg-yellow-500 bg-opacity-60 px-4 py-2 text-yellow-700"
                            : item.status === "FINISHED"
                            ? "rounded-xl bg-gray-500 bg-opacity-50 px-4 py-2 text-gray-700"
                            : ""
                        }
                      >
                        {item.status}
                      </span>
                    </Cell>
                    <Cell className="min-w-[100px]">{item.type}</Cell>
                    <Cell className="min-w-[200px]">{item.distiller}</Cell>
                    <Cell className="min-w-[200px]">{item.producer}</Cell>
                    <Cell className="min-w-[100px]">
                      {item.alcoholPercent}%
                    </Cell>
                    <Cell className="min-w-[100px]">{item.proof}pf</Cell>
                    <Cell className="min-w-[100px]">${item.price}</Cell>
                    <Cell className="min-w-[150px]">{item.age}</Cell>
                    <Cell className="min-w-[150px]">{item.batch}</Cell>
                    <Cell className="min-w-[100px]">{item.country}</Cell>
                    <Cell className="min-w-[100px]">{item.region}</Cell>
                    <Cell className="min-w-[100px]">{item.finishing}</Cell>
                    <Cell className="min-w-[100px]">
                      <Link to={`/reviews/${item.reviews?.[0].id}/comments`}>
                        <ExternalLink />
                      </Link>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
      <div className="mt-8 flex justify-between">
        <div className="flex items-center text-lg">
          Total Pages: {searchFetcher?.data?.totalPages}
        </div>

        <span>
          <button
            className="mx-2 my-1 rounded bg-blue-300 p-4 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:bg-slate-200 disabled:text-slate-400"
            disabled={page === 0}
            onClick={() => {
              setPage(0);
              pagination.fns.onSetPage(0);
            }}
          >
            &#60;&#60;
          </button>
          {Array(data.totalPages)
            .fill(data.totalPages)
            .map((_: any, index: any) => (
              <button
                key={index}
                type="button"
                className={
                  pagination.state.page === index
                    ? "mx-2 my-1 rounded bg-blue-300 p-4 font-bold hover:bg-blue-500 hover:text-white"
                    : "mx-2 my-1 rounded bg-blue-300 p-4 hover:bg-blue-500 hover:text-white"
                }
                onClick={() => {
                  setPage(index);
                  pagination.fns.onSetPage(index);
                }}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="mx-2 my-1 rounded bg-blue-300 p-4 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:bg-slate-200 disabled:text-slate-400"
            disabled={page + 1 === searchFetcher?.data?.totalPages}
            onClick={() => {
              setPage(searchFetcher?.data?.totalPages - 1);
              pagination.fns.onSetPage(searchFetcher?.data?.totalPages - 1);
            }}
          >
            &#62;&#62;
          </button>
        </span>
        <div className="flex items-center text-lg">
          Page: {page + 1} of {searchFetcher?.data?.totalPages}
        </div>
      </div>
    </>
  );
}

/*
    
*/

/*

    <div className="mb-6 mr-4 ml-0 flex justify-between border-b-2 border-blue-500 p-4">
          <div className="w-1/2 border-b-2 border-blue-500">
            <label htmlFor="search" className="mr-2 w-full p-4 pl-0 text-xl">
              Search:
              <input
                className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
                type="text"
                placeholder="Name, Distillery, Producer, Type..."
                id="search"
                aria-label="Search"
                onChange={handleSearch}
                defaultValue={params.get("query") ?? ""}
              />
              {searchFetcher.data?.error ? (
                <span className="bg-red-300 text-red-500">
                  {searchFetcher.data.error}
                </span>
              ) : null}
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="mr-2">
              {showImage ? "Toggle to hide images" : "Toggle to show images"}
            </div>
            <div>
              <Switch
                checked={showImage}
                onChange={setShowImage}
                className={`${
                  showImage ? `bg-blue-600` : `bg-gray-200`
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">
                  {showImage
                    ? "Toggle to hide images"
                    : "Toggle to show images"}
                </span>
                <span
                  className={`${
                    showImage ? `translate-x-6` : `translate-x-1`
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </div>
 */
