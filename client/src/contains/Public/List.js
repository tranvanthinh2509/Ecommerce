import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Item } from "../../components";
import * as PostService from "../../services/post";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Panigation from "./Panigation";
function List({ code, page }) {
  console.log("page", page);
  const [dataPost, setDataPost] = useState([]);
  // const { data: dataPost } = useQuery({
  //   queryKey: ["dataPost"],
  //   queryFn: PostService.getLimitPost(code),
  // });
  // console.log("data123 ", dataPost);

  const mutationGetLimitPost = useMutationHooks(async (data) => {
    const { code } = data;
    let res;
    if (code === "home") {
      res = await PostService.getAllPost();
    } else {
      res = await PostService.getLimitPost(code);
    }
    setDataPost(res.data);
  });

  // const mutationGetAllPost = useMutationHooks(async () => {
  //   const res = await PostService.getAllPost();

  //   setDataPost(res.data);
  // });
  useEffect(() => {
    mutationGetLimitPost.mutate({ code: code });
  }, [code]);
  return (
    <div className="w-full bg-white rounded-lg border border-gray-300">
      <div className="p-2">
        <h1 className="text-xl font-bold"> Tổng {dataPost?.count} kết quả</h1>
        <div className="flex items-center gap-2 my-2">
          <span>Sắp xếp: </span>
          <Button bgColor="bg-gray-200" text="Mặc định" />
          <Button bgColor="bg-gray-200" text="Mới nhất" />
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
    </div>
  );
}

export default List;
