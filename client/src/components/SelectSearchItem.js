import { IoArrowBack } from "react-icons/io5";
import InputRadio from "./InputRadio";

function SelectSearchItem({
  onClick,
  titleDefault,
  data,
  handleSubmit,
  name,
  queries,
}) {
  return (
    <div
      className="block fixed  top-0 left-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-50 z-10"
      onClick={() => {
        onClick();
      }}
    >
      <div
        className=" w-[700]  h-[500] max-h-[500] bg-white mx-auto mt-16 rounded-lg overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="relative  text-center h-11 flex flex-col justify-center border-b border-gray-200">
          <span
            className="absolute top-0 left-0 p-2  "
            onClick={() => {
              onClick();
            }}
          >
            <IoArrowBack fontSize="28px" />
          </span>
          <div className="uppercase font-bold text-[-14]">{titleDefault}</div>
        </div>
        <div className="block py-2.5 px-6 h-[calc(100%-50px)] overflow-y-scroll ">
          {data?.map((item) => {
            return (
              <span className="flex items-center py-3 px-2.5 gap-3 text-[-18] font-bold border-b border-b-gray-200">
                <input
                  type="radio"
                  name={name}
                  id={item?.code}
                  value={item?.value}
                  className="px-3 py-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit({
                      [`${name}`]: item?.value,
                      [`${name}Code`]: item?.code,
                    });
                  }}
                  checked={
                    item?.code === queries?.[`${name}Code`] ? true : false
                  }
                />
                <label htmlFor={item?.code}>{item?.value}</label>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectSearchItem;
