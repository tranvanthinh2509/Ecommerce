import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function InputForm({
  label,
  value,
  setValue,
  type,
  nameKey,
  invalidFields,
  setInvalidFields,
}) {
  const [lock, setLock] = useState(true);

  const handleLock = () => {
    setLock(!lock);
  };

  return (
    <div>
      <h1>{label}</h1>
      <div className="relative">
        <input
          type={lock ? type : "text"}
          className="w-full h-[45] mt-1 outline-none px-2.5 rounded-md bg-input font-bold text-[-24]"
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
          }
          onFocus={() => {
            setInvalidFields([]);
            setValue((prev) => ({ ...prev, [nameKey]: "" }));
          }}
        />
        {(nameKey === "password" || nameKey === "confirmPassword") &&
          value !== "" &&
          (lock ? (
            <span className="absolute right-5 top-5" onClick={handleLock}>
              <FaEyeSlash />
            </span>
          ) : (
            <span className="absolute right-5 top-5" onClick={handleLock}>
              <IoEyeSharp />
            </span>
          ))}
      </div>
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-red-500 italic">
          {invalidFields.find((el) => el.name === nameKey).mes}
        </small>
      )}
    </div>
  );
}

export default InputForm;
