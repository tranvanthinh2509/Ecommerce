import { useMemo } from "react";

import { generateRange } from "../ultils/func";

const usePagination = (totalProductCount, currentPage, pageSize) => {
  const paginationArray = useMemo(() => {
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = 8;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);

    const isShowLeft = currentPage - 1 > 2;
    const isShowRight = currentPage + 1 < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, "...", ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, "...", paginationCount];
    }

    // const siblingLeft = Math.max(currentPage - 1, 1);
    // const siblingRight = Math.min(currentPage + 1, paginationCount - 1);

    // if (isShowLeft && isShowRight) {
    //   const middleRange = generateRange(siblingLeft, siblingRight);
    //   return [1, "...", ...middleRange, "...", paginationCount];
    // }

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
