function InputForm({ label }) {
  return (
    <div>
      <h1>{label}</h1>
      <input
        type="text"
        className="w-full h-[45] mt-1 outline-none px-2.5 rounded-md bg-input font-bold text-[-24]"
      />
    </div>
  );
}

export default InputForm;
