import { useEffect, useState } from "react";
import { Button, Image } from "../../components";
import * as PostService from "../../services/post";
import { useMutationHooks } from "../../hooks/useMutationHook";
import moment from "moment";
import { RiFileInfoFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Panigation from "../Public/Panigation";
import { useQuery } from "@tanstack/react-query";
import Select from "../../components/Select";
import UpdatePost from "../../components/UpdatePost";
import { useDispatch } from "react-redux";
import { updatePostItem } from "../../redux/slices/postSlice";

function ManagePost() {
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [categories, setCategories] = useState([]);
  const [code, setCode] = useState("home");
  const [isEdit, setIsEdit] = useState(false);
  const filterStatus = [
    {
      title: "Tin đang hiển thị",
    },
    {
      title: "Tin đang hết hạn",
    },
    {
      title: "Tin đang đang ẩn",
    },
  ];

  const { data: category } = useQuery({
    queryKey: ["Category"],
  });

  useEffect(() => {
    setCategories(category?.data);
  }, [category]);
  const muationPost = useMutationHooks(async (data) => {
    let { code, page, filter } = data;
    let res;
    if (code === "home") {
      res = await PostService.getLimitAdmin(
        (code = null),
        page,
        (filter = "default")
      );
    } else {
      res = await PostService.getLimitAdmin(code, page, (filter = "default"));
    }

    setPost(res?.data);
  });
  useEffect(() => {
    setPage(1);
  }, [code]);

  useEffect(() => {
    muationPost.mutate({ page: page, code: code });
  }, [page, code]);

  const checkStatus = (datetime) => {
    // let todayInSeconds = new Date().getTime();
    // let expireDayInSeconds = datetime.getTime();
    // return todayInSeconds >= expireDayInSeconds
    //   ? "Đang hoạt động"
    //   : "Đã hết hạn";

    let today = new Date().toDateString();
    return moment(datetime, "DD-MM-YYYY").isSameOrAfter(
      new Date().toDateString()
    );
  };

  const handleIsEdit = () => {
    setIsEdit(true);
  };
  return (
    <div className="px-12 py-8 w-full bg-primary mb-28">
      <div className="flex items-center justify-between border-b border-gray-300 w-full">
        <h1 className="py-3 text-2xl font-semibold  ">Quản lý tin đăng</h1>
        <div className="flex items-center gap-2">
          <Select options={categories} value={code} setValue={setCode} />
          <div className="flex flex-col gap-2 flex-1 ">
            <select
              id="select-overview"
              className="outline-none border bg-gray-500 border-gray-500 font-semibold text-white p-2 rounded-md "
              value={" "}
            >
              <option value="">{`Lọc theo trạng thái`}</option>
              {filterStatus?.map((item) => {
                return (
                  <option
                    key={item?.code}
                    value={item?.code}
                    id={item?.code}
                    className="bg-white text-black"
                  >
                    {item?.title}
                  </option>
                );
              })}
            </select>
          </div>
          <Button
            text="Đăng tin mới"
            bgColor="bg-red-500"
            textColor="text-white"
          />
        </div>
      </div>
      <div className="w-full mt-5">
        <table class="w-full table-auto border ">
          <thead>
            <tr>
              <th className="border  py-2">Mã Tin</th>
              <th className="border  py-2">Ảnh đại diện</th>
              <th className="border  py-2">Tiêu đề</th>
              <th className="border  py-2">Giá</th>
              <th className="border  py-2">Ngày bắt đầu</th>
              <th className="border  py-2">Ngày hết hạn</th>
              <th className="border  py-2">Status</th>
              <th className="border  py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {post?.rows ? (
              post?.rows.map((item) => {
                return (
                  <tr className="border">
                    <td className="border  text-center p-2">
                      {item?.overviews?.code}
                    </td>
                    <td className="  p-2 flex items-center justify-center ">
                      <Image
                        className="w-10 h-10 object-cover rounded-md"
                        src={JSON.parse(item?.images?.image)[0]}
                      />
                    </td>
                    <td className="border p-2 text-center w-1/3">
                      {item?.title}
                    </td>
                    <td className="border p-2 text-center ">
                      {item?.attributes?.price}
                    </td>
                    <td className="border p-2 text-center">
                      {item?.overviews?.created}
                    </td>
                    <td className="border p-2 text-center">
                      {item?.overviews?.expire}
                    </td>
                    <td className="border p-2 text-center">
                      {checkStatus(item?.overviews?.expire?.split(" ")[3])
                        ? "Đang hoạt động"
                        : "Đã hết hạn"}
                    </td>
                    <td className=" p-2 text-center ">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          title="Sửa"
                          className="hover:opacity-70"
                          onClick={() => {
                            handleIsEdit();
                            dispatch(updatePostItem(item));
                          }}
                        >
                          <RiFileInfoFill fontSize="24px" />
                        </span>
                        <span title="Xóa" className="hover:opacity-70">
                          <MdDelete fontSize="24px" />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>Không có</tr>
            )}
          </tbody>
        </table>

        <div className="py-3 w-full flex justify-center ">
          <Panigation
            total={post?.count}
            sizePage={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
}

export default ManagePost;
