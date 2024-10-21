import { GrStar } from "react-icons/gr";
import Image from "./Image";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/vi";

function ItemNewPost({ data, index }) {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={14} color="yellow" />);
    return stars;
  };
  return (
    <div>
      <div
        className={`flex gap-2  items-center py-4 border-b border-gray-300 ${
          index && "border-none"
        }`}
      >
        <div className="w-16 h-16 flex-none">
          <Image
            src={data?.images?.image && JSON.parse(data?.images?.image)[0]}
            className="w-16 h-16 object-cover rounded-sm"
          />
        </div>
        <div className="flex flex-col content-between flex-auto">
          <span className="overflow-hidden line-clamp-2 text-blue-800 mb-3 text-[-14] leading-4">
            {/* <span className="flex justify-center mt-2 ">
              {handleStar(+"5").length > 0 &&
                handleStar(+"5").map((star, number) => {
                  return <span key={number}>{star}</span>;
                })}
            </span> */}
            {data?.title}
          </span>

          <div className="flex justify-between items-center">
            <h3 className="font-bold text-green-600 text-[-14]">
              {data?.attributes?.price}
            </h3>
            <p className="text-[-14] text-gray-400">
              {formatTime(data?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemNewPost;
