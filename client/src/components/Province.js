import Image from "./Image";

function Province() {
  const City = [
    {
      name: "Thành phố Hồ Chí Minh",
      image:
        "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg",
    },
    {
      name: "Thành phố Hà Nội",
      image:
        "https://statics.vincom.com.vn/xu-huong/anh_thumbnail/image4-1671594708.png",
    },
    {
      name: "Thành phố Đà Nẵng",
      image:
        "https://banahills.sunworld.vn/wp-content/uploads/2020/05/image9-2.png",
    },
  ];
  return (
    <div className="w-full mt-1 mb-3">
      <h1 className="text-center py-3 text-[-18] font-bold ">
        Khu vực nổi bật
      </h1>
      <div className="w-full flex justify-center gap-6">
        {City.map((item) => (
          <div className="flex flex-col items-center bg-white rounded-2xl shadow-2xl">
            <Image
              src={item.image}
              className="w-56 h-28 object-cover rounded-t-2xl "
            />
            <p className="py-2 font-semibold text-secondary1">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Province;
