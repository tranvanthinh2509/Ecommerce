import { Image, Button } from "../../components";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="w-1100 flex items-center justify-between">
      <Image className="w-[240] h-[70] object-contain" />
      <div className="flex items-center justify-between gap-1">
        <p>Phòng trọ 123 xin chào!</p>
        <Button
          text="Đăng Nhập"
          textColor="text-white"
          bgColor="bg-secondary1"
          onClick={goToLogin}
        />
        <Button
          text="Đăng Ký"
          textColor="text-white"
          bgColor="bg-secondary1"
          onClick={goToLogin}
        />
        <Button
          text="Đăng Tin Mới"
          textColor="text-white"
          bgColor="bg-secondary2"
        />
      </div>
    </div>
  );
}

export default Header;
