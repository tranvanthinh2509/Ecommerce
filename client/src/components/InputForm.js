function InputForm({
  label,
  value,
  setValue,
  type,
  nameKey,
  invalidFields,
  setInvalidFields,
}) {
  return (
    <div>
      <h1>{label}</h1>
      <input
        type={type || "text"}
        className="w-full h-[45] mt-1 outline-none px-2.5 rounded-md bg-input font-bold text-[-24]"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-red-500 italic">
          {invalidFields.find((el) => el.name === nameKey).mes}
        </small>
      )}
    </div>
  );
}

export default InputForm;
