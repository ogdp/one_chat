import { Link } from "react-router-dom";
import { FiHome, FiMessageCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { closeIconModel } from "@/slices";

const NavBarComp = () => {
  const dispatch = useDispatch();
  return (
    <>
      <section
        className="fix h-[calc(100vh_-_57px)] border-r border-r-gray-300 text-lg py-3 bg-white"
        onClick={() => dispatch(closeIconModel())}
      >
        <div className="max-lg:text-center my-2 flex items-center rounded-lg transition-[2s] duration-[all] hover:bg-gray-100">
          <Link to={"/"} className="inline w-full px-6 py-2">
            <button className="flex justify-center items-center gap-2 hover:transition-all">
              <FiHome size={"22px"} />{" "}
              <span className="max-lg:hidden">Trang chủ</span>
            </button>
          </Link>
        </div>
        <div className="max-lg:text-center my-2 flex items-center rounded-lg transition-[2s] duration-[all] hover:bg-gray-100">
          <Link to={"/chat"} className="inline w-full px-6 py-2">
            <button className="flex justify-center items-center gap-2 hover:transition-all">
              <FiMessageCircle size={"22px"} />
              <span className="max-lg:hidden">Tin nhắn</span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default NavBarComp;
