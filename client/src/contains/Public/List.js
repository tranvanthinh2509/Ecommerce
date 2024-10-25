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
  const navigate = useNavigate();
  const category = useLocation();
  const [dataPost, setDataPost] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [type, setType] = useState(true);
  const [selected, setSelected] = useState("default");
  const [checkSelected, setCheckSelected] = useState(false);
  const [priceCode, setPriceCode] = useState();
  const [areaCode, setAreaCode] = useState();

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

  const mutationGetLimitPost = useMutationHooks(async (data) => {
    let { code, page, filter, areaCode, priceCode } = data;

    let res;
    if (code === "home") {
      // res = await PostService.getAllPost(
      //   code,
      //   page,
      //   filter,
      //   priceCode,
      //   areaCode
      // );

      res = await PostService.getLimitPost(
        (code = null),
        page,
        filter,
        priceCode,
        areaCode
      );
    } else {
      res = await PostService.getLimitPost(
        code,
        page,
        filter,
        priceCode,
        areaCode
      );
    }
    setDataPost(res.data);
  });

  const { isPending } = mutationGetLimitPost;

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

    setAreaCode(searchParamsObject?.areaCode?.[0]);
    setPriceCode(searchParamsObject?.priceCode?.[0]);
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
    setType(true);
  }, [code, priceCode, areaCode]);

  useEffect(() => {
    mutationGetLimitPost.mutate({
      code: code,
      page: page,
      filter: selected,
      areaCode,
      priceCode,
    });
  }, [code, page, selected, priceCode, areaCode]);

  const handleLatest = () => {
    setType(false);
    setSelected("latest");
    setCheckSelected(true);
    handleChangePage("latest");
  };
  const handleDefaut = () => {
    setType(true);
    setSelected("default");
    setCheckSelected(true);
    handleChangePage("default");
  };

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
