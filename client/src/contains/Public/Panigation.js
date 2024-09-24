import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { useState, memo, useEffect } from "react";

import usePagination from "../../hooks/usePanigation";

const Pagination = ({ total, sizePage, page, setPage }) => {
  const pagination = usePagination(total, page, sizePage);

  return (
    <div className="flex gap-1 items-center">
      {page !== 1 && (
        <div
          onClick={() => setPage(page - 1)}
          className="w-[37px] h-[37px] flex items-center justify-center border border-gray-300 rounded-md cursor-pointer hover:bg-[#DEE2E6]"
        >
          <FaAngleLeft />
        </div>
      )}
      {pagination?.map((item, index) => {
        return (
          <div
            onClick={() => {
              if (item !== "...") setPage(item);
            }}
            key={index}
            className={`w-[37px] h-[37px] flex items-center justify-center border border-gray-300 rounded-md cursor-pointer   ${
              page === item
                ? "bg-red-500 w-[39px] h-[39px] text-white font-medium hover:bg-opacity-60"
                : "hover:bg-[#DEE2E6]"
            }`}
          >
            {item}
          </div>
        );
      })}
      {page !== pagination?.[pagination?.length - 1] && pagination && (
        <div
          onClick={() => setPage(page + 1)}
          className="w-[37px] h-[37px] flex items-center justify-center border border-gray-300 rounded-md cursor-pointer hover:bg-[#DEE2E6]"
        >
          <FaAngleRight />
        </div>
      )}
    </div>
  );
};

export default memo(Pagination);
