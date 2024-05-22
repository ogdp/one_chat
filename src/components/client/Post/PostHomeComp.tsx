import {
  useActionsPostMutation,
  useGetAllPostsQuery,
  useGetMeQuery,
} from "@/api";
import {
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/dist/locale/vi";
import CommentComp from "./CommentComp";
import { Avatar } from "antd";
import { useState } from "react";
import { Lightbox } from "react-modal-image";

moment.locale("vi");

const PostHomeComp = () => {
  const { data: meData, isLoading: loadMe } = useGetMeQuery("me");
  const { data, isLoading } = useGetAllPostsQuery("");
  const [actionsPost] = useActionsPostMutation();
  const [modalComments, setModalComments] = useState<string | undefined>(
    undefined
  );
  const [statusPopupImage, setStatusPopupImage] = useState<any>("");

  const statusLightbox = (item: any) => {
    setStatusPopupImage(item);
  };

  if (isLoading || loadMe) return;
  if (data.data.docs.length == 0)
    return (
      <div className="flex justify-center items-center px-7 mx-16 text-center text-xl">
        Không có bài viết nào
      </div>
    );
  const onHandleActions = (payload: any) => {
    actionsPost(payload)
      .unwrap()
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <>
      {data.data.docs.map((item: any, index: number) => (
        <div
          key={index}
          className="rounded-xl max-lg:mx-4 max-lg:px-3 max-lg:py-2 px-7 mx-16 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] my-3 max-lg:w-full"
        >
          <div className="flex justify-between items-center gap-x-2 lg:py-5">
            <div className="flex lg:justify-center max-lg:items-center lg:items-start gap-x-2">
              <div>
                <img
                  src={item.author.information.avatar_url[0]}
                  alt=""
                  className="w-[45px] h-[45px] max-lg:w-[30px] max-lg:h-[30px] rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="flex-col items-start">
                <div>
                  <Link
                    to={`/profiles?id=${item.author._id}`}
                    className="font-medium text-base max-lg:text-xs"
                  >
                    {item.author.information.firstName}{" "}
                    {item.author.information.lastName}
                  </Link>
                </div>
                <h3 className="text-gray-500 text-sm max-lg:text-xs">
                  {moment(item.createdAt).fromNow()}
                </h3>
              </div>
            </div>
            <div>
              <button className="rounded-full px-2 py-2 hover:bg-gray-200">
                <IoClose size={28} />
              </button>
            </div>
          </div>
          <div>
            <p>{item.contents}</p>
          </div>
          <div className="flex justify-center items-center py-2">
            {item.images.length > 0 && (
              <img
                src={item.images[0]}
                alt=""
                className="max-lg:w-[300px] max-lg:h-[300px] w-[623px] h-[623px]"
                onClick={() => statusLightbox(item)}
              />
            )}
            {statusPopupImage === item && (
              <Lightbox
                small={item.images[0]}
                large={item.images[0]}
                showRotate={true}
                alt={`${item.author.information.firstName} ${item.author.information.lastName}`}
                onClose={statusLightbox}
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-1 mx-6 max-lg:mx-0 text-sm max-lg:xs font-medium border-b-[1px] border-b-gray-300">
            <div className="flex justify-center items-center  hover:underline w-1/3 max-lg:px-3 px-6 rounded-xl cursor-pointer transition-all">
              {item.likes.length > 0 ? item.likes.length + " thích" : ""}
            </div>
            <div className="flex justify-center items-center  hover:underline w-1/3 max-lg:px-3 px-6 rounded-xl cursor-pointer transition-all">
              {item.comments.length > 0
                ? item.comments.length + " bình luận"
                : ""}
            </div>
            <div className="flex justify-center items-center  hover:underline w-1/3 max-lg:px-3 px-6 rounded-xl cursor-pointer transition-all">
              {item.shares.length > 0 ? item.shares.length + " chia sẻ" : ""}
            </div>
          </div>
          <div className="flex justify-between items-center pb-3 mx-6 text-lg font-medium">
            <div
              onClick={() => onHandleActions({ id: item._id, type: "like" })}
              className={`flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all ${
                item.likes.filter((_id: string) => {
                  return _id === meData.user._id ? true : false;
                }).length
                  ? "text-blue-700"
                  : null
              }`}
            >
              <AiFillLike className="max-lg:text-[28px] text-[24px]" />
              <button className="max-lg:hidden">Thích</button>
            </div>
            <div
              onClick={() => setModalComments(item._id)}
              className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 px-6 py-3 rounded-xl cursor-pointer transition-all"
            >
              <AiOutlineComment className="max-lg:text-[28px] text-[24px]" />
              <button className="max-lg:hidden">Bình luận</button>
            </div>
            <div
              onClick={() => onHandleActions({ id: item._id, type: "share" })}
              className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 px-6 py-3 rounded-xl cursor-pointer transition-all"
            >
              <AiOutlineShareAlt className="max-lg:text-[28px] text-[24px]" />
              <button className="max-lg:hidden">Chia sẻ</button>
            </div>
          </div>
          {modalComments == item._id && (
            <>
              <CommentComp item={item} />
              <section className="py-2 px-2 border-t-[1px] ">
                {item.comments.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-x-2 border-b-[1px] border-gray-100 pb-1"
                  >
                    <a href={`/profiles?id=${item?.user?._id}`}>
                      <Avatar
                        src={item?.user?.information?.avatar_url[0]}
                        style={{
                          margin: "0 3px",
                        }}
                        size={30}
                      />
                    </a>
                    <div className="w-full">
                      <h5 className="text-sm w-full flex justify-between items-center">
                        <a href={`/profiles?id=${item?.user?._id}`}>
                          <span className="line-clamp-1 font-medium">
                            {item?.user?.information?.firstName}
                            {item?.user?.information?.lastName}
                          </span>
                        </a>
                        <span className="text-xs text-blue-700">
                          {moment(item.createdAt).fromNow()}
                        </span>
                      </h5>
                      <p className="text-xs line-clamp-1 "> {item.contents}</p>
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default PostHomeComp;