import { FaRegBuilding } from "react-icons/fa";
import SelectSearchItem from "./SelectSearchItem";
import { useCallback, useState } from "react";
import Button from "./Button";
import { getCodes } from "../ultils/Common/getCodes";

function SearchItem({ titleDefault, icon, data, name, queries, handleSubmit }) {
  const [checkSelect, setCheckSelect] = useState(false);

  const [valueLeft, setValueLeft] = useState(0);
  const [valueRight, setValueRight] = useState(name === "prices" ? 15 : 90);

  const handleCheckSelectOff = () => {
    setCheckSelect(false);
  };

  const handleSubmitCheckSelect = (code) => {
    handleSubmit(code);
    setCheckSelect(false);
  };

  const handleSetValueLR = (value) => {
    if (value.length === 2) {
      setValueLeft(value[0]);
      setValueRight(value[1]);
    } else if (name === "prices") {
      if (value[0] === 1) {
        setValueLeft(0);
        setValueRight(1);
      } else {
        setValueLeft(15);
        setValueRight(15);
      }
    } else if (name === "areas") {
      if (value[0] === 20) {
        setValueLeft(0);
        setValueRight(20);
      } else {
        setValueLeft(90);
        setValueRight(90);
      }
    }
  };

  return (
    <>
      {checkSelect && (
        <SelectSearchItem
          onClick={() => {
            handleCheckSelectOff();
          }}
          titleDefault={titleDefault}
          data={data}
          name={name}
          queries={queries}
          handleSubmit={handleSubmitCheckSelect}
          valueLeft={valueLeft}
          valueRight={valueRight}
          handleSetValue={handleSetValueLR}
        />
      )}

      <div
        onClick={() => {
          setCheckSelect(true);
        }}
        className=" flex-1 bg-white px-2 py-2.5 rounded-lg hover:shadow-xl  "
      >
        <div className="flex items-center gap-2">
          {icon}
          <p
            className={`text-[-14] leading-none  ${
              queries?.[name] ? "font-semibold text-black" : "text-gray-500"
            } overflow-hidden line-clamp-1 w-2/3`}
          >
            {queries?.[name] || titleDefault}
          </p>
        </div>
      </div>
    </>
  );
}

export default SearchItem;
