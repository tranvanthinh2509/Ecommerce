import { useSelector } from "react-redux";
import { Button, Image } from "../../components";
import { FaPenNib, FaRegListAlt, FaWallet, FaHistory } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate, NavLink } from "react-router-dom";
import * as UserService from "../../services/auth";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetUser } from "../../redux/slices/userSlice";
function SideBar() {
  const user = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const res = await UserService.logOutUser();
    localStorage.removeItem("access_token");
    await dispatch(resetUser());
    Swal.fire("Congratulation", res.msg, "success").then(() => {
      navigate("/");
    });
  };

  const MenuUser = [
    {
      id: 1,
      title: "Đăng tin cho thuê",
      icon: <FaPenNib color="#acac0f" />,
      path: "/he-thong/tao-moi-tin-dang",
    },
    {
      id: 2,
      title: "Quản lý tin đăng",
      icon: <FaRegListAlt color="red" />,
      path: "/he-thong/quan-li-tin-dang",
    },
    {
      id: 5,
      title: "Sửa thông tin cá nhân",
      icon: <RxAvatar />,
      path: "/he-thong/thong-tin-ca-nhan",
    },
  ];
  return (
    <div className="bg-primary w-80 border-r border-gray-300 px-4 py-4 flex-none">
      <div className="flex items-center gap-3 my-3">
        <Image
          className="w-16 h-16 object-cover rounded-[-50] flex-none"
          src={user?.avatar}
        />
        <div className="flex-auto">
          <h1 className="font-bold">{user?.name} </h1>
          <p className="text-[-14] text-gray-800 ">{user?.phone}</p>
        </div>
      </div>
      <span className="">
        Mã thành viên :{" "}
        <span className="font-medium">
          {user?.id?.match(/\d/g).join("")?.slice(0, 6)}
        </span>
      </span>
      <div className="mt-3">
        {MenuUser.map((item, index) => {
          return (
            <NavLink
              className={({ isActive }) => {
                return `flex items-center py-2 gap-3 border-b border-gray-300 hover:bg-gray-300 hover:rounded-md ${
                  isActive && "font-bold"
                }`;
              }}
              key={item?.id}
              to={item?.path}
              onClick={() => {
                if (item?.separate) {
                  item?.separate();
                }
              }}
            >
              <span>{item.icon}</span>
              <h1>{item.title}</h1>
            </NavLink>
          );
        })}

        <span
          className="flex items-center py-2 gap-3 border-b border-gray-300 hover:bg-gray-300 cursor-pointer hover:rounded-md"
          onClick={() => {
            handleLogOut();
          }}
        >
          <span>
            <RiLogoutBoxRLine />
          </span>
          <h1>Đăng xuất</h1>
        </span>
      </div>
    </div>
  );
}

export default SideBar;
