import SearchItem from "../../components/SearchItem";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { PiPlaceholderLight } from "react-icons/pi";
import { Button } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import * as CityService from "../../services/city";
import * as AreaService from "../../services/area";
import * as PriceService from "../../services/price";
import { getCode } from "../../ultils/Common/getCodes";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";

function Search() {
  const navigate = useNavigate();

  const [dataCate, setDataCate] = useState();
  const [dataCity, setDataCity] = useState();
  const [dataArea, setDataArea] = useState();
  const [dataPrice, setDataPrice] = useState();
  const [queries, setQueries] = useState({});

  const SearchData = [
    {
      title: "Tìm tất cả",
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
    setDataCate(categories?.data);
  }, [categories]);

  useEffect(() => {
    setDataCity(city?.data);
  }, [city]);

  useEffect(() => {
    setDataPrice(price?.data);
  }, [price]);
  useEffect(() => {
    setDataArea(area?.data);
  }, [area]);

  const handleSubmit = useCallback(
    (code) => {
      setQueries((prev) => ({ ...prev, ...code }));
    },
    [queries]
  );

  const handleSearch = () => {
    const queryCodes = Object.entries(queries).filter((item) =>
      item[0].includes("Code")
    );
    let queryCodeObj = {};
    queryCodes.forEach((item) => {
      queryCodeObj[item[0]] = item[1];
    });

    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } ${queryTextObj.province ? `tỉnh ${queryTextObj.province}` : ""} ${
      queryTextObj.price ? `giá ${queryTextObj.price}` : ""
    } ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ""} `;

    const finalQuerryCodeObj = {
      categoryCode: queryCodeObj?.categoriesCode || null,
      cityCode: queryCodeObj?.citiesCode || null,
      priceCode: queryCodeObj?.pricesCode || null,
      areaCode: queryCodeObj?.areasCode || null,
    };

    // console.log("123 ", queries);
    if (finalQuerryCodeObj?.categoryCode === null) {
      navigate(
        {
          pathname: "/",
          search: createSearchParams(finalQuerryCodeObj).toString(),
        },
        { state: { titleSearch } }
      );
    } else {
      navigate(
        {
          pathname: `/${formatVietnameseToString(queries?.categories)}`,
          search: createSearchParams(finalQuerryCodeObj).toString(),
        },
        { state: { titleSearch } }
      );
    }

    // console.log("123123 ", queryCodeObj);
    // console.log("finalQuerryCodeObj ", finalQuerryCodeObj);
  };

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
                queries={queries}
                handleSubmit={handleSubmit}
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
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
