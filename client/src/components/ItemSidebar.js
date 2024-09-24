import { FaChevronRight } from "react-icons/fa";

function ItemSidebar({ title, prices }) {
  return (
    <div className="w-full px-3 py-3 bg-white rounded-lg border border-gray-300">
      <h1 className="font-bold">{title}</h1>
      <div className="grid grid-cols-2">
        {prices.map((item, index) => {
          return (
            <div className=" w-full flex items-center gap-3 border-b py-2 px-2 border-gray-300 border-dashed ">
              <FaChevronRight fontSize="10px" color="#ccc" />
              <span className="text-[-16] text-[text] hover:text-[-red]">
                {item.price}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemSidebar;
