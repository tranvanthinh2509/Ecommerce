import { useState } from "react";
import Image from "./Image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";

function SliderCustom({ images }) {
  console.log(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full">
      {/* <div className="w-full h-80 flex justify-center bg-black relative ">
        {sliders?.map((item, index) => {
          if (index === currentIndex) {
            return (
              <Image src={item?.img} className="h-full w-auto object-contain" />
            );
          }
        })}

        <span
          className="rounded-[-50] bg-yellow-400 w-12 h-12 flex justify-center items-center absolute top-40  left-5 -translate-y-1/2 cursor-pointer"
          onClick={() => {
            prevSlider();
          }}
        >
          <FaChevronLeft fontSize="20px" />
        </span>
        <span
          className="rounded-[-50] bg-yellow-400 w-12 h-12 flex justify-center items-center absolute top-40 right-5 -translate-y-1/2 cursor-auto"
          onClick={() => {
            nextSlider();
          }}
        >
          <FaChevronRight fontSize="20px" />
        </span>
      </div> */}
      {images &&
        (JSON.parse(images).length > 1 ? (
          <Slider {...settings}>
            {JSON.parse(images)?.map((item, index) => {
              return (
                <div className="w-full h-80 flex justify-center bg-black ">
                  <Image
                    src={item}
                    className="h-full w-auto m-auto object-contain"
                  />
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="w-full h-80 flex justify-center bg-black ">
            <Image
              src={JSON.parse(images)[0]}
              className="h-full w-auto m-auto object-contain"
            />
          </div>
        ))}
    </div>
  );
}

export default SliderCustom;
