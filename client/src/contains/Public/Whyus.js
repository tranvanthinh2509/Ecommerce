import { GrStar } from "react-icons/gr";
import { Button } from "../../components";

function Whyus() {
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={22} color="yellow" />);
    return stars;
  };
  return (
    <div className="mt-5 w-full flex justify-center">
      <div className=" bg-white w-1100 rounded-lg border border-gray-300 p-5">
        <div className="px-12 py-5 text-center">
          <h1 className="text-[-18] font-semibold">
            Tại sao lại chọn Phongtro123.com?
          </h1>
          <p className="mt-2 italic text-[-16]">
            Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự
            hào là trang web đứng top google về các từ khóa: cho thuê phòng trọ,
            nhà trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép, cho
            thuê mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận
            được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm
            chi phí hơn
          </p>
          <div className="flex items-center justify-around my-5">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">999999+</h2>
              <p className="text-[-14]">Thành viên</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">999999+</h2>
              <p className="text-[-14]">Thành viên</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">999999+</h2>
              <p className="text-[-14]">Thành viên</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">999999+</h2>
              <p className="text-[-14]">Thành viên</p>
            </div>
          </div>
          <h1 className="text-[-18] font-semibold">
            Chi phí thấp, hiệu quả tối đa
          </h1>
          <p className="flex justify-center mt-2">
            {handleStar(+"5").length > 0 &&
              handleStar(+"5").map((star, number) => {
                return <span key={number}>{star}</span>;
              })}
          </p>
          <p className="mt-2 italic text-[-16]">
            "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
            chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy,
            và đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
            website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu
            quả khá cao trong khi chi phí khá thấp, không còn tình trạng phòng
            trống kéo dài."
          </p>
          <h1 className="text-[-18] font-semibold my-5 ">
            Bạn đang có phòng trọ / căn hộ cho thuê?
          </h1>
          <p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
          <div className="flex justify-center my-5">
            <Button
              text="Đăng tin ngay"
              textColor="text-white"
              bgColor="bg-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whyus;
