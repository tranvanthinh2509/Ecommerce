import Image from "./Image";
import { GrStar } from "react-icons/gr";
function Item() {
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={18} color="yellow" />);
    return stars;
  };
  return (
    <div className="w-full flex items-start gap-2 px-5 py-3 border-y border-y-red-500">
      <div className="w-2/5">
        <Image
          src="https://vinhomecoloa.com/wp-content/uploads/2021/11/gia-nha-vinhomes-ha-noi-bao-nhieu-tien.jpg"
          className="w-[280] h-[240] object-cover"
        />
      </div>
      <div className="w-3/5">
        <div className="flex w-full">
          <div className="text-red-600 font-medium h-12 overflow-hidden text-ellipsis">
            <span className="">
              GẦN TRƯỜNG GTVT, NGOẠI THƯƠNG, HUTECH, HỒNG BÀNG, UEF - AN
              NINH,TIỆN NGHI - TT Q.BÌNH THẠNH ĐƯỜNG UNG VĂN KHIÊM
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-green-600">4.5 triệu/tháng</p>
              <p>30m2</p>
            </div>
            <p>Thành phố đà nẵng</p>
          </div>
          <p className="flex">
            {handleStar(+5).length > 0 &&
              handleStar(+5).map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
          </p>
        </div>
        <p className="text-gray-500 w-full h-[50px]  text-ellipsis overflow-hidden ">
          - Để đảm bảo an ninh cho Sinh Viên ở Ngõ Sen giờ hoạt động từ 6h - 24h
          (không có giờ tự do), ra vào cổng bằng khóa vân tay. - Đ/c: Ngõ Sen
          97/15, Ung Văn Khiêm, Phường 25, Bình Thạnh (vào hẻm 97 Ung Văn Khiêm
          chạy thẳng là gặp Ngõ Sen) - Vị trí rất thuận tiện, gần các trường ĐH
          GTVT (cách 600m đi bộ 8', đi xe 2'), ĐH Ngoại Thương (cách 800m đi bộ
          10', đi xe 3'), ĐH Hutech, ĐH Quốc tế Hồng Bàng, Landmark 81... - Tiện
          ích xung quanh đầy đủ: chợ, cửa hàng tiện lợi, cây xăng, ATM, quán
          xá,... - Hẻm xe hơi, khuôn viên rộng rãi thoáng mát. - Hệ thống PCCC,
          an ninh đầy đủ. - Thích hợp cho sinh viên và NVVP.
          ----------------------------- TIỆN ÍCH - Phòng thoáng mát, sạch sẽ,
          cộng đồng sống văn minh, lịch sự và khu dân cư yên tĩnh - Có kệ bếp,
          bồn rửa, nhà vệ sinh rộng rãi. Đồng hồ điện nước riêng - Khu phòng có
          thang máy, chỗ để xe, cửa vân tay, bảo vệ,... - Miễn phí internet,
          nhân viên vệ sinh lau dọn khu vực chung hàng ngày. - Phòng mới trống
          sẵn, vào ở được liền. - PHÒNG VIP 6tr5 CẦN 1 BẠN NAM Ở GHÉP
          ------------------------------- GIÁ THUÊ: - Phòng 4tr5 - 5tr đồ cơ bản
          (25m - 35m) - Phòng 5tr5 - 6tr5 đầy đủ tiện nghi: có máy lạnh, tủ
          lạnh, bếp nấu ăn,... (20m - 30m) ---------------------------- LH
          hotline: 0909814679 (Chị Ánh), 0909281128 (Chị Ly) Chính chủ cho thuê,
          không qua trung gian. Clip video phòng giá 6tr5
        </p>
        <div>
          <div className="flex items-center gap-2 ">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-NGEQDekk2BwsllLjk4tcIM_BPIzXECdsg&s"
              className="w-8 h-8 object-cover rounded-[-50]"
            />
            <span>Ronaldo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
