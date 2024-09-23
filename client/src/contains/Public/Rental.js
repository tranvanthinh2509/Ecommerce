import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { Province } from "../../components";
import List from "./List";
import Panigation from "./Panigation";

function Rental() {
  const location = useLocation();
  const [categoryCurrent, setCategoryCurrent] = useState();
  const [categoryCode, setCategoryCode] = useState("none");
  const { data: categories } = useQuery({ queryKey: ["Category"] });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    setPage(1);
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
  // console.log("categori ", categoryCode);
  return (
    <div className="w-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold my-2">{categoryCurrent?.header}</h1>
        <p className="text-[text]">{categoryCurrent?.subheader}</p>
      </div>

      <Province />
      <div className="mt-5 w-full flex gap-3">
        <div className="w-2/3 flex flex-col items-center">
          <List code={categoryCode} page={page} />
          <div className="my-3">
            <Panigation total={80} sizePage={8} page={page} setPage={setPage} />
          </div>
        </div>
        <div className="w-1/3">right</div>
      </div>
    </div>
  );
}

export default Rental;
