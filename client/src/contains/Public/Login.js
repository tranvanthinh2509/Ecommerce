import { useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  const [signIn, setSignIn] = useState(location?.state === null ? false : true);

  useEffect(() => {
    setSignIn(location?.state === null ? false : true);
  }, [location?.state]);

  const handleSignIn = () => {
    setSignIn(!signIn);
  };
  return (
    <div className="w-600 bg-white px-8 pt-8 pb-24 rounded-lg border">
      <h1 className="font-bold text-3xl mb-3">
        {signIn ? "Đăng nhập" : "Đăng ký"}
      </h1>
      <div className="w-full flex flex-col gap-5">
        {signIn === false && <InputForm label="Họ và tên" />}
        <InputForm label="Số điện thoại" />
        <InputForm label="Mật khẩu" />
        <Button
          text={signIn ? "Đăng nhập" : "Đăng ký"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        {signIn ? (
          <>
            <p className="text-secondary1 text-[-16] hover:text-[-red] hover:cursor-pointer ">
              Bạn quên mật khẩu
            </p>
            <p
              className="text-secondary1 text-[-16] hover:text-[-red] hover:cursor-pointer "
              onClick={handleSignIn}
            >
              Tạo tài khoản mới
            </p>
          </>
        ) : (
          <span className="text-[-16] ">
            Bạn đã có tài khoản ?{" "}
            <span
              className="text-secondary1 text-[-16] hover:text-[-red] hover:cursor-pointer "
              onClick={handleSignIn}
            >
              Đăng nhập ngay
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export default Login;
