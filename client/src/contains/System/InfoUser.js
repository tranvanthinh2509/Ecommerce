import { useEffect, useState } from "react";
import { Button, Image } from "../../components";
import InputFormInfo from "../../components/InputFormInfo";
import InputOverview from "../../components/InputOverview";
import InputReadOnlyInfo from "../../components/InputReadOnly";
import { useSelector } from "react-redux";
import * as PostService from "../../services/post";
import { validate } from "../../ultils/func";
import * as UserService from "../../services/auth";
import { useMutationHooks } from "../../hooks/useMutationHook";

function InfoUser() {
  const user = useSelector((state) => state?.user?.currentUser);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    avatar: null,
    fbUrl: "",
    zalo: "",
  });

  useEffect(() => {
    setPayload({
      name: user?.name || "",
      avatar: user?.avatar,
      fbUrl: user?.fbUrl || "",
      zalo: user?.zalo || "",
    });
  }, [user]);

  const mutationUpdatePost = useMutationHooks(async (data) => {
    const { id, payload, access_token } = data;
    const res = await UserService.updateUser(id, payload, access_token);
    return res;
  });

  const handleSubmit = async () => {
    const result = validate(payload, setInvalidFields);
    if (result === 0) {
      await mutationUpdatePost.mutate({
        id: user?.id,
        payload: payload,
        access_token: user?.access_token,
      });
    }
  };

  const handleUploadImage = async (e) => {
    e.stopPropagation();
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "uploadVideo");
    const res = await PostService.uploadImageToCloud(formData);
    if (res.status === 200) {
      setPayload((prev) => ({
        ...prev,
        avatar: res?.data.secure_url,
      }));
    }
  };

  return (
    <div className="px-12 py-8 w-full bg-primary mb-28">
      <h1 className="py-3 text-2xl font-semibold border-b border-gray-300 w-full ">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="mt-10  w-full flex justify-center">
        <div className="w-1/2 flex flex-col gap-5">
          <InputReadOnlyInfo
            label={"Mã thành viên"}
            value={user?.id?.match(/\d/g).join("")?.slice(0, 6)}
          />
          <InputReadOnlyInfo label={"Số điện thoại"} value={user?.phone} />
          <InputFormInfo
            type="name"
            label={"Tên hiển thị"}
            value={payload}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormInfo
            type="zalo"
            label={"Zalo"}
            value={payload}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputFormInfo
            type="fbUrl"
            label={"Facebook"}
            value={payload}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputReadOnlyInfo label={"Đổi mật khẩu"} value="" />
          <div className="w-full flex items-start ">
            <label className="font-bold w-1/4 flex-none">Avatar</label>
            <div>
              <label htmlFor="file" className="">
                <Image
                  src={payload?.avatar}
                  className="w-20 h-20 rounded-[-50] object-cover"
                />
              </label>
              <input
                onChange={handleUploadImage}
                className="mt-4"
                type="file"
                id="file"
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor="bg-blue-500"
            textColor="text-white font-bold"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default InfoUser;
