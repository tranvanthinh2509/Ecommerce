function InputFormInfo({
  label,
  value,
  setValue,
  type,
  invalidFields,
  setInvalidFields,
}) {
  const handleError = () => {
    let nameInvalid = invalidFields?.find((item) => item?.name === type);
    return `${nameInvalid ? nameInvalid?.mes : ""}`;
  };
  return (
    <div className="flex justify-between items-start mt-3 w-full">
      <label className="font-bold w-1/4 flex-none" htmlFor="exactly-address">
        {label}
      </label>
      <div className="flex flex-col w-full">
        <input
          id={type}
          value={value?.[type]}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              [type]: e.target.value,
            }))
          }
          onFocus={() => {
            setInvalidFields([]);
          }}
          className="outline-none border border-gray-300 p-2 rounded-md bg-white w-full"
        />
        <small className="italic text-red-500">{handleError()}</small>
      </div>
    </div>
  );
}

export default InputFormInfo;
