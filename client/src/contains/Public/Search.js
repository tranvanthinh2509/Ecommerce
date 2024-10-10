import SearchItem from "../../components/SearchItem";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiPlaceholderLight } from "react-icons/pi";
import { Button } from "../../components";
function Search() {
  const SearchData = [
    {
      title: "Phòng trọ, nhà trọ",
      icon: <FaRegBuilding />,
    },
    {
      title: "Toàn quốc",
      icon: <MdOutlinePlace />,
    },
    {
      title: "Chọn giá",
      icon: <CiShoppingTag />,
    },
    {
      title: "Diện tích",
      icon: <PiPlaceholderLight />,
    },
  ];

  const handleSearchItem = (title) => {
    console.log(title);
  };
  return (
    <div className="w-full flex justify-center mt-5 ">
      <div className="w-1100 bg-yellow-400 p-2.5 rounded-lg">
        <div className="flex justify-between items-center gap-3">
          {SearchData.map((item) => {
            return (
              <SearchItem
                title={item.title}
                icon={item.icon}
                onClick={() => handleSearchItem(item.title)}
              />
            );
          })}
          <div className="flex-auto">
            <Button
              text="Tìm kiếm"
              bgColor="bg-blue-700"
              fullWidth={true}
              textColor="text-white font-semibold text-[14]"
              icBefore={<HiMiniMagnifyingGlass />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
