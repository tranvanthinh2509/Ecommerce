import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  createSearchParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useState, memo, useEffect } from "react";

import usePagination from "../../hooks/usePanigation";

const Pagination = ({ total, sizePage, page, setPage }) => {
  const pagination = usePagination(total, page, sizePage);
  const navigate = useNavigate();
  const location = useLocation();
  const [paramsSearch] = useSearchParams();
  let entries = paramsSearch.entries();

  // Su dung de tao param
  const append = (entries, item) => {
    let params = [];
    paramsSearch.append("page", +item);
    for (let entry of entries) {
      params.push(entry);
    }

    let searchParamsObject = {};
    params?.forEach((i) => {
      if (
        Object.keys(searchParamsObject)?.some(
          (item) => item === i[0] && item !== "page"
        )
      ) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    return searchParamsObject;
  };

  const handleChangePage = (item) => {
    navigate({
      pathname: `${location.pathname}`,
      search: createSearchParams(append(entries, item)).toString(),
    });
  };

  return (
    <div className="flex gap-1 items-center">
      {page !== 1 && (
        <div
          onClick={() => {
            setPage(page - 1);
            handleChangePage(page - 1);
          }}
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

              handleChangePage(item);
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
          onClick={() => {
            setPage(page + 1);
            handleChangePage(page + 1);
          }}
          className="w-[37px] h-[37px] flex items-center justify-center border border-gray-300 rounded-md cursor-pointer hover:bg-[#DEE2E6]"
        >
          <FaAngleRight />
        </div>
      )}
    </div>
  );
};

export default memo(Pagination);
