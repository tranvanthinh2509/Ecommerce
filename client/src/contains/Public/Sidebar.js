import { useEffect, useState } from "react";
import { ItemSidebar } from "../../components";
import * as PriceService from "../../services/price";
import * as AreaService from "../../services/area";
import { useMutationHooks } from "../../hooks/useMutationHook";
function Sidebar() {
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

  return (
    <div className="flex flex-col gap-5">
      <ItemSidebar content={dataPrice} title="Xem theo giá" type="priceCode" />
      <ItemSidebar
        content={dataArea}
        title="Xem theo diện tích"
        type="areaCode"
      />
    </div>
  );
}

export default Sidebar;
