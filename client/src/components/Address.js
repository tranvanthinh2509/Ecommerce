import SelectAddress from "./SelectAddress";
import { memo, useEffect, useState } from "react";
import * as ProvinceService from "../services/province";
import { useSelector } from "react-redux";

function Address({ invalidFields, setInvalidFields, payload, setPayload }) {
  const dataEdit = useSelector((state) => state?.post?.postItem);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    let addressArr = dataEdit?.address?.split(",");

    let foundProvince =
      dataEdit &&
      provinces?.length > 0 &&
      provinces?.find((item) =>
        item.province_name.includes(addressArr[addressArr?.length - 1]?.trim())
      );
    setProvince(foundProvince ? foundProvince.province_id : "");
  }, [provinces]);

  useEffect(() => {
    let addressArr = dataEdit?.address?.split(",");
    let foundDisctric =
      dataEdit &&
      districts?.length > 0 &&
      districts?.find((item) =>
        item.district_name.includes(addressArr[addressArr?.length - 2]?.trim())
      );
    setDistrict(foundDisctric ? foundDisctric.district_id : "");
  }, [districts]);

  useEffect(() => {
    getAllProvince();
  }, []);

  useEffect(() => {
    province && getAllDictrict(province);

    if (!province) {
      setDistrict();
      setDistricts([]);
      setReset(true);
    } else {
      setReset(false);
    }
  }, [province]);

  const getAllProvince = async () => {
    const res = await ProvinceService.getProvince();
    setProvinces(res);
  };

  const getAllDictrict = async (id) => {
    const res = await ProvinceService.getDictrict(id);
    setDistricts(res);
  };

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${
        district
          ? `${
              districts?.find((item) => item?.district_id === district)
                ?.district_name
            }, `
          : ""
      }${
        province
          ? `${
              provinces?.find((item) => item?.province_id === province)
                ?.province_name
            }`
          : ""
      }`,
      province: `${
        province
          ? `${
              provinces?.find((item) => item?.province_id === province)
                ?.province_name
            }`
          : ""
      }`,
    }));
  }, [province, district]);
  return (
    <div className="mt-8">
      <h1 className="text-[-18] font-bold my-2">Địa chỉ cho thuê</h1>
      <div className="flex gap-4">
        <SelectAddress
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label="Tỉnh/Thành phố"
          options={provinces}
          value={province}
          setValue={setProvince}
          type="province"
        />
        <SelectAddress
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          label="Quận/Huyện"
          type="district"
          options={districts}
          value={district}
          setValue={setDistrict}
          reset={reset}
        />
      </div>

      <div className="flex flex-col mt-3 gap-2">
        <label className="font-medium " htmlFor="exactly-address">
          Địa chỉ chính xác
        </label>
        <input
          type="text"
          id="exactly-address"
          readOnly
          className="outline-none border border-gray-300 p-2 rounded-md bg-gray-200"
          value={`${
            district
              ? `${
                  districts?.find((item) => item?.district_id === district)
                    ?.district_name
                },`
              : " "
          } ${
            province
              ? `${
                  provinces?.find((item) => item?.province_id === province)
                    ?.province_name
                }`
              : " "
          }`}
        />
      </div>
    </div>
  );
}

export default memo(Address);
