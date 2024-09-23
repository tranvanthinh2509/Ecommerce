import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { Province } from "../../components";
import List from "./List";

function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold my-2">Tìm kiếm chỗ thuê ưng ý</h1>
        <p className="text-[text]">
          Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê
          phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+
          tin đăng và 2.500.000 lượt xem mỗi tháng.
        </p>
      </div>
      <Province />
      <div className="mt-5 w-full flex gap-3">
        <div className="w-2/3">
          <List code="home" />
        </div>
        <div className="w-1/3">right</div>
      </div>
    </div>
  );
}

export default HomePage;
