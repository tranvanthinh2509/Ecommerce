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
import { useDispatch, useSelector } from "react-redux";
import { updatePostItem } from "../../redux/slices/postSlice";
import Swal from "sweetalert2";
import { handleManagerPost } from "../../redux/slices/managerSlice";
import { useNavigate } from "react-router-dom";

function ManagePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const managerPost = useSelector((state) => state?.manager?.managerPost);
  const [post, setPost] = useState();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [categories, setCategories] = useState([]);
  const [code, setCode] = useState("home");
  const [isEdit, setIsEdit] = useState(false);
  const [managerPost1, setManagerPost1] = useState(managerPost);

  useEffect(() => {
    setManagerPost1(managerPost);
  }, [managerPost]);

  const filterStatus = [
    {
      value: "Lọc theo trạng thái",
      code: 1,
    },
    {
      value: "Tin đang hoạt động",
      code: 2,
    },
    {
      value: "Tin đã hết hạn",
      code: 3,
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

  // console.log("statusCOde", statusCode);

  const muationDeletePost = useMutationHooks(async (data) => {
    let { postId } = data;
    const res = await PostService.deletePost(postId);
    return res;
  });
  useEffect(() => {
    setPage(1);
  }, [code]);

  useEffect(() => {
    muationPost.mutate({ page: page, code: code });
  }, [page, code, managerPost1]);

  const checkStatus = (datetime) => {
    return moment(datetime, "DD-MM-YYYY").isSameOrAfter(
      new Date().toDateString()
    );
  };

  const handleIsEdit = () => {
    setIsEdit(true);
  };

  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Do you want to delete this post?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await muationDeletePost.mutate({ postId: postId });
        await Swal.fire("Saved!", "", "success");
        await dispatch(handleManagerPost());
      } else if (result.isDenied) {
        Swal.fire("Delete are not saved", "", "info");
      }
    });
  };
  return (
    <div className="px-12 py-8 w-full bg-primary mb-28">
      <div className="flex items-center justify-between border-b border-gray-300 w-full">
        <h1 className="py-3 text-2xl font-semibold  ">Quản lý tin đăng</h1>
        <div className="flex items-center gap-2">
          <Select options={categories} value={code} setValue={setCode} />

          <Button
            text="Đăng tin mới"
            bgColor="bg-red-500"
            textColor="text-white"
            onClick={() => {
              navigate("/he-thong/tao-moi-tin-dang");
            }}
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
                        <span
                          title="Xóa"
                          className="hover:opacity-70"
                          onClick={() => {
                            handleDeletePost(item?.id);
                          }}
                        >
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
