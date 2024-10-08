import { Button, Image } from "../../components";

function Support() {
  const data = [
    {
      title: "Hỗ trợ đăng tin",
      phone: "09999999",
      Zalo: "09999999",
    },
    {
      title: "Hỗ trợ thanh toán",
      phone: "09999999",
      Zalo: "09999999",
    },
    {
      title: "Phản ánh khiếu nại",
      phone: "09999999",
      Zalo: "09999999",
    },
  ];
  return (
    <div className="w-full flex justify-center my-7 ">
      <div className="w-1100  min-h-60 bg-white p-7 rounded-lg border-8 border-dashed border-blue-100 text-center">
        <div className="flex justify-center">
          <Image
            src="https://www.jotform.com/blog/wp-content/uploads/2020/05/work-from-home-featured-02.png"
            className="w-80 h-auto object-cover"
          />
        </div>
        <p className="my-4">Liên hệ với chúng tôi nếu bạn cần hỗ trợ</p>
        <div className="flex items-center justify-around">
          {data.map((item) => {
            return (
              <div className="text-center">
                <h2 className="font-bold text-red-700 uppercase">
                  {item.title}
                </h2>
                <p className="font-semibold">
                  Điện thoại : <span>{item.phone}</span>
                </p>
                <p className="font-semibold">
                  Zalo : <span>{item.Zalo}</span>
                </p>
              </div>
            );
          })}
          <Button text="Liên hệ" textColor="text-white" bgColor="bg-blue-700" />
        </div>
      </div>
    </div>
  );
}

export default Support;
