import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { Province } from "../../components";
import List from "./List";
import Panigation from "./Panigation";
import Sidebar from "./Sidebar";
import NewPost from "./NewPost";

function Rental() {
  const location = useLocation();
  const [categoryCurrent, setCategoryCurrent] = useState();
  const { data: categories } = useQuery({ queryKey: ["Category"] });
  const [categoryCode, setCategoryCode] = useState("none");

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

  return (
    <div className="w-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold my-2">{categoryCurrent?.header}</h1>
        <p className="text-[text]">{categoryCurrent?.subheader}</p>
      </div>

      <Province />
      <div className="mt-5 w-full flex gap-3">
        <div className="w-2/3 flex flex-col items-center">
          <List code={categoryCode} />
        </div>
        <div className="w-1/3">
          <Sidebar />
          <NewPost />
        </div>
      </div>
    </div>
  );
}

export default Rental;
