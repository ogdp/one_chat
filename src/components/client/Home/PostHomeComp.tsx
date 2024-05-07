import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiTwotoneLike,
} from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const PostHomeComp = () => {
  return (
    <div className="rounded-xl px-7 mx-16 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] my-3">
      <div className="flex justify-between items-center gap-x-2 py-5">
        <div className="flex justify-center items-start gap-x-2">
          <div>
            <img
              src="https://res.cloudinary.com/dihqzuybm/image/upload/v1715066442/images_noname/t8mimguzrtec9wfewk4j.png"
              alt=""
              className="w-[45px] h-[45px] rounded-full overflow-hidden object-cover"
            />
          </div>
          <div className="flex-col items-start">
            <div>
              <Link to={"/"} className="font-medium text-base">
                Tin tức Bóng Đá 24h
              </Link>
            </div>
            <h3 className="text-gray-500 text-sm">11 gio</h3>
          </div>
        </div>
        <div>
          <button className="rounded-full px-2 py-2 hover:bg-gray-200">
            <IoClose size={28} />
          </button>
        </div>
      </div>
      <div>
        <p>
          🚨 CHÍNH THỨC! Marco Reus thông báo anh sẽ RỜI Borussia Dortmund vào
          cuối mùa giải, sau 12 năm gắn bó. 👋💛🖤 Kết thúc một thời đại 😥❤️🇩🇪
        </p>
      </div>
      <div className="flex justify-center items-center py-2">
        <img
          src="https://res.cloudinary.com/dihqzuybm/image/upload/v1715066384/images_noname/d9z1gspctgepx8oln5el.png"
          alt=""
          className="w-[623px] h-[623px]"
        />
      </div>
      <div className="flex justify-between items-center mt-1 mx-6 text-sm font-medium border-b-[1px] border-b-gray-300">
        <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 px-6 rounded-xl cursor-pointer transition-all">
          120 like
        </div>
        <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 px-6 rounded-xl cursor-pointer transition-all">
          3000 bình luận
        </div>
        <div className="flex justify-center items-center gap-x-2 hover:underline w-1/3 px-6 rounded-xl cursor-pointer transition-all">
          400 chia sẻ
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
  );
};

export default PostHomeComp;
