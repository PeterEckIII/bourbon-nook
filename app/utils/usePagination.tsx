import { useMemo, useState } from "react";
import type { GridBottle } from "~/models/bottle.server";
import type { GridReview } from "~/routes/services/search/review";

type Limit = 10 | 25 | 50 | 100 | 250;

type UsePaginationProps = {
  data: GridBottle[] | GridReview[];
  limit: Limit;
};

export default function usePagination({ data, limit }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return;
  }, []);
}
