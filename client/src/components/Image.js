import { forwardRef, useState } from "react";
import images from "../asset/image";

const Image = forwardRef(({ src, alt, id = "", ...props }, ref) => {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(images.noImage);
  };

  return (
    <img
      ref={ref}
      src={src || fallback}
      alt={alt}
      id={id}
      {...props}
      onError={handleError}
    />
  );
});

export default Image;
