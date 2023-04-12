import { useCallback, useEffect, useMemo, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import Spinner from "~/components/Icons/Spinner";
import type { GridBottle } from "~/models/bottle.server";
import type { BottleSearchData } from "~/routes/services/search/bottle";
import useDebounce from "~/utils/useDebounce";
import GlobalFilter from "../Common/GlobalFilter";
import Pagination from "../Common/Pagination/Pagination";
import Table from "../Common/Table";

export type Limit = 10 | 25 | 50 | 75 | 100 | 250;

export type BottleData = {
  bottles: GridBottle[] | [];
  totalPages: number;
};

export type Column = {
  header: string;
  field: keyof GridBottle;
};

export default function NewTestGrid() {
  const [data, setData] = useState<BottleData>({
    bottles: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<Limit>(10);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const searchFetcher = useTypedFetcher<BottleSearchData>();
  const searchTerm = useDebounce(query, 300);

  const columns: Column[] = useMemo(
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

  const { load, state, type, data: fetcherData } = searchFetcher;

  useEffect(() => {
    if (!fetcherData || state === "loading") {
      return;
    }
    if (fetcherData) {
      const newItems = fetcherData.data;
      const totalPages = fetcherData.totalPages;
      setData({
        bottles: newItems,
        totalPages,
      });
    }
  }, [fetcherData, state]);

  const onFilterChange = useCallback(() => {
    setLoading(true);
    load(`/services/search/bottle?query=${searchTerm}&page=0&limit=${limit}`);
    if (type === "done") {
      setData({
        bottles: fetcherData.data,
        totalPages: fetcherData.totalPages,
      });
    }
    setLoading(false);
  }, [limit, load, searchTerm, fetcherData, type]);

  const onPaginationChange = useCallback(
    (page: number) => {
      setLoading(true);
      load(`/services/search/bottle?query=&page=${page}&limit=${limit}`);
      if (type == "done") {
        setData({
          bottles: fetcherData?.data,
          totalPages: fetcherData?.totalPages,
        });
      }
      setLoading(false);
    },
    [limit, load, fetcherData, type]
  );

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const firstPage = () => {
    setCurrentPage(0);
    onPaginationChange(0);
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    if (type === "init") {
      load(`/services/search/bottle?query=&page=${currentPage}&limit=${limit}`);
    }
    if (type === "done") {
      setData({
        bottles: fetcherData.data,
        totalPages: fetcherData.totalPages,
      });
    }
    setLoading(false);
  }, [type, load, fetcherData, limit, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex min-h-[500px] flex-col">
      {/* <GlobalFilter
        handleQueryChange={(e) => handleQueryChange(e.target.value)}
        // load={load}
        searchTerm={searchTerm}
        limit={limit}
        onFilterChange={onFilterChange}
      /> */}
      <Table columns={columns} data={data.bottles} loading={loading} />
    </div>
  );
}
