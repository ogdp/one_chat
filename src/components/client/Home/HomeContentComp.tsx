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
        <div className="rounded-xl max-lg:px-3 px-7 max-lg:mx-4 mx-16 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] max-lg:w-full">
          <div>
            <div className="flex gap-x-4 py-4 border-b-[1px] border-b-gray-300">
              <div className="rounded-full max-lg:w-8 max-lg:h-8 w-12 h-12 overflow-hidden">
                <img
                  src={meData?.user?.information?.avatar_url[0]}
                  className="lg:w-full object-contain h-full"
                />
              </div>
              <div
                onClick={() => dispatch(openPostModel())}
                className="lg:w-full rounded-full px-5 flex justify-start items-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                <h4>
                  {meData.user.information.lastName} ơi. Bạn đang nghĩ gì ?
                </h4>
              </div>
            </div>
          </div>
          <div className="flex lg:justify-between items-center py-3 mx-6 text-lg font-medium">
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 px-6 py-3 max-lg:px-3 max-lg:py-2 rounded-xl cursor-pointer">
              <RiLiveLine className="max-lg:text-[20px] text-[30px]" />
              <button className="max-lg:hidden">Phát trực tiếp</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 px-6 py-3 max-lg:px-3 max-lg:py-2 rounded-xl cursor-pointer">
              <PiImageDuotone className="max-lg:text-[20px] text-[30px]" />
              <button className="max-lg:hidden">Ảnh/video</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 px-6 py-3 max-lg:px-3 max-lg:py-2 rounded-xl cursor-pointer">
              <VscReactions className="max-lg:text-[20px] text-[30px]" />
              <button className="max-lg:hidden">Cảm xúc/hoạt động</button>
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
