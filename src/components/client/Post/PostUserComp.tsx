import {
  useActionsPostMutation,
  useDeletePostMutation,
  useGetAllPostUserQuery,
  useGetMeQuery,
  useUpdatePostMutation,
} from "@/api";
import {
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import moment from "moment";
import { Loading } from "@/pages";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { onActionPost, offActionPost } from "@/slices";
import "moment/dist/locale/vi";
import { MdDeleteSweep } from "react-icons/md";
import { RiChatPrivateFill, RiGitRepositoryPrivateFill } from "react-icons/ri";
import { Avatar, message } from "antd";
import CommentComp from "./CommentComp";
import { BiSolidShow } from "react-icons/bi";
moment.locale("vi");

const PostUserComp = () => {
  const dispatch = useDispatch();
  const { data: meData, isLoading: loadMe } = useGetMeQuery("me");
  const { data: listPosts, isLoading: loadPost } = useGetAllPostUserQuery("0");
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [actionsPost] = useActionsPostMutation();
  const [modalComments, setModalComments] = useState<string | undefined>(
    undefined
  );
  const [sn, setSn] = useState<any>({ index: undefined });

  const statusControlActions = useSelector(
    (state: any) => state.profilesSlices.toogleActionPost
  );
  const onHandleControl = (e: any, i: number) => {
    e.stopPropagation();
    if (i === sn.index) {
      setSn({
        index: i,
      });
      statusControlActions
        ? dispatch(offActionPost())
        : dispatch(onActionPost());
    } else {
      setSn({
        index: i,
      });
      dispatch(onActionPost());
    }
  };

  const onHandlePost = (actions: string, item: any) => {
    switch (actions) {
      case "delete":
        if (!confirm("Xoá bài viết bạn sẽ không thể khôi phục")) return;
        deletePost(String(item._id))
          .unwrap()
          .then(() => {
            message.success("Xoá bài viết thành công !!!");
          })
          .catch(() => message.error("Xoá bài viết thất bại"));
        break;
      case "hidden":
        updatePost({ _id: item._id, status: !item.status })
          .unwrap()
          .then((res) => {
            res.data.status
              ? message.success("Bài viết đã được hiển thị trở lại !!!")
              : message.success("Ẩn bài viết thành công !!!");
          })
          .catch(() => message.error("Rất tiếc đã xảy ra lỗiii "));
        break;
      default:
        break;
    }
  };
  const onHandleActions = (payload: any) => {
    actionsPost(payload)
      .unwrap()
      .then()
      .catch((err) => message.error(err.data.message));
  };

  if (loadPost || loadMe) return <Loading />;
  if (listPosts.data.docs.length == 0)
    return (
      <div className="flex justify-center items-center px-7 mx-16 text-center text-xl">
        Không có bài viết nào
      </div>
    );
  return (
    <div className="w-full grid grid-cols-4 gap-x-3 my-8">
      {listPosts.data.docs.map((item: any, index: number) => (
        <div
          key={index}
          className="rounded-xl px-3 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] my-3"
        >
          <div className="flex justify-between items-center gap-x-2 py-5">
            <div className="flex justify-center items-start gap-x-2">
              <div>
                <img
                  src={item.author.information.avatar_url[0]}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="flex-col items-start">
                <div>
                  <a
                    href={`/profiles?id=${item.author._id}`}
                    className="font-medium text-base"
                  >
                    {item.author.information.firstName}{" "}
                    {item.author.information.lastName}
                  </a>
                </div>
                <h3 className="text-gray-500 text-sm flex items-center gap-x-2">
                  {moment(item.createdAt).fromNow()}{" "}
                  {!item.status && (
                    <span>
                      <RiChatPrivateFill size={20} />
                    </span>
                  )}
                </h3>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={(e) => onHandleControl(e, Number(index))}
                className="rounded-full px-2 py-2 hover:bg-gray-200"
              >
                <BsThreeDots size={28} />
              </button>
              {sn?.index == index && statusControlActions && (
                <div className="absolute bg-white min-w-[180px] -left-[300%] rounded-md shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] pt-2 pb-3 ">
                  {item.status ? (
                    <button
                      onClick={() => onHandlePost("hidden", item)}
                      className="min-w-full text-base font-medium flex items-center gap-x-2 hover:bg-slate-100 transition-all rounded-md px-2 py-1"
                    >
                      <RiGitRepositoryPrivateFill size={20} />
                      <span>Ẩn bài viết</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onHandlePost("hidden", item)}
                      className="min-w-full text-base font-medium flex items-center gap-x-2 hover:bg-slate-100 transition-all rounded-md px-2 py-1"
                    >
                      <BiSolidShow size={22} />
                      <span>Hiển thị bài viết</span>
                    </button>
                  )}
                  <button
                    onClick={() => onHandlePost("delete", item)}
                    className="min-w-full text-red-600 text-base font-medium flex items-center gap-x-2 hover:bg-slate-100 transition-all rounded-md px-2 py-1"
                  >
                    <MdDeleteSweep size={23} />
                    <span>Xoá bài viết</span>
                  </button>
                </div>
              )}
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
                className="w-[423px] h-[333px]"
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-1  text-sm font-medium border-b-[1px] border-b-gray-300">
            <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 rounded-xl cursor-pointer transition-all">
              {item.likes.length > 0 ? item.likes.length + " thích" : ""}
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 rounded-xl cursor-pointer transition-all">
              {item.comments.length > 0
                ? item.comments.length + " bình luận"
                : ""}
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 rounded-xl cursor-pointer transition-all">
              {item.shares.length > 0 ? item.shares.length + " chia sẻ" : ""}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 pb-3 mx-1 text-lg font-medium">
            <div
              onClick={() => onHandleActions({ id: item._id, type: "like" })}
              className={`flex justify-center items-center hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all ${
                item.likes.filter((_id: string) => {
                  return _id === meData.user._id ? true : false;
                }).length
                  ? "text-blue-700"
                  : null
              }`}
            >
              <AiFillLike size={18} />
              <button>Thích</button>
            </div>
            <div
              onClick={() => setModalComments(item._id)}
              className="flex justify-center items-center hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all"
            >
              <AiOutlineComment size={18} />
              <button>Bình luận</button>
            </div>
            <div
              onClick={() => onHandleActions({ id: item._id, type: "share" })}
              className="flex justify-center items-center  hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all"
            >
              <AiOutlineShareAlt size={18} />
              <button>Chia sẻ</button>
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
    </div>
  );
};

export default PostUserComp;
