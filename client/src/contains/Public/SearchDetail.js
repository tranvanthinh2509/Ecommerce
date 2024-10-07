import { useEffect, useState } from "react";
import { ItemSidebar } from "../../components";
import * as PriceService from "../../services/price";
import * as AreaService from "../../services/area";
import { useMutationHooks } from "../../hooks/useMutationHook";
function SearchDetail() {
  const prices = [
    {
      price: "Dưới 1 triệu",
    },
    {
      price: "Từ 1 - 2 triệu",
    },
    {
      price: "Từ 2 - 3 triệu ",
    },
    {
      price: "Từ 3 - 5 triệu",
    },
    {
      price: "Từ 5 - 7 triệu",
    },
    {
      price: "Từ 7 - 10 triệu",
    },
    {
      price: "Từ 10 - 15 triệu",
    },
    {
      price: "Trên 15 triệu",
    },
  ];

  const dientich = [
    {
      price: "Dưới 20 m2",
    },
    {
      price: "Từ 20 - 30 m2",
    },
    {
      price: "Từ 30 - 50 m2 ",
    },
    {
      price: "Từ 50 - 70 m2",
    },
    {
      price: "Từ 70 - 90 m2",
    },
    {
      price: "Trên 90 m2",
    },
  ];

  const [dataPrice, setDataPrice] = useState();
  const [dataArea, setDataArea] = useState();

  const mutationPrice = useMutationHooks(async () => {
    const res = await PriceService.getAllPrice();
    setDataPrice(res.data);
  });

  const mutationArea = useMutationHooks(async () => {
    const res = await AreaService.getAllArea();
    setDataArea(res.data);
  });
  useEffect(() => {
    mutationPrice.mutate();
    mutationArea.mutate();
  }, []);

  console.log(dataArea);
  console.log(dataArea);
  return (
    <div className="flex flex-col gap-5">
      <ItemSidebar content={dataPrice} title="Xem theo giá" />
      <ItemSidebar content={dataArea} title="Xem theo diện tích" />
    </div>
  );
}

export default SearchDetail;
