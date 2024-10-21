import { memo } from "react";

function SelectAddress({
  invalidFields,
  setInvalidFields,
  label,
  options,
  value,
  setValue,
  type,
  reset,
}) {
  const handleError = () => {
    let nameInvalid = invalidFields?.find((item) => item?.name === "address");

    return `${nameInvalid ? nameInvalid?.mes : ""}`;
  };
  return (
    <div className="flex flex-col gap-2 flex-1">
      <lable className="font-bold text-black" htmlFor="select-address">
        {label}
      </lable>
      <select
        id="select-address"
        className="outline-none border border-gray-300 p-2 rounded-md"
        value={reset ? "" : value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => {
          setInvalidFields([]);
        }}
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map((item) => {
          return (
            <option
              key={type === "province" ? item?.province_id : item?.district_id}
              value={
                type === "province" ? item?.province_id : item?.district_id
              }
              id={item?.province_id}
            >
              {type === "province" ? item?.province_name : item?.district_name}
            </option>
          );
        })}
      </select>
      <small className="italic text-red-500">{handleError()}</small>
    </div>
  );
}

export default memo(SelectAddress);
