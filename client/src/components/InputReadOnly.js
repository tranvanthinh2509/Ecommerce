function InputReadOnlyInfo({ label, value }) {
  return (
    <div className="flex justify-between items-center mt-3 w-full">
      <label className="font-bold w-1/4 flex-none" htmlFor="exactly-address">
        {label}
      </label>
      <input
        type="text"
        id="exactly-address"
        readOnly
        className="outline-none border border-gray-300 p-2 rounded-md bg-gray-200 w-full"
        value={value}
      />
    </div>
  );
}

export default InputReadOnlyInfo;
