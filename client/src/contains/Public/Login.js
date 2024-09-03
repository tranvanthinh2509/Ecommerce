import { InputForm, Button } from "../../components";

function Login() {
  return (
    <div className="w-600 bg-white px-8 pt-8 pb-24 rounded-lg border">
      <h1 className="font-bold text-3xl mb-3">Đăng Nhập</h1>
      <div className="w-full flex flex-col gap-5">
        <InputForm label="Tên đăng nhập" />
        <InputForm label="Mật khẩu" />
        <Button
          text="Đăng nhập"
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-secondary1 text-[-16] hover:text-[-red] hover:cursor-pointer ">
          Bạn quên mật khẩu
        </p>
        <p className="text-secondary1 text-[-16] hover:text-[-red] hover:cursor-pointer ">
          Tạo tài khoản mới
        </p>
      </div>
    </div>
  );
}

export default Login;
