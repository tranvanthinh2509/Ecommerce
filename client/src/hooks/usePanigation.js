import { useMemo } from "react";

import { generateRange } from "../ultils/func";

const usePagination = (totalProductCount, currentPage, pageSize) => {
  const paginationArray = useMemo(() => {
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);

    const minLeft = Math.max(currentPage - 1, 1);
    const maxRight = Math.min(+currentPage + 1, paginationCount - 1);

    if (currentPage < paginationCount - 2)
      return [...generateRange(minLeft, maxRight), "...", paginationCount];

    if (currentPage + 2 >= paginationCount)
      return [...generateRange(minLeft, paginationCount)];
  }, [totalProductCount, currentPage, pageSize]);

  return paginationArray;
};

export default usePagination;
