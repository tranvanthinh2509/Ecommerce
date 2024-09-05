import { MenuItem } from "./index";

function Menu({ MenuUser = [] }) {
  return (
    <div className="min-w-40 bg-white py-4 px-5 shadow-xl rounded-md">
      {MenuUser && MenuUser.map((item) => <MenuItem data={item} />)}
    </div>
  );
}

export default Menu;
