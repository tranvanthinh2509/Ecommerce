import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import images from "../../asset/image";
import { CiCirclePlus } from "react-icons/ci";
import { Menu } from "../../components/Menu";
import { FaPenNib, FaRegListAlt, FaWallet, FaHistory } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import * as UserService from "../../services/auth";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slices/userSlice";
import Swal from "sweetalert2";
function Header() {
  const user1 = useSelector((state) => state.user.currentUser);

  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState(user1 ? true : false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const res = await UserService.logOutUser();
    localStorage.removeItem("access_token");
    await dispatch(resetUser());
    Swal.fire("Congratulation", res.msg, "success").then(() => {
      navigate("/");
    });
  };

  const goToLogin = useCallback((flag) => {
    navigate("/login", { state: flag });
  }, []);

  const menuRef = useRef();

  const MenuUser = [
    {
      title: "Đăng tin cho thuê",
      icon: <FaPenNib color="#acac0f" />,
    },
    {
      title: "Quản lý tin đăng",
      icon: <FaRegListAlt color="red" />,
    },
    {
      title: "Nạp tiền",
      icon: <FaWallet color="#1c8b0e" />,
    },
    {
      title: "Lịch sử nạp tiền",
      icon: <FaHistory color="black" />,
    },
    {
      title: "Thông tin cá nhân",
      icon: <RxAvatar />,
    },

    {
      title: "Đăng xuất",
      icon: <RiLogoutBoxRLine />,
      separate: handleLogOut,
    },
  ];

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (user === true) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setOpenMenu(false);
        }
      };

      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
      };
    }
  });

  return (
    <div className="w-1100 flex items-center justify-between">
      <Link to="/">
        <Image src={images.logo} className="w-[240] h-[70] object-contain" />
      </Link>

      {user1 ? (
        <div className="flex items-center justify-between gap-5">
          <div>
            <span>
              Xin chào, <span className="font-bold">Trần Văn Thịnh</span>
            </span>
            <p className="text-[-14]">
              TK chính: <span>0</span> VND
            </p>
          </div>

          <div className="relative" ref={menuRef}>
            <Image
              className="w-12 h-12 rounded-[-50] object-cover border-2  hover:cursor-pointer"
              onClick={handleOpenMenu}
            />

            {openMenu && (
              <div className="mt-1 absolute top-full right-0">
                <Menu MenuUser={MenuUser} />
              </div>
            )}
          </div>

          <Button
            text="Đăng Tin Miễn Phí"
            textColor="text-white"
            bgColor="bg-secondary2"
            icBefore={<CiCirclePlus fontSize="20px" />}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-1">
          <p>Phòng trọ 123 xin chào!</p>
          <Button
            text="Đăng Nhập"
            textColor="text-white"
            bgColor="bg-secondary1"
            onClick={() => goToLogin(true)}
          />
          <Button
            text="Đăng Ký"
            textColor="text-white"
            bgColor="bg-secondary1"
            onClick={() => goToLogin(false)}
          />
          <Button
            text="Đăng Tin Mới"
            textColor="text-white"
            bgColor="bg-secondary2"
          />
        </div>
      )}
    </div>
  );
}

export default Header;
