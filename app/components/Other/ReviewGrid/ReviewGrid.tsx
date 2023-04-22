import { useTheme } from "@table-library/react-table-library/theme";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  useCustom,
} from "@table-library/react-table-library";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useTypedFetcher } from "remix-typedjson";
import type { ReviewSearchData } from "~/routes/services/search/review";
import { Link, useSearchParams } from "@remix-run/react";
import type {
  Action,
  State,
} from "@table-library/react-table-library/types/common";
import useDebounce from "~/utils/useDebounce";
import { Switch, Transition } from "@headlessui/react";
import ExternalLink from "~/components/Icons/ExternalLink";
import Spinner from "~/components/Icons/Spinner";

export type GridReview = {
  id: string;
  date: string | null;
  overallRating: number | null;
  value: number | null;
  bottle: {
    name: string;
    type: string;
    distiller: string | null;
    producer: string | null;
    proof: string | null;
    alcoholPercent: string | null;
    age: string | null;
    price: string | null;
    imageUrl: string | null;
  } | null;
};

type Data = {
  nodes: GridReview[] | [];
  totalPages?: number;
};

export default function ReviewGrid() {
  const [data, setData] = useState<Data>({
    nodes: [],
    totalPages: 0,
  });
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const searchFetcher = useTypedFetcher<ReviewSearchData>();
  const theme = useTheme({});
  const pagination = usePagination(
    data,
    {
      state: {
        page: page,
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
      `/services/search/review?query=${state.searchTerm}&page=0&limit=${limit}`
    );
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  function onPaginationChange(action: Action, state: State) {
    setPage(state.page);
    searchFetcher.load(
      `/services/search/review?query=${
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
    setLoading(true);
    if (searchFetcher.type === "init") {
      searchFetcher.load(
        `/services/search/review?query=&page=0&limit=${limit}`
      );
    }
    if (searchFetcher.type === "done") {
      setData({
        nodes: searchFetcher.data.data,
        totalPages: searchFetcher.data.totalPages,
      });
    }
    setLoading(false);
  }, [searchFetcher, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex justify-center">
      <div id="review-table" className="w-full">
        {/* TABLE SEARCH / TOGGLE */}
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
        {/* TABLE */}
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div>
            {" "}
            <Table
              data={data}
              theme={theme}
              pagination={pagination}
              layout={{ custom: true, horizontalScroll: true }}
            >
              {(tableList) => (
                <>
                  <Header>
                    <HeaderRow className="text-lg">
                      <Transition
                        show={showImage}
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <HeaderCell
                          className="mx-4 min-w-[300px] border-r p-2 text-left"
                          resize={{
                            resizerWidth: 15,
                            resizerHighlight: "#2563eb",
                          }}
                        >
                          Bottle
                        </HeaderCell>
                      </Transition>
                      <HeaderCell
                        className="mx-4 min-w-[300px] border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Name
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Date
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Type
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Distillery
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Producer
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        ABV
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Proof
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Age
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Price
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Rating
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Value
                      </HeaderCell>
                      <HeaderCell
                        className="mx-4 border-r p-2 text-left"
                        resize={{
                          resizerWidth: 15,
                          resizerHighlight: "#2563eb",
                        }}
                      >
                        Link
                      </HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body>
                    {tableList.map((item) => {
                      return (
                        <Row key={item.id} item={item}>
                          <Transition
                            show={showImage}
                            enter="transition-opacity duration-400"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-400"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Cell className="mx-4 p-4">
                              <img
                                className="border border-blue-500"
                                src={`${item.bottle.imageUrl}`}
                                alt={`Bottle of ${item.bottle.name}`}
                                height={200}
                                width={125}
                              />
                            </Cell>
                          </Transition>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.name}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {new Date(item.date).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.type}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.distiller}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.producer}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.alcoholPercent}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.proof}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            {item.bottle.age}
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            ${item.bottle.price}
                          </Cell>
                          <Cell className="mx-4 p-4 text-center text-lg">
                            <div
                              className={
                                item.overallRating >= 7.5
                                  ? `bg-green-100 text-green-700`
                                  : item.overallRating >= 5 &&
                                    item.overallRating < 7.5
                                  ? `bg-yellow-100 text-yellow-700`
                                  : item.overallRating < 5
                                  ? `bg-red-100 text-red-100`
                                  : "" +
                                    ` leading-wide mx-4 rounded-lg p-4 px-3 py-1 text-center text-xs font-bold uppercase shadow-sm`
                              }
                            >
                              {item.overallRating}
                            </div>
                          </Cell>
                          <Cell className="mx-4 p-4 text-center text-lg">
                            <div
                              className={
                                item.overallRating >= 7.5
                                  ? `bg-green-100 text-green-700`
                                  : item.overallRating >= 5 &&
                                    item.overallRating < 7.5
                                  ? `bg-yellow-100 text-yellow-700`
                                  : item.overallRating < 5
                                  ? `bg-red-100 text-red-100`
                                  : "" +
                                    ` leading-wide mx-4 rounded-lg p-4 px-3 py-1 text-center text-xs font-bold uppercase shadow-sm`
                              }
                            >
                              {item.value}
                            </div>
                          </Cell>
                          <Cell className="mx-4 p-4 text-lg">
                            <Link to={`/reviews/${item.id}`}>
                              <ExternalLink className="" />
                            </Link>
                          </Cell>
                        </Row>
                      );
                    })}
                  </Body>
                </>
              )}
            </Table>
          </div>
        )}
        {/* PAGINATION */}
        <div className="mt-8 flex justify-between">
          <div className="flex items-center text-lg">
            Total Pages: {searchFetcher?.data?.totalPages}
          </div>

          <span>
            <button
              className="mx-2 my-1 rounded bg-blue-300 p-4 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:bg-slate-200 disabled:text-slate-400"
              disabled={page === 0}
              aria-disabled={page === 0}
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
                  disabled={page === index}
                  aria-disabled={page === index}
                >
                  {index + 1}
                </button>
              ))}
            <button
              className="mx-2 my-1 rounded bg-blue-300 p-4 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:border disabled:border-gray-400 disabled:bg-slate-200 disabled:text-slate-400"
              disabled={page + 1 === searchFetcher?.data?.totalPages}
              aria-disabled={page + 1 === searchFetcher?.data?.totalPages}
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
      </div>
    </div>
  );
}
