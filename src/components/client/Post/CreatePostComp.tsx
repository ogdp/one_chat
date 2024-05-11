import { IoClose } from "react-icons/io5";
import { Input, Upload, UploadProps, message } from "antd";
import {
  useCreatePostMutation,
  useGetMeQuery,
  useUploadImagesMutation,
} from "@/api";
import { useEffect, useState } from "react";
import { LoadingAll } from "@/pages";
import { useDispatch } from "react-redux";
import { closePostModel } from "@/slices";
import { MdAddPhotoAlternate } from "react-icons/md";
import ImageCreatePostComp from "./ImageCreatePostComp";
import "./style.css";

const CreatePostComp = () => {
  const dispatch = useDispatch();
  const { data: meData, isSuccess } = useGetMeQuery("me");
  const [uploadImages, resultUploadImages] = useUploadImagesMutation();
  const [createPost, resultCreatePost] = useCreatePostMutation();
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState<any>([]);
  const [showListImages, setShowListImages] = useState<any>([]);
  const { TextArea } = Input;
  if (!isSuccess) {
    return <LoadingAll />;
  }

  const encodeImageToBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    if (!newFileList) return message.error("Không tồn tại file");
    setFileList(newFileList);
  };

  useEffect(() => {
    (async () => {
      let arrImages = [];
      for (let index = 0; index < fileList.length; index++) {
        const element = await encodeImageToBase64(
          fileList[index].originFileObj
        );
        arrImages.push({
          url: element,
          file: fileList[index].originFileObj,
        });
      }
      setShowListImages(arrImages);
    })();
  }, [fileList.length]);

  const onHandleDelete = (file: File) => {
    const newShowImages = showListImages.filter((item: any) => {
      return item.file !== file;
    });
    setShowListImages(newShowImages);
    const newFileList = fileList.filter((item: any) => {
      return JSON.stringify(item.originFileObj) !== JSON.stringify(file);
    });
    setFileList(newFileList);
  };

  const onCreatePost = async () => {
    // Upload images
    const listOriginFileObj = fileList.map((file: any) => file.originFileObj);
    try {
      const { data }: any = await uploadImages(listOriginFileObj);
      const sendData = {
        contents: content,
        images: data?.urls,
      };
      createPost(sendData)
        .unwrap()
        .then(() => {
          dispatch(closePostModel()),
            message.success("Đăng bài viết thành công !");
        })
        .catch(() => message.error("Tạo bài viết thất bại !"));
    } catch (error) {
      message.error("Tải ảnh lên thất bại !");
      console.log(error);
    }
  };
  return (
    <>
      {(resultUploadImages.isLoading || resultCreatePost.isLoading) && (
        <LoadingAll />
      )}
      <div className="fixed min-w-full h-screen flex justify-center items-center rounded-xl">
        <div
          className="fixed z-[1] min-w-full h-screen bg-slate-400 opacity-50"
          onClick={() => dispatch(closePostModel())}
        ></div>
        <div className="fixed z-[2] w-[580px] rounded-xl bg-white -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4  shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px]">
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
            <div className="px-3 ">
              <div className="flex gap-x-4 py-4 border-b-[1px] border-b-gray-300">
                <div className="w-[50px] h-[50px]">
                  <img
                    src={meData?.user?.information?.avatar_url}
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
            <div className="px-3 my-2">
              <TextArea
                rows={2}
                placeholder="Bạn đang nghĩ gì ?"
                value={content}
                onChange={(e) => setContent(e?.target?.value)}
                size={"large"}
                style={{
                  overflow: "auto",
                  fontSize: "20px",
                  maxHeight: "130px",
                }}
              />
            </div>
            {showListImages.length > 0 && (
              <ImageCreatePostComp
                list={showListImages}
                onHandleDelete={onHandleDelete}
              />
            )}

            <div className="w-full ">
              <Upload
                fileList={fileList} // Tránh việc bị double file sau khi xoá rồi thêm lại
                onChange={handleChange}
                customRequest={() => false}
                accept="image/*"
                className="w-full flex justify-center items-center"
                multiple={true}
                showUploadList={false}
              >
                <div className="px-3 py-2 text-black">
                  <button className="w-full rounded-lg py-2 text-center font-medium text-xl border border-gray-300 flex justify-center items-center gap-x-2 hover:bg-slate-100 transition-all focus:border focus:border-blue-500">
                    <MdAddPhotoAlternate size={27} className="text-green-600" />{" "}
                    <span className="text-green-600">Thêm ảnh</span>
                  </button>
                </div>
              </Upload>
            </div>
            <div className="px-3 py-2 mb-2">
              <button
                className="w-full rounded-lg py-2 text-center font-medium text-xl bg-blue-600 text-white"
                onClick={() => onCreatePost()}
              >
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
