import { TbPencilPlus } from "react-icons/tb";
function MenuItem({ data, onClick, ...pastProps }) {
  const props = {
    onClick,
    ...pastProps,
  };
  return (
    <div
      className={`min-w-40 flex items-center text-[-16] py-2.5 text-secondary1 hover:text-red-500 hover:cursor-pointer border-b border-b-gray-200 ${
        data.separate && "border-none"
      }`}
      {...props}
    >
      <span className="text-black">{data.icon}</span>
      <span className=" ml-2">{data.title}</span>
    </div>
  );
}

export default MenuItem;
