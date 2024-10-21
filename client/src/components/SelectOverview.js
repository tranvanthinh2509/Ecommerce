import { memo } from "react";

function SelectOverview({
  label,
  options,
  value,
  setValue,
  name,
  type,
  reset,
  invalidFields,
  setInvalidFields,
}) {
  const handleError = () => {
    let nameInvalid = invalidFields?.find((item) => item?.name === name);
    return `${nameInvalid ? nameInvalid?.mes : ""}`;
  };
  return (
    <div className="flex flex-col gap-2 flex-1 w-1/2">
      <lable className="font-bold text-black" htmlFor="select-overview">
        {label}
      </lable>
      <select
        id="select-overview"
        className="outline-none border border-gray-300 p-2 rounded-md"
        value={reset ? "" : value?.[name]}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }
        onFocus={() => {
          setInvalidFields([]);
        }}
      >
        <option value="">{`--Chọn ${
          name === "target" ? "tất cả" : label
        }--`}</option>
        {options?.map((item) => {
          return (
            <option key={item?.code} value={item?.code} id={item?.code}>
              {item?.value}
            </option>
          );
        })}
      </select>
      <small className="italic text-red-500">{handleError()}</small>
    </div>
  );
}

export default memo(SelectOverview);
