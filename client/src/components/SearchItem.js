import { FaRegBuilding } from "react-icons/fa";
import SelectSearchItem from "./SelectSearchItem";
import { useState } from "react";

function SearchItem({ title, icon, onClick }) {
  const [checkSelect, setCheckSelect] = useState(false);

  const handleCheckSelectOff = () => {
    setCheckSelect(false);
  };

  return (
    <>
      {checkSelect && (
        <SelectSearchItem
          onClick={() => {
            handleCheckSelectOff();
          }}
        />
      )}

      <div
        onClick={() => {
          onClick();
          setCheckSelect(true);
        }}
        className=" flex-auto bg-white px-2 py-2.5 rounded-lg hover:shadow-xl"
      >
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-[-14] leading-none font-semibold">{title}</p>
        </div>
      </div>
    </>
  );
}

export default SearchItem;
