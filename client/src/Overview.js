import { useQuery } from "@tanstack/react-query";
import SelectOverview from "./components/SelectOverview";
import InputOverview from "./components/InputOverview";
import { useSelector } from "react-redux";
import InputIncrease from "./components/InputIncrease";
import AddPicture from "./components/AddPicture";

function OverView({ payload, setPayload }) {
  const gender = [
    {
      code: "male",
      value: "Nam",
    },
    {
      code: "female",
      value: "Nữ",
    },
  ];
  const user = useSelector((state) => state?.user?.currentUser);
  const { data: category } = useQuery({
    queryKey: ["Category"],
  });

  return (
    <div className="mt-6 ">
      <h1 className="text-[-18] font-bold my-2">Thông tin</h1>
      <SelectOverview
        value={payload}
        setValue={setPayload}
        name="categoryCode"
        label="Loại chuyên mục"
        options={category?.data}
      />

      <InputOverview
        label="Tiêu đề"
        type="title"
        value={payload}
        setValue={setPayload}
      />
      <InputOverview
        label="Nội dung mô tả"
        type="description"
        value={payload}
        setValue={setPayload}
      />

      <div className="flex flex-col mt-3 gap-2 w-1/2">
        <label className="font-bold ">Họ và tên</label>
        <input
          type="text"
          readOnly
          className="outline-none border border-gray-300 p-2 rounded-md bg-gray-200"
          value={user?.name}
        />
      </div>
      <div className="flex flex-col mt-3 gap-2 w-1/2">
        <label className="font-bold ">Số điện thoại</label>
        <input
          type="text"
          readOnly
          className="outline-none border border-gray-300 p-2 rounded-md bg-gray-200"
          value={user?.phone}
        />
      </div>
      <InputIncrease
        label="Giá cho thuê"
        unit="đồng"
        value={payload?.priceNumber}
        setValue={setPayload}
        name="priceNumber"
      />
      <InputIncrease
        label="Diện tích"
        unit="m2"
        type={true}
        value={payload?.areaNumber}
        setValue={setPayload}
        name="areaNumber"
      />
      <SelectOverview
        label="Đối tượng"
        options={gender}
        value={payload}
        setValue={setPayload}
        name="target"
      />
    </div>
  );
}

export default OverView;
