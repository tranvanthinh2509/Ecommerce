import SearchItem from "../../components/SearchItem";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiPlaceholderLight } from "react-icons/pi";
import { Button } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as CityService from "../../services/city";
import * as AreaService from "../../services/area";
import * as PriceService from "../../services/price";
function Search() {
  const [dataCate, setDataCate] = useState();
  const [dataCity, setDataCity] = useState();
  const [dataArea, setDataArea] = useState();
  const [dataPrice, setDataPrice] = useState();

  const SearchData = [
    {
      title: "Phòng trọ, nhà trọ",
      icon: <FaRegBuilding />,
      name: "categories",

      data: dataCate,
    },
    {
      title: "Toàn quốc",
      icon: <MdOutlinePlace />,

      name: "cities",
      data: dataCity,
    },
    {
      title: "Chọn giá",
      icon: <CiShoppingTag />,
      name: "prices",
      data: dataPrice,
    },
    {
      title: "Diện tích",
      icon: <PiPlaceholderLight />,
      name: "areas",
      data: dataArea,
    },
  ];

  const { data: categories } = useQuery({ queryKey: ["Category"] });
  const { data: city } = useQuery({
    queryKey: ["City"],
    queryFn: CityService.getAllCity,
  });
  const { data: price } = useQuery({
    queryKey: ["Price"],
    queryFn: PriceService.getAllPrice,
  });
  const { data: area } = useQuery({
    queryKey: ["Area"],
    queryFn: AreaService.getAllArea,
  });
  useEffect(() => {
    // console.log("categories ", categories);
    setDataCate(categories?.data);
  }, [categories]);

  useEffect(() => {
    // console.log("categories ", categories);
    setDataCity(city?.data);
  }, [city]);

  useEffect(() => {
    // console.log("categories ", categories);
    setDataPrice(price?.data);
  }, [price]);
  useEffect(() => {
    // console.log("categories ", categories);
    setDataArea(area?.data);
  }, [area]);
  // console.log("data ", dataCate);

  return (
    <div className="w-full flex justify-center mt-5 ">
      <div className="w-1100 bg-yellow-400 p-2.5 rounded-lg">
        <div className="flex justify-between items-center gap-3">
          {SearchData.map((item) => {
            return (
              <SearchItem
                titleDefault={item.title}
                name={item.name}
                icon={item.icon}
                data={item?.data}
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
