import { useCallback, useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import { useLocation } from "react-router-dom";
import * as UserService from "../../services/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { validate } from "../../ultils/func";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [signIn, setSignIn] = useState(location?.state === null ? false : true);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [invalidFields, setInvalidFields] = useState([]);

  const resetPayLoad = () => {
    setPayload({
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    setSignIn(location?.state === null ? false : true);
    resetPayLoad();
    setInvalidFields([]);
  }, [location?.state]);

  const handleSignIn = () => {
    setSignIn(!signIn);
  };

  const mutation = useMutationHooks((data) => {
    const res = UserService.apiLogin(data.payload);
    return res;
  });

  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    const response = data;
    if (response) {
      if (response?.status === "OK") {
        localStorage.setItem(
          "access_token",
          JSON.stringify(response?.access_token)
        );
        if (response?.access_token) {
          const decoded = jwtDecode(response?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, response?.access_token);
          }
        }

        Swal.fire("Congratulation", response.msg, "success").then(() => {
          navigate("/");
        });
      } else {
        Swal.fire("Oops", response.msg, "error");
      }
    }
  }, [isError, isSuccess]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res.data }));
  };

  const handelSubmit = useCallback(async () => {
    const { name, confirmPassword, ...dataPayLoad } = payload;

    //VALIDATE
    const invalid =
      signIn === false
        ? validate(payload, setInvalidFields)
        : validate(dataPayLoad, setInvalidFields);

    if (invalid === 0) {
      if (signIn) {
        await mutation.mutate({ payload });
      } else {
        const response = await UserService.apiRegister(payload);
        if (response.status === "OK") {
          Swal.fire("Congratulation", response.msg, "success").then(() => {
            setSignIn(true);
            resetPayLoad();
          });
        } else {
          Swal.fire("Oops", response.msg, "error");
        }
      }
    }
  }, [payload, signIn]);

  return (
    <div className="w-600 bg-white px-8 pt-8 pb-24 rounded-lg border">
      <h1 className="font-bold text-3xl mb-3">
        {signIn ? "Đăng nhập" : "Đăng ký"}
      </h1>
      <div className="w-full flex flex-col gap-5">
        {signIn === false && (
          <InputForm
            label="Họ và tên"
            type="text"
            nameKey="name"
            value={payload.name}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <InputForm
          label="Số điện thoại"
          type="text"
          nameKey="phone"
          value={payload.phone}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <InputForm
          label="Mật khẩu"
          type="text"
          nameKey="password"
          value={payload.password}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        {signIn === false && (
          <InputForm
            label="Xác nhận mật khẩu"
            type="text"
            nameKey="confirmPassword"
            value={payload.confirmPassword}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        )}
        <Button
          text={signIn ? "Đăng nhập" : "Đăng ký"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handelSubmit}
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
