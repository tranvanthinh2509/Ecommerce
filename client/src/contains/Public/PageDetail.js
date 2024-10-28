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
import { Button, Image } from "../../components";
import { FaPhoneAlt } from "react-icons/fa";
import NewPost from "./NewPost";
import Loading from "../../components/Loading";

function PageDetail() {
  const params = useParams();
  console.log("123 ", params);
  const [postItem, setPostItem] = useState();

  const mutationDetailPost = useMutationHooks(async (data) => {
    const { pid } = data;
    const res = await PostService.getDetailPost(pid);
    setPostItem(res?.data);
    return res;
  });

  const { isPending } = mutationDetailPost;

  useEffect(() => {
    if (params?.postId) {
      mutationDetailPost.mutate({ pid: params?.postId });
    }
  }, [params]);

  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  window.scrollTo(0, 0);
  return (
    <div className="w-full flex gap-3 ">
      {isPending && <Loading isPending={isPending} fullScreen />}
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

            <div className="mb-10">
              <h1 className="text-xl font-bold">Bản đồ</h1>
              <div className="mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0845870453127!2d108.22493121187397!3d16.0610997845531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219d2f38ce45d%3A0xbfa47dd116d4db88!2zQ-G6p3UgUuG7k25nLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1730086128074!5m2!1svi!2s"
                  className="w-full h-80"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <span className="italic text-gray-500">
                  Vì nhiều lý do nên bản đồ chỉ mang tính chất minh họa. Vui
                  lòng thông cảm cho chúng tôi! Bạn có thể nhập địa chỉ vào bản
                  đồ để thấy dịch vụ của chúng tôi!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div className="w-full bg-yellow-400 p-4 flex flex-col items-center gap-3 rounded-md">
          <Image src="" className="w-20 h-20 rounded-[-50] object-cover" />
          <h1 className="font-bold text-xl">{postItem?.user?.name}</h1>
          {/* <Button
            text={postItem?.user?.phone}
            bgColor="bg-green-400 "
            textColor="text-white font-bold text-xl"
            icBefore={<FaPhoneAlt />}
            fullWidth
          /> */}
          <div className="flex justify-center items-center gap-3 py-2 w-full rounded-md bg-green-400 text-white font-bold text-xl">
            <span>
              <FaPhoneAlt />
            </span>
            <a href={`tel:${postItem?.user?.phone}`}>{postItem?.user?.phone}</a>
          </div>

          <div className="flex justify-center items-center gap-3 py-2 w-full rounded-md bg-white text-black font-semibold text-[16] border border-black">
            <div className="p-1 bg-blue-500 text-white rounded-[-50] text-xs">
              Zalo
            </div>
            <a href={`https://zalo.me/${postItem?.user?.zalo}`} target="_blank">
              {postItem?.user?.zalo}
            </a>
          </div>
        </div>
        <NewPost />
      </div>
    </div>
  );
}

export default PageDetail;
