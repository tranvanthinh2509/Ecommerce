import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as PostService from "../../services/post";
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

  return (
    <div className="w-full flex gap-3">
      <div className="w-2/3">
        <div className="bg-white h-screen">oek</div>
      </div>
      <div className="w-1/3">Side bar</div>
    </div>
  );
}

export default PageDetail;
