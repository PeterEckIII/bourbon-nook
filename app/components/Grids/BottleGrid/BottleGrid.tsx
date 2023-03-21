import type { ChangeEvent } from "react";
import { useCallback, useState, useEffect } from "react";
import { useSort } from "@table-library/react-table-library/sort";
import { useCustom } from "@table-library/react-table-library";
import { useTypedFetcher } from "remix-typedjson";
import type { BottleSearchData } from "~/routes/services/search/bottle";
import type { GridBottle } from "~/models/bottle.server";
import { usePagination } from "@table-library/react-table-library/pagination";
import type { Action, State } from "@table-library/react-table-library/types";
import { useSearchParams } from "@remix-run/react";
import useDebounce from "~/utils/useDebounce";
import FilterArrowUp from "~/components/Icons/FilterArrowUp";
import FilterArrowDown from "~/components/Icons/FilterArrowDown";
import FilterArrows from "~/components/Icons/FilterArrows";
import GridHeader from "../BottleGrid/GridHeader/GridHeader";
import GridBody from "../BottleGrid/GridBody/GridBody";
import GridFooter from "../BottleGrid/GridFooter/GridFooter";

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

export type Limit = 10 | 25 | 50 | 75 | 100;

export default function TestGrid() {
  const [data, setData] = useState<Data>({
    nodes: [],
    totalPages: 0,
  });
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<Limit>(10);
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
  const sort = useSort(
    data,
    {
      state: {
        sortKey: "NAME",
        reverse: false,
      },
      onChange: onSortChange,
    },
    {
      sortIcon: {
        margin: "0px",
        iconDefault: <FilterArrows />,
        iconUp: <FilterArrowUp />,
        iconDown: <FilterArrowDown />,
      },
      sortFns: {
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        STATUS: (array) =>
          array.sort((a, b) => a.status.localeCompare(b.status)),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        DISTILLER: (array) =>
          array.sort((a, b) => a.distiller.localeCompare(b.distiller)),
        PRODUCER: (array) =>
          array.sort((a, b) => a.producer.localeCompare(b.producer)),
        ABV: (array) =>
          array.sort((a, b) => a.alcoholPercent - b.alcoholPercent),
        PROOF: (array) => array.sort((a, b) => a.proof - b.proof),
        PRICE: (array) => array.sort((a, b) => a.price - b.price),
        COUNTRY: (array) =>
          array.sort((a, b) => a.country.localeCompare(b.country)),
        REGION: (array) =>
          array.sort((a, b) => a.region.localeCompare(b.region)),
      },
    }
  );

  function onSortChange(action: Action, state: State) {
    console.log(`STATE: ${JSON.stringify(state)}`);
  }

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
      <GridHeader
        searchFetcher={searchFetcher}
        handleSearch={handleSearch}
        searchParams={params}
        limit={limit}
        setLimit={setLimit}
      />
      <GridBody data={data} pagination={pagination} sort={sort} />
      <GridFooter
        data={data}
        pagination={pagination}
        setPage={setPage}
        page={page}
        searchFetcher={searchFetcher}
      />
    </>
  );
}
