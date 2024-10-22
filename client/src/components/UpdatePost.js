import CreatePost from "../contains/System/CreatePost";
import { useDispatch } from "react-redux";
import { resetPostItem } from "../redux/slices/postSlice";

function UpdatePost({ setIsEdit }) {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40 flex justify-center"
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
        dispatch(resetPostItem());
      }}
    >
      <div
        className="w-1100 bg-white overflow-y-scroll"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CreatePost isEdit />
      </div>
    </div>
  );
}

export default UpdatePost;
