function InputOverview({ label, value, setValue, type }) {
  let Comp = "input";
  if (type === "description") {
    Comp = "textarea";
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      <lable className="font-bold text-black" htmlFor={type}>
        {label}
      </lable>
      <Comp
        id={type}
        value={value?.[type]}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            [type]: e.target.value,
          }))
        }
        className="outline-none border border-gray-300 p-2 rounded-md"
      ></Comp>
    </div>
  );
}

export default InputOverview;
