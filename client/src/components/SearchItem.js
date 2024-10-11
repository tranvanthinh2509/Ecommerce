import { FaRegBuilding } from "react-icons/fa";
import SelectSearchItem from "./SelectSearchItem";
import { useState } from "react";

function SearchItem({ titleDefault, icon, data, name }) {
  const [checkSelect, setCheckSelect] = useState(false);
  const [queries, setQueries] = useState({
    categories: "",
    cities: "",
    prices: "",
    areas: "",
  });

  const handleCheckSelectOff = () => {
    setCheckSelect(false);
  };

  const handleSubmit = (code) => {
    setQueries((prev) => ({ ...prev, ...code }));
    setCheckSelect(false);
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
          handleSubmit={handleSubmit}
          name={name}
          queries={queries}
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
