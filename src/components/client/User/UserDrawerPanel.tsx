import { useNavigate } from "react-router-dom";
import { FiPower, FiSettings, FiUser, FiX } from "react-icons/fi";
import { IUserPro } from "@/interface/user";
import { useLogoutAccountMutation } from "@/api";
import { Modal, message } from "antd";
import { useState } from "react";
import ChangePassComp from "@/components/client/User/ChangePassComp";

interface IProps {
  user: IUserPro;
  toggle: () => void;
}

const UserDrawerPanel = ({ user, toggle }: IProps) => {
  const navigate = useNavigate();
  const [logout] = useLogoutAccountMutation();
  const [changePassActive, setchangePassActive] = useState(false);
  const onHandleLogout = () => {
    logout("")
      .unwrap()
      .then((response: any) => {
        message.success(response.message);
        navigate("/auth");
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const activeModelChangePass = () => {
    setchangePassActive(!changePassActive);
  };
  return (
    <>
      <section className="fixed mt-[57px] z-10 top-0 right-0 shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px]">
        <div className=" bg-white">
          <div className="px-5 flex gap-x-2 border-b-[1px] border-b-gray-200 py-3 hover:bg-gray-100">
            <div>
              <img
                src={user?.information?.avatar_url[0]}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            </div>
            <button className="font-semibold ">
              <a onClick={() => toggle()} href="/profiles">
                {user?.information?.firstName} {user?.information?.lastName}
              </a>
            </button>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100">
            <a onClick={() => toggle()} href="/profiles">
              <button className="flex items-center gap-x-1 justify-center font-medium">
                <FiUser size={"18"} />
                Thông tin tài khoản
              </button>
            </a>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100">
            <button
              onClick={() => activeModelChangePass()}
              className="flex items-center gap-x-1 justify-center font-medium"
            >
              <FiSettings size={"18"} />
              Đổi mật khẩu
            </button>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100 text-red-600">
            <button
              onClick={() => onHandleLogout()}
              className="flex items-center gap-x-1 justify-center font-medium"
            >
              <FiPower size={"18"} />
              Đăng xuất
            </button>
          </div>
          <div className="px-5 py-2 border-b-[1px] border-b-gray-200 hover:bg-gray-100 text-red-600">
            <button
              onClick={() => toggle()}
              className="flex items-center gap-x-1 justify-center font-medium"
            >
              <FiX size={"22"} /> Đóng
            </button>
          </div>
        </div>
      </section>
      <Modal
        centered
        open={changePassActive}
        onOk={() => activeModelChangePass()}
        onCancel={() => activeModelChangePass()}
        width={700}
        footer={null}
      >
        <ChangePassComp activeModelChangePass={activeModelChangePass} />
      </Modal>
    </>
  );
};

export default UserDrawerPanel;