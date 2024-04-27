import { IoClose } from "react-icons/io5";
import { Input } from "antd";
import { useGetMeQuery } from "@/api";
import { useState } from "react";
import { LoadingAll } from "@/pages";
import { useDispatch } from "react-redux";
import { closePostModel } from "@/slices";

const CreatePostComp = () => {
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const { data: meData, isSuccess } = useGetMeQuery("me");
  const [content, setContent] = useState("");
  if (!isSuccess) {
    return <LoadingAll />;
  }
  return (
    <>
      <div className="fixed min-w-full h-screen flex justify-center items-center">
        <div
          className="fixed z-[1] min-w-full h-screen bg-slate-400 opacity-50"
          onClick={() => dispatch(closePostModel())}
        ></div>
        <div className="fixed z-[2] w-[680px] rounded-xl bg-white -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4  shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
          <div className="flex justify-center items-center relative border-b-[1px] border-b-gray-200 px-5 py-4">
            <h1 className="text-2xl font-medium">Tạo bài viết</h1>
            <button
              className="rounded-full px-2 py-2 bg-gray-200 absolute right-0 top-0 hover:bg-gray-300 mt-3 mr-3"
              onClick={() => dispatch(closePostModel())}
            >
              <IoClose size={22} />
            </button>
          </div>
          <div>
            <div className="px-3">
              <div className="flex gap-x-4 py-4 border-b-[1px] border-b-gray-300">
                <div className="w-[50px] h-[50px]">
                  <img
                    src="https://unionsquare.vn/wp-content/uploads/2022/05/union_square_Home_m.jpg"
                    className="rounded-full w-[50px] h-[50px] object-cover "
                  />
                </div>
                <div className="w-full flex justify-start items-start cursor-pointer font-medium">
                  <h4>
                    {meData?.user?.information?.firstName +
                      " " +
                      meData?.user?.information?.lastName}
                  </h4>
                </div>
              </div>
            </div>
            <div className="px-3">
              <TextArea
                rows={4}
                placeholder="Bạn đang nghĩ gì ?"
                value={content}
                onChange={(e) => setContent(e?.target?.value)}
                size={"large"}
              />
            </div>
            <div className="px-3 py-3">
              <button className="w-full rounded-xl py-2 text-center font-medium text-xl bg-blue-600 text-white">
                Đăng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePostComp;
