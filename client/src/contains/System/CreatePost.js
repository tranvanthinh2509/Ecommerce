import { useState } from "react";
import Address from "../../components/Address";
import OverView from "../../Overview";

function CreatePost() {
  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    star: "",
    priceNumber: 0,
    areaNumber: 0,
    image: "",
    address: "",
    priceCode: "",
    areaCode: "",
    description: "",
    target: "",
    province: "",
  });

  console.log(payload);

  return (
    <div className="px-12 py-8 w-full bg-primary">
      <h1 className="py-3 text-2xl font-semibold border-b border-gray-300 w-full">
        Đăng tin mới
      </h1>
      <div className="flex gap-3">
        <div className="flex-auto">
          <Address payload={payload} setPayload={setPayload} />
          <OverView payload={payload} setPayload={setPayload} />
        </div>
        <div className="w-1/3 ">Map</div>
      </div>
    </div>
  );
}

export default CreatePost;
