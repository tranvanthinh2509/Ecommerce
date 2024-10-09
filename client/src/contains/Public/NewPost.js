import { useEffect, useState } from "react";
import ItemNewPost from "../../components/ItemNewPost";
import * as PostService from "../../services/post";

function NewPost() {
  const [newPost, setNewPost] = useState();

  useEffect(() => {
    handleGetNewPost();
  }, []);
  const handleGetNewPost = async () => {
    const res = await PostService.getNewPost();
    setNewPost(res.data);
  };
  return (
    <div className="w-full min-h-60 mt-5 px-3 py-3 bg-white rounded-lg border border-gray-300">
      <h1 className="font-bold">Tin mới đăng</h1>
      <div className="mt-2 ">
        {newPost?.map((item, index) => {
          return (
            <ItemNewPost data={item} index={index + 1 === newPost?.length} />
          );
        })}
      </div>
    </div>
  );
}

export default NewPost;
