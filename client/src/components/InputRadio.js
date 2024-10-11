import { useState } from "react";

function InputRadio({ data }) {
  return (
    <span className="flex items-center py-3 px-2.5 gap-3 text-[-18] font-bold border-b border-b-gray-200">
      <input
        type="radio"
        name="name"
        id={data?.code}
        value={data?.value}
        className="px-3 py-2.5"
      />
      <label htmlFor={data?.code}>{data?.value}</label>
    </span>
  );
}

export default InputRadio;
