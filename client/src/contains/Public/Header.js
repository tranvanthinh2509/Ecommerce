import { useCallback } from "react";
import { Image, Button } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import images from "../../asset/image";
import { CiCirclePlus } from "react-icons/ci";
import { Menu } from "../../components/Menu";
import { TbPencilPlus } from "react-icons/tb";
function Header() {
  const navigate = useNavigate();
  const goToLogin = useCallback((flag) => {
    navigate("/login", { state: flag });
  }, []);

  const MenuUser = [
    {
      title: "Đăng tin cho thuê",
      icon: <TbPencilPlus />,
    },
    {
      title: "Quản lý tin đăng",
      icon: <TbPencilPlus />,
    },
    {
      title: "Nạp tiền",
      icon: <TbPencilPlus />,
    },
    {
      title: "Lịch sử nạp tiền",
      icon: <TbPencilPlus />,
    },
    {
      title: "Thông tin cá nhân",
      icon: <TbPencilPlus />,
    },

    {
      title: "Đăng xuất",
      icon: <TbPencilPlus />,
      separate: true,
    },
  ];
  return (
    <div className="w-1100 flex items-center justify-between">
      <Link to="/">
        <Image src={images.logo} className="w-[240] h-[70] object-contain" />
      </Link>

      {/* <div className="flex items-center justify-between gap-1">
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
      </div> */}
      <div className="flex items-center justify-between gap-5">
        <div>
          <span>
            Xin chào, <span className="font-bold">Trần Văn Thịnh</span>
          </span>
          <p className="text-[-14]">
            TK chính: <span>0</span> VND
          </p>
        </div>

        <div className="relative">
          <Image className="w-12 h-12 rounded-[-50] object-cover border-2  hover:cursor-pointer" />
          <div className="mt-1 absolute top-full right-0">
            <Menu MenuUser={MenuUser} />
          </div>
        </div>

        <Button
          text="Đăng Tin Miễn Phí"
          textColor="text-white"
          bgColor="bg-secondary2"
          icBefore={<CiCirclePlus fontSize="20px" />}
        />
      </div>
    </div>
  );
}

export default Header;
