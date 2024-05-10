import { useGetAllPostsQuery } from "@/api";
import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiTwotoneLike,
} from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

const PostHomeComp = () => {
  const { data, isLoading } = useGetAllPostsQuery("");
  if (isLoading) return;
  if (data.data.docs.length == 0)
    return (
      <div className="flex justify-center items-center px-7 mx-16 text-center text-xl">
        Không có bài viết nào{" "}
      </div>
    );
  return (
    <>
      {data.data.docs.map((item: any, index: number) => (
        <div
          key={index}
          className="rounded-xl px-7 mx-16 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] my-3"
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
                className="w-[623px] h-[623px]"
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
          <div className="flex justify-between items-center pb-3 mx-6 text-lg font-medium">
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 px-6 py-3 rounded-xl cursor-pointer transition-all">
              <AiTwotoneLike size={18} />
              <button>Thích</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 px-6 py-3 rounded-xl cursor-pointer transition-all">
              <AiOutlineComment size={18} />
              <button>Bình luận</button>
            </div>
            <div className="flex justify-center items-center gap-x-2 hover:bg-gray-200 w-1/3 px-6 py-3 rounded-xl cursor-pointer transition-all">
              <AiOutlineShareAlt size={18} />
              <button>Chia sẻ</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostHomeComp;
