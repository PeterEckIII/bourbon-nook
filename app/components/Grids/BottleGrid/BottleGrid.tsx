import { ChangeEvent, useEffect } from "react";
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
} from "@table-library/react-table-library/types/common";
import { Link, useSearchParams } from "@remix-run/react";
import useDebounce from "~/utils/useDebounce";
import { Switch, Transition } from "@headlessui/react";
import ExternalLink from "~/components/Icons/ExternalLink";
import useWindowSize from "~/utils/useWindowSize";
import type { Theme } from "@table-library/react-table-library/types/theme";
import { useTheme } from "@table-library/react-table-library/theme";

type Data = {
  nodes: GridBottle[] | [];
  totalPages: number;
};

const THEME: Theme = {
  Table: `
    --data-table-library_grid-template-columns:  2fr 2fr minmax(min-content, 2fr);
    min-width: 800px;
  `,
  HeaderRow: `
    font-size: 1.125rem;
    line-height: 1.75rem;
  `,
  HeaderCell: `
    margin: 0 1rem;
    border-right: 1px solid black;
    text-align: left;
    padding: 0.5rem;

    &:nth-child(1), &:nth-child(2) {
      min-width: 300px;
    }

    &:nth-child(3) {
      background-color: rgb(74 222 128);
      color: rgb(21 128 61);
      border-radius: 10px;
    }
  `,
  Cell: `
    margin: 0 1rem;
    padding: 1rem;
    text-align: center;

    img {
      border: 1px solid #2563eb;
    }

    div {

    }
  `,
};

export default function BottleGrid() {
  const [data, setData] = useState<Data>({
    nodes: [],
    totalPages: 0,
  });
  const [query, setQuery] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [showImage, setShowImage] = useState<boolean>(false);
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
  }, [searchFetcher, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex justify-center">
      <div id="bottle-table" className="w-full">
        {/* SEARCH / TOGGLE */}
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
        <span>Showing {searchFetcher?.data?.totalBottles} bottles</span>
        <div className="overflow-x-scroll">
          <Table data={data} layout={{ custom: true, horizontalScroll: true }}>
            {(tableList) => (
              <>
                <Header className="my-2 pl-2">
                  <HeaderRow className="my-2">
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Bottle
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Name
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Status
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Type
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Distiller
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Producer
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      ABV
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Proof
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Price
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Age
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 pr-4 text-left text-gray-700">
                      Country
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Region
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 text-left text-gray-700">
                      Batch / Barrel #
                    </HeaderCell>
                    <HeaderCell className="my-2 bg-gray-200 pl-2 pr-4 text-left text-gray-700">
                      Review
                    </HeaderCell>
                  </HeaderRow>
                </Header>
                <Body className="my-4">
                  {tableList.map((item) => (
                    <Row
                      key={item.id}
                      item={item}
                      className="my-4 border-b-2 border-blue-500 py-4"
                    >
                      <Cell className="mx-2">
                        <img
                          src={`${item?.imageUrl}`}
                          alt={`Bottle of ${item?.name}`}
                          height={200}
                          width={125}
                        />
                      </Cell>
                      <Cell className="mx-2 px-2">{item?.name}</Cell>
                      <Cell className="mx-2 px-2">
                        <span
                          className={
                            item?.status === "OPENED"
                              ? `rounded-xl bg-green-500 px-4 py-2 text-green-900`
                              : item?.status === "CLOSED"
                              ? `rounded-xl bg-yellow-500 px-4 py-2 text-yellow-900`
                              : item?.status === "FINISHED"
                              ? `rounded-xl bg-gray-300 px-4 py-2 text-gray-700`
                              : ``
                          }
                        >
                          {item?.status}
                        </span>
                      </Cell>
                      <Cell className="mx-2 px-2">{item?.type}</Cell>
                      <Cell className="mx-2 px-2">{item?.distiller}</Cell>
                      <Cell className="mx-2 px-2">{item?.producer}</Cell>
                      <Cell className="mx-2 px-2">{item?.alcoholPercent}%</Cell>
                      <Cell className="mx-2 px-2">{item?.proof}pf</Cell>
                      <Cell className="mx-2 px-2">${item?.price}</Cell>
                      <Cell className="mx-2 px-2 text-center">{item?.age}</Cell>
                      <Cell className="mx-2 px-2">{item?.country}</Cell>
                      <Cell className="mx-2 px-2">{item?.region}</Cell>
                      <Cell className="mx-2 text-center">{item?.batch}</Cell>
                      <Cell className="mx-2 px-2">
                        <Link to={`/reviews/${item?.reviews[0].id}/comments`}>
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
        {/* PAGINATION */}
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
      </div>
    </div>
  );
}

/*
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
      minWidth: 100,
      valueGetter: (params: ValueGetterParams) => {
        return params.data?.reviewId ? params.data?.reviewId : params.data?.id;
      },
      cellRenderer: (props: any) => {
        if (props.data?.reviews.length < 1) {
          return (
            <>
              <Link to={`/reviews/new/setting?bid=${props.data?.id}`}>
                <AddIcon classes="text-green-600" />
              </Link>
            </>
          );
        } else {
          return (
            <Link to={`/reviews/${props.data?.reviews[0].id}/comments`}>
              <ExternalLink className="" />
            </Link>
          );
        }
      },
      cellStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      sortable: false,
      filter: false,
    },
  ]);
  const [records, setRecords] = useState<number>(0);
  const [getRowParams, setGetRowParams] = useState<IGetRowsParams | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const bottles = useFetcher();

  const grid = useRef<AgGridReactType>(null);

  const onFilterTextBoxChanged = useCallback(() => {
    grid!.current!.api.setQuickFilter(
      (document!.getElementById("bottle-filter-text-box") as HTMLInputElement)
        .value
    );
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    grid!.current!.api.sizeColumnsToFit();
  }, []);

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      const datasource = {
        getRows(params: IGetRowsParams) {
          if (!isFetching) {
            bottles.load(
              `/services/bottleGrid?from=${params.startRow}&to=${params.endRow}`
            );

            setGetRowParams(params);
            setIsFetching(true);
          }
        },
      };
      params.api.setDatasource(datasource);
      params.api.sizeColumnsToFit();
      params.api.refreshCells();
    },
    [bottles, isFetching]
  );

  useEffect(() => {
    if (getRowParams) {
      const data = bottles.data || [];

      getRowParams.successCallback(
        data,
        data.length < getRowParams.endRow - getRowParams.startRow
          ? getRowParams.startRow
          : -1
      );
    }

    setIsFetching(false);
    setGetRowParams(null);
  }, [bottles.data, getRowParams]);

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
    }),
    []
  );
*/
