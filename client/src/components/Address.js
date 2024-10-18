import SelectAddress from "./SelectAddress";
import { memo, useEffect, useState } from "react";
import * as ProvinceService from "../services/province";

function Address({ payload, setPayload }) {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  const [reset, setReset] = useState(false);
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
          label="Tỉnh/Thành phố"
          options={provinces}
          value={province}
          setValue={setProvince}
          type="province"
        />
        <SelectAddress
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
