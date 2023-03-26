import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useTypedFetcher } from "remix-typedjson";
import { GridBottle } from "~/models/bottle.server";
import { BottleSearchData } from "~/routes/services/search/bottle";
import { GridReview, ReviewSearchData } from "~/routes/services/search/review";

type PaginationProps = {
  data: GridBottle[] | [];
  setData: Dispatch<SetStateAction<GridBottle[]>>;
};

type Limit = 10 | 25 | 50 | 75 | 100 | 250;

export default function Pagination({ data, setData }: PaginationProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<Limit>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const searchFetcher = useTypedFetcher<BottleSearchData>();
}
