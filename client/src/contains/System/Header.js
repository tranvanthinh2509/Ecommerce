import { useQuery } from "@tanstack/react-query";
import * as CategoryService from "../../services/category";
import { NavLink, Link } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

function Header() {
  const { data: category } = useQuery({
    queryKey: ["Category"],
    queryFn: CategoryService.getAllCategory,
  });
  return (
    <div className="w-full bg-blue-900 text-white px-4 py-2 flex items-center flex-none">
      <h1 className=" font-bold w-80 flex-none">Phongtro123.com</h1>
      <div className="flex-auto">
        <div className="w-full flex">
          <NavLink
            to={"/"}
            className={({ isActive }) => {
              return `px-3 h-10 flex items-center  text-[-14] font-bold ${
                isActive === true && "text-gray-400"
              } hover:text-gray-400`;
            }}
          >
            Trang chủ
          </NavLink>
          {category?.data.map((item) => (
            <NavLink
              to={`/${formatVietnameseToString(item.value)}`}
              className={({ isActive }) => {
                return `px-3 h-10 flex items-center  text-[-14] font-bold ${
                  isActive === true && "text-gray-400"
                } hover:text-gray-400`;
              }}
            >
              {item.value}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
