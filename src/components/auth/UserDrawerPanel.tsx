import { Link } from "react-router-dom";
import { FiPower, FiSettings, FiUser, FiX } from "react-icons/fi";

interface IProps {
  toggle: () => void;
}

const UserDrawerPanel = (props: IProps) => {
  return (
    <>
      <section className="fixed mt-[57px] z-10 top-0 right-0 shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px]">
        <div className=" bg-white">
          <div className="px-5 flex justify-between gap-x-2 border-b-[1px] border-b-gray-200 py-3 hover:bg-gray-100">
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/115080675?v=4"
                alt=""
                className="h-8 w-8 rounded-full"
              />
            </div>
            <button className="font-semibold ">
              <Link to={"/profiles"}>Le Quang Minh Duc</Link>{" "}
            </button>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100">
            <Link to="/profiles">
              <button className="flex items-center gap-x-1 justify-center font-medium">
                <FiUser size={"18"} />
                Thông tin tài khoản
              </button>
            </Link>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100">
            <Link to="/change-password">
              <button className="flex items-center gap-x-1 justify-center font-medium">
                <FiSettings size={"18"} />
                Đổi mật khẩu
              </button>
            </Link>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100 text-red-600">
            <Link to={"/logout"}>
              <button className="flex items-center gap-x-1 justify-center font-medium">
                <FiPower size={"18"} />
                Đăng xuất
              </button>
            </Link>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100 text-red-600">
            <button
              onClick={() => props.toggle()}
              className="flex items-center gap-x-1 justify-center font-medium"
            >
              <FiX size={"22"} /> Đóng
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDrawerPanel;
