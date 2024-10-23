function InputOverview({
  label,
  value,
  setValue,
  type,
  invalidFields,
  setInvalidFields,
}) {
  let Comp = "input";
  if (type === "description") {
    Comp = "textarea";
  }

  const handleError = () => {
    let nameInvalid = invalidFields?.find((item) => item?.name === type);
    return `${nameInvalid ? nameInvalid?.mes : ""}`;
  };

  return (
    <div className={`flex flex-col gap-2 mt-3`}>
      <lable className="font-bold text-black" htmlFor={type}>
        {label}
      </lable>
      <Comp
        id={type}
        value={value?.[type]}
        onFocus={() => {
          setInvalidFields([]);
        }}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            [type]: e.target.value,
          }))
        }
        className="outline-none border border-gray-300 p-2 rounded-md"
      ></Comp>
      <small className="italic text-red-500">{handleError()}</small>
    </div>
  );
}

export default InputOverview;
