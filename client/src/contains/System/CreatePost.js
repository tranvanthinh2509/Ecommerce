import { useEffect, useState } from "react";
import Address from "../../components/Address";
import OverView from "../../Overview";
import { FcCamera } from "react-icons/fc";
import * as PostService from "../../services/post";
import { Button, Image } from "../../components";
import { RiDeleteBinFill } from "react-icons/ri";
import Loading from "../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { getCodes1 } from "../../ultils/Common/getCodes";
function CreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    star: "",
    priceNumber: 0,
    areaNumber: 0,
    image: "",
    address: "",
    priceCode: "",
    areaCode: "",
    description: "",
    target: "",
    province: "",
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [areaArr, setAreaArr] = useState([]);
  const [priceArr, setPriceArr] = useState([]);

  const { data: prices } = useQuery({
    queryKey: ["Price"],
  });

  const { data: areas } = useQuery({
    queryKey: ["Area"],
  });

  useEffect(() => {
    setPriceArr(prices?.data);
  }, [prices]);

  useEffect(() => {
    setAreaArr(areas?.data);
  }, [areas]);

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    e.stopPropagation();
    const files = e.target.files;

    let images = [];
    const formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", "uploadVideo");
      const res = await PostService.uploadImageToCloud(formData);
      if (res?.status === 200) images = [...images, res?.data?.url];
    }
    setIsLoading(false);

    setImagesPreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({ ...prev, image: [...payload.image, ...images] }));
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      image: payload.image?.filter((item) => item !== image),
    }));
  };
  const handleSubmit = () => {
    let priceCodeArr = getCodes1(+payload?.priceNumber, priceArr, 1, 15);
    let priceCode = priceCodeArr && priceCodeArr[0]?.code;

    // let areaCodeArr = getCodes1(+payload?.areaNumber, areaArr, 20, 90);
    // let areaCode = areaCodeArr && areaCodeArr[0]?.code;

    let finalPayload = {
      ...payload,
      priceCode,
      // areaCode,
    };

    console.log("final ", finalPayload);
  };

  return (
    <div className="px-12 py-8 w-full bg-primary mb-28">
      <h1 className="py-3 text-2xl font-semibold border-b border-gray-300 w-full">
        Đăng tin mới
      </h1>
      <div className="flex gap-3">
        <div className="flex-auto">
          <Address payload={payload} setPayload={setPayload} />
          <OverView payload={payload} setPayload={setPayload} />
          <div className="w-full mt-2">
            <h2 className="font-bold ">Hình ảnh</h2>
            <small className="italic text-[-14] ">
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </small>
            <div className="w-full">
              <label
                htmlFor="file"
                className="w-full h-48 border-2 border-gray-400 border-dashed flex flex-col items-center justify-center font-bold uppercase rounded-md"
              >
                {isLoading ? (
                  <Loading isPending={true} />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span>
                      <FcCamera fontSize="100px" />
                    </span>
                    thêm ảnh
                  </div>
                )}
              </label>

              <input
                onChange={handleUploadImage}
                hidden
                type="file"
                id="file"
                multiple
              />
              <div className="mt-3">
                <h2 className="font-bold">Ảnh đã chọn</h2>
                <div className="flex items-center gap-3 mt-3">
                  {imagesPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-32 h-32 ">
                        <Image
                          src={item}
                          className="w-full h- h-full object-cover rounded-lg"
                        />
                        <span
                          title="xóa"
                          className="absolute top-1 right-1 p-2 rounded-[-50] bg-gray-400 hover:bg-gray-500"
                          onClick={() => handleDeleteImage(item)}
                        >
                          <RiDeleteBinFill fontSize="16px" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button
                text="Đăng tin"
                bgColor="bg-green-500 mt-10"
                textColor="text-white"
                fullWidth={true}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 ">
          Map
          <Loading isPending={true} />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
