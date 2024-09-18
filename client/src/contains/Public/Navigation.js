import { NavLink, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as CategoryService from "../../services/category";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

function Navigation() {
  const { data: category } = useQuery({
    queryKey: ["Category"],
    queryFn: CategoryService.getAllCategory,
  });

  return (
    <div className="w-screen  bg-secondary1 text-white flex justify-center">
      <div className="w-1100 flex">
        {category?.data.map((item) => (
          <NavLink
            to={formatVietnameseToString(item.value)}
            className={({ isActive }) => {
              return `px-3 h-10 flex items-center  text-[-14] font-bold ${
                isActive === true && "bg-[-red]"
              } hover:bg-[-red]`;
            }}
          >
            {item.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
// px-3 h-10 flex items-center  text-[-14] font-bold ${{isActive} === true && "bg-[-red]"} hover:bg-[-red]

export default Navigation;
