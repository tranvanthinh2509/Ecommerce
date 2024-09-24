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
  useParams,
  useLocation,
} from "react-router-dom";
function List({ code }) {
  const navigate = useNavigate();
  const category = useLocation();
  const [dataPost, setDataPost] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [type, setType] = useState(true);
  const [selected, setSelected] = useState("mac-đinh");

  const mutationGetLimitPost = useMutationHooks(async (data) => {
    const { code, page } = data;

    let res;
    if (code === "home") {
      res = await PostService.getAllPost(code, page);
    } else {
      res = await PostService.getLimitPost(code, page);
    }
    setDataPost(res.data);
  });

  useEffect(() => {
    mutationGetLimitPost.mutate({ code: code, page: page });
    if (page !== 1 || selected !== "mac-dinh")
      navigate({
        pathname: `${category.pathname}`,
        search: createSearchParams({
          page: page,
          orderby: selected,
        }).toString(),
      });
  }, [code, page, selected]);
  useEffect(() => {
    setPage(1);
  }, [code]);

  const handleLatest = (e) => {
    setType(false);
    setSelected(formatVietnameseToString(e.target.innerText));
  };
  const handleDefaut = (e) => {
    setType(true);
    setSelected(formatVietnameseToString(e.target.innerText));
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
            onClick={(e) => handleDefaut(e)}
          />
          <Button
            bgColor="bg-gray-200"
            text="Mới nhất"
            active={!type}
            onClick={handleLatest}
          />
        </div>
      </div>
      <div>
        {dataPost?.rows &&
          dataPost?.rows.map((item) => {
            return (
              <Item
                title={item.title}
                price={item.attributes.price}
                acreage={item.attributes.acreage}
                star={item.star}
                name={item.user.name}
                phone={item.user.phone}
                address={item.address}
                image={JSON.parse(item?.images?.image)}
              />
            );
          })}
      </div>
      <div className="py-3 w-full flex justify-center ">
        <Panigation
          total={dataPost?.count}
          sizePage={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

export default List;
