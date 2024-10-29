import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Item } from "../../components";
import * as PostService from "../../services/post";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Panigation from "./Panigation";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import {
  createSearchParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Loading from "../../components/Loading";
function List({ code }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = useLocation();
  const [dataPost, setDataPost] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [type, setType] = useState(true);
  const [selected, setSelected] = useState(["default"]);
  const [checkSelected, setCheckSelected] = useState(false);
  const [priceCode, setPriceCode] = useState();
  const [areaCode, setAreaCode] = useState();

  const [queryToApi, setQueryToApi] = useState({
    categoryCode: code,
    order: selected,
    priceCode: priceCode,
    areaCode: areaCode,
    page: page,
  });

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  // taoj param cua thanh filter
  const [paramsSearch] = useSearchParams();
  let entries = paramsSearch.entries();
  const append = (entries, item) => {
    let params = [];
    paramsSearch.append("order", item);
    for (let entry of entries) {
      params.push(entry);
    }

    let searchParamsObject = {};
    params?.forEach((i) => {
      if (
        Object.keys(searchParamsObject)?.some(
          (item) => item === i[0] && item !== "order"
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
      pathname: `${category.pathname}`,
      search: createSearchParams(append(entries, item)).toString(),
    });
  };

  // const mutationGetLimitPost = useMutationHooks(async (data) => {
  //   let { code, page, filter, areaCode, priceCode } = data;

  //   let res;
  //   if (code === "home") {
  //     res = await PostService.getLimitPost(
  //       (code = null),
  //       page,
  //       filter,
  //       priceCode,
  //       areaCode
  //     );
  //   } else {
  //     res = await PostService.getLimitPost(
  //       code,
  //       page,
  //       filter,
  //       priceCode,
  //       areaCode
  //     );
  //   }
  //   setDataPost(res.data);
  // });

  const mutationGetLimitPostNew = useMutationHooks(async (data) => {
    const res = await PostService.getLimitPostNew(data);

    setDataPost(res.data);
  });

  const { isPending } = mutationGetLimitPostNew;

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }

    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });

    if (searchParamsObject?.categoryCode) {
      if (searchParamsObject?.categoryCode[0] === "null") {
        searchParamsObject = {
          ...searchParamsObject,
          categoryCode: "home",
        };
      } else {
        searchParamsObject = {
          ...searchParamsObject,
          categoryCode: searchParamsObject?.categoryCode[0],
        };
      }
    }
    if (searchParamsObject?.cityCode) {
      searchParamsObject = {
        ...searchParamsObject,
        cityCode: searchParamsObject?.cityCode[0],
      };
    }

    if (searchParamsObject?.areaCode) {
      if (searchParamsObject?.areaCode[0] === "null") {
        searchParamsObject = {
          ...searchParamsObject,
          areaCode: searchParamsObject?.areaCode[0],
        };
      } else {
        searchParamsObject = {
          ...searchParamsObject,
          areaCode: searchParamsObject?.areaCode,
        };
      }
    }

    if (searchParamsObject?.priceCode) {
      if (searchParamsObject?.priceCode[0] === "null") {
        searchParamsObject = {
          ...searchParamsObject,
          priceCode: searchParamsObject?.priceCode[0],
        };
      } else {
        searchParamsObject = {
          ...searchParamsObject,
          priceCode: searchParamsObject?.priceCode,
        };
      }
    }

    // setAreaCode(searchParamsObject?.areaCode);
    // setPriceCode(searchParamsObject?.priceCode);

    setQueryToApi((prev) => ({ ...prev, ...searchParamsObject }));

    if (isEmptyObject(searchParamsObject)) {
      setQueryToApi({
        categoryCode: code,
        order: selected,
        priceCode: priceCode,
        areaCode: areaCode,
        page: 1,
      });

      handleDefaut();
    }
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
    setType(true);

    setQueryToApi((prev) => ({
      ...prev,
      categoryCode: code,
      // priceCode: priceCode,
      // areaCode: areaCode,
    }));

    setSelected("default");
    handleDefaut();
  }, [code, priceCode, areaCode]);

  useEffect(() => {
    setQueryToApi((prev) => ({ ...prev, page: page }));
  }, [page, searchParams]);

  // useEffect(() => {
  //   mutationGetLimitPost.mutate({
  //     code: code,
  //     page: page,
  //     filter: selected,
  //     areaCode,
  //     priceCode,
  //   });
  // }, [code, page, selected, priceCode, areaCode]);

  useEffect(() => {
    if (queryToApi.categoryCode !== "none") {
      mutationGetLimitPostNew.mutate(queryToApi);
    }
  }, [queryToApi]);

  const handleLatest = () => {
    setType(false);
    setSelected(["latest"]);
    setCheckSelected(true);
    handleChangePage("latest");
  };
  const handleDefaut = () => {
    setType(true);
    setSelected(["default"]);
    setCheckSelected(true);
    handleChangePage("default");
  };

  // console.log("testToApi ", queryToApi);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-300">
      <div className="p-2">
        <h1 className="text-xl font-bold"> Tổng {dataPost?.count} kết quả</h1>
        <div className="flex items-center gap-2 my-2">
          <span>Sắp xếp: </span>
          <Button
            bgColor="bg-gray-200"
            text="Mặc định"
            active={type}
            onClick={() => handleDefaut()}
          />
          <Button
            bgColor="bg-gray-200"
            text="Mới nhất"
            active={!type}
            onClick={() => handleLatest()}
          />
        </div>
      </div>
      <div>
        {dataPost?.rows &&
          dataPost?.rows.map((item) => {
            return (
              <Item
                id={item?.id}
                title={item?.title}
                price={item?.attributes?.price}
                acreage={item?.attributes?.acreage}
                star={item?.star}
                name={item?.user?.name}
                phone={item?.user?.phone}
                address={item?.address}
                image={item?.images?.image && JSON.parse(item?.images?.image)}
                avatar={item?.user?.image}
              />
            );
          })}
      </div>
      <div className="py-3 w-full flex justify-center ">
        {dataPost?.count !== 0 ? (
          <Panigation
            total={dataPost?.count}
            sizePage={limit}
            page={page}
            setPage={setPage}
          />
        ) : (
          <h1 className="font-bold">Chưa có bài đăng nào</h1>
        )}
      </div>
      {isPending && <Loading isPending={isPending} fullScreen />}
    </div>
  );
}

export default List;
