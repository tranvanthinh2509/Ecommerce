import { useState } from "react";
import { BsCaretUpFill } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";

function InputIncrease({
  label,
  unit,
  type,
  value,
  setValue,
  name,
  invalidFields,
  setInvalidFields,
}) {
  const [check, setCheck] = useState(false);
  const handleError = () => {
    let nameInvalid = invalidFields?.find((item) => item?.name === name);
    return `${nameInvalid ? nameInvalid?.mes : ""}`;
  };
  return (
    <div className="flex flex-col mt-3 gap-2 w-1/2">
      <label className="font-bold ">{label}</label>
      <div className="flex ">
        <input
          type="text"
          className="outline-none border border-gray-300 p-2 rounded-tl-md rounded-bl-md  bg-white flex-1"
          value={value}
          onChange={(e) => {
            if (+e.target.value >= 0) {
              setValue((prev) => ({
                ...prev,
                [name]: e.target.value,
              }));
            }
          }}
          onFocus={() => {
            setInvalidFields([]);
          }}
        ></input>
        <div className="outline-none border border-gray-300 p-2 rounded-tr-md rounded-br-md bg-gray-200 flex-none relative">
          {unit}
          {type && (
            <span
              className={`absolute top-1.5 -left-6   px-0.5 cursor-pointer hover:text-gray-500 ${
                check ? "bg-gray-300" : "bg-gray-200"
              }`}
              onClick={() => {
                setCheck(!check);
                setValue((prev) => ({
                  ...prev,
                  [name]: +value + 1,
                }));
              }}
            >
              <BsCaretUpFill fontSize="12px" />
            </span>
          )}
          {type && (
            <span
              className={`absolute bottom-1.5 -left-6   px-0.5 cursor-pointer hover:text-gray-500 ${
                check ? "bg-gray-300" : "bg-gray-200"
              }`}
              onClick={() => {
                setCheck(!check);
                +value > 0 &&
                  setValue((prev) => ({
                    ...prev,
                    [name]: +value - 1,
                  }));
              }}
            >
              <BsCaretDownFill fontSize="12px" />
            </span>
          )}
        </div>
      </div>
      {!type && (
        <span className="italic text-[-14]  text-gray-700">
          Nếu là 1 triệu thì nhập 1000000
        </span>
      )}
      <small className="italic text-red-500">{handleError()}</small>
    </div>
  );
}

export default InputIncrease;
