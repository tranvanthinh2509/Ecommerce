import { MenuItem } from "./index";

function Menu({ MenuUser = [] }) {
  return (
    <div className="min-w-40 bg-white py-4 px-5 shadow-xl rounded-md relative z-50">
      {MenuUser &&
        MenuUser.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            onClick={() => {
              if (item?.separate) {
                item.separate();
              }
            }}
          />
        ))}
    </div>
  );
}

export default Menu;
