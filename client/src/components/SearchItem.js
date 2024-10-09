import { FaRegBuilding } from "react-icons/fa";

function SearchItem({ title, icon }) {
  return (
    <div className=" flex-auto bg-white px-2 py-2.5 rounded-lg hover:shadow-xl">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-[-14] leading-none font-semibold">{title}</p>
      </div>
    </div>
  );
}

export default SearchItem;
