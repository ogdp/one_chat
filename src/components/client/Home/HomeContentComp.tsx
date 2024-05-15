import { RiLiveLine } from "react-icons/ri";
import { PiImageDuotone } from "react-icons/pi";
import { VscReactions } from "react-icons/vsc";
import CreatePostComp from "@/components/client/Post/CreatePostComp";
import { useSelector, useDispatch } from "react-redux";
import { openPostModel } from "@/slices";
import PostHomeComp from "../Post/PostHomeComp";
import { useGetMeQuery } from "@/api";

const HomeContentComp = () => {
  const dispatch = useDispatch();
  const modelPost = useSelector((state: any) => state.homeSlices);
  const { data: meData, isLoading } = useGetMeQuery("me");
  if (isLoading) return;
  return (
    <>
      <main className="py-[3%]">
        <div className="rounded-xl px-7 mx-16 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
          <div>
            <div className="flex gap-x-4 py-4 border-b-[1px] border-b-gray-300">
              <div className="rounded-full w-12 h-12 overflow-hidden">
                <img
                  src={meData?.user?.information?.avatar_url[0]}
                  alt=""
                  className="w-full object-contain h-full"
                />
              </div>
              <div
                onClick={() => dispatch(openPostModel())}
                className="w-full rounded-full px-5 flex justify-start items-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                <h4>
                  {meData.user.information.lastName} ơi. Bạn đang nghĩ gì ?
                </h4>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 mx-6 text-lg font-medium">
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 px-6 py-3 rounded-xl cursor-pointer">
              <RiLiveLine size={30} />
              <button>Phát trực tiếp</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 px-6 py-3 rounded-xl cursor-pointer">
              <PiImageDuotone size={30} />
              <button>Ảnh/video</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 px-6 py-3 rounded-xl cursor-pointer">
              <VscReactions size={30} />
              <button>Cảm xúc/hoạt động</button>
            </div>
          </div>
        </div>
        <PostHomeComp />
      </main>
      {modelPost.status && (
        <div className="fixed z-[10] top-0 left-0 min-w-full h-screen">
          <CreatePostComp />
        </div>
      )}
    </>
  );
};

export default HomeContentComp;
