import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { Province } from "../../components";

function Rental() {
  const location = useLocation();
  const [categoryCurrent, setCategoryCurrent] = useState();
  const [categoryCode, setCategoryCode] = useState("none");
  const { data: categories } = useQuery({ queryKey: ["Category"] });

  useEffect(() => {
    if (categories?.data) {
      const category = categories.data.find(
        (item) =>
          `/${formatVietnameseToString(item.value)}` === location.pathname
      );
      setCategoryCurrent(category);
      setCategoryCode(category.code);
    }
  }, [location, categories]);
  //   console.log("categori ", categoryCurrent);
  //   console.log("categori ", categoryCode);
  return (
    <div className="w-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold my-2">{categoryCurrent?.header}</h1>
        <p className="text-[text]">{categoryCurrent?.subheader}</p>
      </div>
      <Province />
    </div>
  );
}

export default Rental;
