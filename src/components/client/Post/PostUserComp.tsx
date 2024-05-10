import {
  useGetAllPostOneUserMutation,
  useGetAllPostsQuery,
  useGetMeQuery,
} from "@/api";
import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiTwotoneLike,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/dist/locale/vi";
import { Loading } from "@/pages";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
moment.locale("vi");

const PostUserComp = () => {
  const [getPostUser, resultGetPostUser] = useGetAllPostOneUserMutation();
  const { data: meData, isLoading } = useGetMeQuery("me");
  const [postLists, setPostLists] = useState([]);
  useEffect(() => {
    if (meData) {
      getPostUser(meData.user._id)
        .unwrap()
        .then((res) => setPostLists(res.data.docs))
        .catch((err) => console.log(err));
    }
  }, [isLoading]);
  if (isLoading || resultGetPostUser.isLoading) return <Loading />;
  if (postLists.length == 0)
    return (
      <div className="flex justify-center items-center px-7 mx-16 text-center text-xl">
        Không có bài viết nào
      </div>
    );
  return (
    <div className="w-full grid grid-cols-4 gap-x-3 my-8">
      {postLists.map((item: any, index: number) => (
        <div
          key={index}
          className="rounded-xl px-3 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] my-3"
        >
          <div className="flex justify-between items-center gap-x-2 py-5">
            <div className="flex justify-center items-start gap-x-2">
              <div>
                <img
                  src={item.author.information.avatar_url}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full overflow-hidden object-cover"
                />
              </div>
              <div className="flex-col items-start">
                <div>
                  <Link
                    to={`/profiles?id=${item.author._id}`}
                    className="font-medium text-base"
                  >
                    {item.author.information.firstName}{" "}
                    {item.author.information.lastName}
                  </Link>
                </div>
                <h3 className="text-gray-500 text-sm">
                  {moment(item.createdAt).fromNow()}
                </h3>
              </div>
            </div>
            <div>
              <button className="rounded-full px-2 py-2 hover:bg-gray-200">
                <BsThreeDots size={28} />
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
                className="w-[423px] h-[333px]"
              />
            )}
          </div>
          <div className="flex justify-between items-center mt-1 mx-6 text-sm font-medium border-b-[1px] border-b-gray-300">
            <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 px-6 rounded-xl cursor-pointer transition-all">
              {item.likes.length > 0 ? item.likes.length + " thích" : ""}
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 px-6 rounded-xl cursor-pointer transition-all">
              {item.comments.length > 0
                ? item.comments.length + " bình luận"
                : ""}
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 px-6 rounded-xl cursor-pointer transition-all">
              {item.shares.length > 0 ? item.shares.length + " chia sẻ" : ""}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 pb-3 mx-1 text-lg font-medium">
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all">
              <AiTwotoneLike size={18} />
              <button>Thích</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all">
              <AiOutlineComment size={18} />
              <button>Bình luận</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 py-2 rounded-xl cursor-pointer transition-all">
              <AiOutlineShareAlt size={18} />
              <button>Chia sẻ</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostUserComp;
