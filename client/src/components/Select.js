function Select({ options, value, setValue, type, reset }) {
  return (
    <div className="flex flex-col gap-2 flex-1 w-1/2">
      <select
        id="select-address"
        className="outline-none border bg-gray-500 border-gray-500 font-semibold text-white p-2 rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {type !== "filterStatus" && (
          <option
            value="home"
            className="bg-white text-black"
          >{`Tất cả`}</option>
        )}
        {options?.map((item) => {
          return (
            <option
              key={item?.code}
              value={item?.code}
              id={item?.code}
              className="bg-white text-black"
            >
              {item?.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
