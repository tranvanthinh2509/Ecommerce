import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as PostService from "../../services/post";
import SliderCustom from "../../components/SliderCustom";
import { IoLocationSharp } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { PiPlaceholderLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import moment from "moment";
import { Map } from "mapbox-gl";
function PageDetail() {
  const params = useParams();
  const [postItem, setPostItem] = useState();

  const mutationDetailPost = useMutationHooks(async (data) => {
    const { pid } = data;
    const res = await PostService.getDetailPost(pid);
    setPostItem(res?.data);
    return res;
  });

  useEffect(() => {
    if (params?.postId) {
      mutationDetailPost.mutate({ pid: params?.postId });
    }
  }, [params]);
  console.log("123 ", postItem);

  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  return (
    <div className="w-full flex gap-3">
      <div className="w-2/3">
        <div className="bg-white mb-12">
          <SliderCustom images={postItem?.images.image} />
          <div className="px-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-red-600">
              {postItem?.title}
            </h1>
            <span className="flex items-center gap-2">
              <IoLocationSharp color="blue" fontSize="20px" />
              <span>Địa chỉ: {postItem?.address}</span>
            </span>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xl font-bold">
                <GiMoneyStack />
                <span className="text-green-600">
                  {postItem?.attributes?.price}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <PiPlaceholderLight />
                <span className="text-gray-600">
                  {postItem?.attributes?.acreage?.trim()}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <CiClock2 />
                <span className="text-gray-600">
                  {formatTime(postItem?.createdAt)}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-gray-600">
                  {postItem?.overviews?.code}
                </span>
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Thông tin mô tả</h1>
              <p className="text-[-18]">{postItem?.description}</p>
            </div>
            <div>
              <h1 className="text-xl font-bold">Đặc điểm tin đăng</h1>
              <div className="flex items-center p-2">
                <span className="w-1/4">Mã tin: </span>
                <span className="w-3/4">{postItem?.overviews?.code}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-100">
                <span className="w-1/4">Chuyên mục: </span>
                <span className="w-3/4">{postItem?.overviews?.area}</span>
              </div>
              <div className="flex items-center p-2">
                <span className="w-1/4">Khu vực: </span>
                <span className="w-3/4">{postItem?.overviews?.area}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-100">
                <span className="w-1/4">Loại tin rao: </span>
                <span className="w-3/4">{postItem?.overviews?.type}</span>
              </div>
              <div className="flex items-center p-2">
                <span className="w-1/4">Đối tượng thuê: </span>
                <span className="w-3/4">{postItem?.overviews?.target}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-100">
                <span className="w-1/4">Gói tin: </span>
                <span className="w-3/4">{postItem?.overviews?.bonus}</span>
              </div>
              <div className="flex items-center p-2">
                <span className="w-1/4">Ngày đăng: </span>
                <span className="w-3/4">{postItem?.overviews?.created}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-100">
                <span className="w-1/4">Ngày hết hạn: </span>
                <span className="w-3/4">{postItem?.overviews?.expire}</span>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold">Thông tin liên hệ</h1>
              <div className="flex items-center p-2">
                <span className="w-1/4">Liên hệ: </span>
                <span className="w-3/4">{postItem?.user?.name}</span>
              </div>
              <div className="flex items-center p-2 bg-gray-100">
                <span className="w-1/4">Số điện thoại: </span>
                <span className="w-3/4">{postItem?.user?.phone}</span>
              </div>
              <div className="flex items-center p-2">
                <span className="w-1/4">Zalo: </span>
                <span className="w-3/4">{postItem?.user?.zalo}</span>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold">Bản đồ</h1>
              {/* <div>
                <Map
                  mapLib={import("mapbox-gl")}
                  initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5,
                  }}
                  style={{ width: 600, height: 400 }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3">Side bar</div>
    </div>
  );
}

export default PageDetail;
