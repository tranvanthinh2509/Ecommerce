import { IoArrowBack } from "react-icons/io5";
import InputRadio from "./InputRadio";
import ReactSlider from "react-slider";
import { useState } from "react";
import Button from "../components/Button";
import { getNumbers } from "../ultils/Common/getNumbers";
import { getCodes } from "../ultils/Common/getCodes";

function SelectSearchItem({
  onClick,
  titleDefault,
  data,
  handleSubmit,
  name,
  queries,
  valueLeft,
  valueRight,
  handleSetValue,
}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(name === "prices" ? 15 : 90);

  // const getNumbers = (string) => {
  //   let arr = string.split(" ");
  //   return arr.map((item) => +item).filter((item) => !item === false);
  // };

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
        <div className="block py-2.5 px-6 h-[calc(100%-50px)]  ">
          {(name === "categories" || name === "cities") && (
            <div>
              <span className="flex items-center py-3 px-2.5 gap-3 text-[-18] font-bold border-b border-b-gray-200">
                <input
                  type="radio"
                  name={name}
                  id="default"
                  value={titleDefault}
                  className="px-3 py-2.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmit({
                      [`${name}`]: titleDefault,
                      [`${name}Code`]: null,
                    });
                  }}
                  checked={!queries?.[`${name}Code`] ? true : false}
                />
                <label htmlFor="default">{titleDefault}</label>
              </span>
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
          )}
          {(name === "prices" || name === "areas") && (
            <div className="h-full grid grid-cols-1 content-between ">
              <div className="relative mt-4">
                <div className="my-10 text-center text-2xl font-medium text-yellow-500">
                  {`${
                    valueLeft === valueRight
                      ? `Trên ${valueRight} ${
                          name === "prices" ? "triệu" : "m2"
                        }`
                      : `Từ ${valueLeft} đến ${valueRight} ${
                          name === "prices" ? "triệu" : "m2"
                        }`
                  }`}
                </div>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  value={[valueLeft, valueRight]}
                  max={max}
                  min={min}
                  step={0.1}
                  renderThumb={(props, state) => (
                    <div {...props}>{state.valueNow}</div>
                  )}
                  onChange={(value, index) => {
                    handleSetValue(value);
                  }}
                />
                <span
                  className="absolute -bottom-2 left-2 cursor-pointer"
                  onClick={() => {
                    handleSetValue([0, valueRight]);
                  }}
                >
                  {min}
                </span>
                <span
                  className="absolute -bottom-2 -right-3 cursor-pointer"
                  onClick={() => {
                    handleSetValue([valueLeft, name === "prices" ? 15 : 90]);
                  }}
                >
                  {`${max} ${name === "prices" ? "triệu" : "m2"}`}
                </span>
              </div>

              <div className="flex flex-wrap gap-4  ">
                {data?.map((item) => {
                  return (
                    <div
                      className={`px-2 py-1 bg-gray-200 rounded-md cursor-pointer ${
                        item?.code === queries?.[`${name}Code`] &&
                        "bg-secondary1 text-white"
                      }`}
                      onClick={(e) => {
                        handleSetValue(getNumbers(item?.value));
                        e.stopPropagation();
                        handleSubmit({
                          [`${name}`]: item?.value,
                          [`${name}Code`]: item?.code,
                        });
                      }}
                    >
                      {item?.value}
                    </div>
                  );
                })}
              </div>

              <Button
                text="ÁP DỤNG"
                fullWidth={true}
                bgColor="bg-yellow-500 font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  // handleSubmit({
                  //   [`${name}`]: `${
                  //     valueLeft === valueRight
                  //       ? ` trên ${valueRight} ${
                  //           name === "prices" ? "triệu" : "m2"
                  //         }`
                  //       : `${valueLeft} đến ${valueRight} ${
                  //           name === "prices" ? "triệu" : "m2"
                  //         }`
                  //   }`,
                  //   [`${name}Code`]: [valueLeft, valueRight],
                  // });

                  const gaps =
                    name === "prices" || name === "areas"
                      ? getCodes([valueLeft, valueRight], data)
                      : [];
                  handleSubmit({
                    [`${name}`]: `${
                      valueLeft === valueRight
                        ? ` Trên ${valueRight} ${
                            name === "prices" ? "triệu" : "m2"
                          }`
                        : `Từ ${valueLeft} đến ${valueRight} ${
                            name === "prices" ? "triệu" : "m2"
                          }`
                    }`,
                    [`${name}Code`]: gaps?.map((item) => item.code),
                  });
                }}
              />
            </div>
          )}

          {/* <span className="flex items-center py-3 px-2.5 gap-3 text-[-18] font-bold border-b border-b-gray-200">
            
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default SelectSearchItem;
