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
import * as PriceService from "../../services/price";
import * as AreaService from "../../services/area";
import { formatPriceToString } from "../../ultils/Common/formatVietnameseToString";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Swal from "sweetalert2";
import { validate } from "../../ultils/func";

function CreatePost() {
  const user = useSelector((state) => state?.user?.currentUser);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    priceNumber: 0,
    areaNumber: 0,
    image: "",
    address: "",
    priceCode: "",
    areaCode: "",
    description: "",
    target: "",
    province: "",
    label: "",
    userId: "",
    category: "",
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [areaArr, setAreaArr] = useState([]);
  const [priceArr, setPriceArr] = useState([]);
  const [invalidFields, setInvalidFields] = useState([]);

  const { data: prices } = useQuery({
    queryKey: ["Price"],
    queryFn: PriceService.getAllPrice,
  });

  const { data: areas } = useQuery({
    queryKey: ["Area"],
    queryFn: AreaService.getAllArea,
  });

  const { data: categories } = useQuery({
    queryKey: ["Category"],
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

  const mutationCreatePost = useMutationHooks(async (data) => {
    const res = await PostService.createPost(data);
    return res;
  });

  const { data, isSuccess, isError } = mutationCreatePost;

  const handleSubmit = async () => {
    let priceCodeArr = getCodes1(
      +payload?.priceNumber / 1000000,
      priceArr,
      1,
      15
    );
    let priceCode = priceCodeArr && priceCodeArr[0]?.code;

    let areaCodeArr = getCodes1(+payload?.areaNumber, areaArr, 20, 90);
    let areaCode = areaCodeArr && areaCodeArr[0]?.code;

    let finalPayload = {
      ...payload,
      priceNumber: formatPriceToString(payload?.priceNumber),
      areaNumber: payload?.areaNumber + " m2",
      priceCode,
      areaCode,
      target: payload.target,
      label:
        categories?.data?.filter(
          (item) => item?.code === payload.categoryCode
        )[0]?.value +
          " " +
          payload.address.split(",")[0] || "",
      userId: user?.id,
      category: categories?.data?.filter(
        (item) => item?.code === payload.categoryCode
      )[0]?.value,
    };

    const result = validate(finalPayload, setInvalidFields);
    console.log(result);
    if (result === 0) {
      setLoading(true);
      await mutationCreatePost.mutate(finalPayload);
    }
  };

  useEffect(() => {
    if (data) {
      if (data?.status === "OK") {
        setLoading(false);
        Swal.fire("Congratulation", data?.msg, "success").then(() => {
          setPayload({
            categoryCode: "",
            title: "",
            priceNumber: 0,
            areaNumber: 0,
            image: "",
            address: "",
            priceCode: "",
            areaCode: "",
            description: "",
            target: "",
            province: "",
            label: "",
            userId: "",
            category: "",
          });
        });
      } else {
        setLoading(false);
        Swal.fire("Opps", "Đăng tin không thành công", "error");
      }
    }

    isError && setLoading(false);
  }, [data, isSuccess, isError]);

  return (
    <div className="px-12 py-8 w-full bg-primary mb-28">
      <h1 className="py-3 text-2xl font-semibold border-b border-gray-300 w-full">
        Đăng tin mới
      </h1>
      <div className="flex gap-3">
        <div className="flex-auto">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <OverView
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full mt-2">
            <h2 className="font-bold ">Hình ảnh</h2>
            <small className="italic text-[-14] ">
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </small>
            <div className="w-full">
              <label
                htmlFor="file"
                onClick={() => {
                  setInvalidFields([]);
                }}
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
              <small className="italic text-red-500">
                {invalidFields?.find((item) => item?.name === "image")
                  ? invalidFields?.find((item) => item?.name === "image")?.mes
                  : ""}
              </small>

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
      {loading && (
        <div className="bg-black fixed top-0 right-0 left-0 bottom-0 opacity-25 flex justify-center items-center">
          <Loading isPending={loading} />
        </div>
      )}
    </div>
  );
}

export default CreatePost;
