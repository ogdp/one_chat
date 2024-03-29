import { Link } from "react-router-dom";
import { FiHome, FiMessageCircle } from "react-icons/fi";

const NavBarC = () => {
  return (
    <>
      <section className="fix h-[calc(100vh_-_57px)] border-r border-r-gray-300 text-lg py-3 bg-white">
        <div className="my-2 mx-4 flex items-center rounded-lg transition-[2s] duration-[all] hover:bg-gray-100">
          <Link to={"/"} className="inline w-full px-6 py-2">
            <button className="flex justify-center items-center gap-2 hover:transition-all">
              <FiHome size={"22px"} /> Trang chủ
            </button>
          </Link>
        </div>
        <div className="my-2 mx-4 flex items-center rounded-lg transition-[2s] duration-[all] hover:bg-gray-100">
          <Link to={"/chat"} className="inline w-full px-6 py-2">
            <button className="flex justify-center items-center gap-2 hover:transition-all">
              <FiMessageCircle size={"22px"} /> Tin nhắn
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default NavBarC;
