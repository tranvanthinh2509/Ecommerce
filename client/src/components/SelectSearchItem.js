import { IoArrowBack } from "react-icons/io5";

function SelectSearchItem({ onClick }) {
  return (
    <div
      className="block fixed  top-0 left-0 bottom-0 right-0 w-screen h-screen bg-black bg-opacity-30 z-10"
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
        <div className="relative  text-center h-11 flex flex-col justify-center">
          <span
            className="absolute top-0 left-0 p-2  "
            onClick={() => {
              onClick();
            }}
          >
            <IoArrowBack fontSize="28px" />
          </span>
          <div className="uppercase font-semibold">Header</div>
        </div>
        <div className="block py-2.5 px-6 h-[calc(100%-50px)] overflow-y-scroll ">
          <div>Oke</div>
          <div>Oke</div>
          <div>Oke</div>
          <div>Oke</div>
          <div>Oke</div>
          <div>Oke</div>
          <div>Oke</div>
          <div>Oke</div>
        </div>
      </div>
    </div>
  );
}

export default SelectSearchItem;
