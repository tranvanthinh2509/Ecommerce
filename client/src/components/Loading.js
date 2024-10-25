import { ColorRing } from "react-loader-spinner";

function Loading({ isPending, fullScreen }) {
  return (
    <div
      className={`${
        fullScreen &&
        "fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-40"
      }`}
    >
      <ColorRing
        visible={isPending}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}

export default Loading;
