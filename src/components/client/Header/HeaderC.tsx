import { Link } from "react-router-dom";
import { Avatar, Button, Space } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import UserDrawerPanel from "@/components/auth/UserDrawerPanel";
import SearchUser from "./SearchUser";

const HeaderC = () => {
  const [togglePanel, setTogglePanel] = useState<boolean>(false);

  const onHandlePanel = () => {
    setTogglePanel(!togglePanel);
  };

  return (
    <>
      <section className="">
        <div className="h-[57px] w-full m-auto fixed z-20 flex justify-between items-center border border-b-gray-300 px-[16px]">
          <div>
            <Link to="/">
              <span className="text-2xl text-[#0866FF] font-bold">OneChat</span>
            </Link>
          </div>
          <div>
            <SearchUser />
          </div>
          <div className="flex gap-x-3">
            <Link to="/auth" className="hidden">
              <Button>Đăng nhập</Button>
            </Link>
            <Space size={16} wrap>
              <Avatar
                className="cursor-pointer bg-red-400"
                icon={<UserOutlined />}
                onClick={() => onHandlePanel()}
              />
            </Space>
          </div>
        </div>
        {togglePanel && <UserDrawerPanel toggle={onHandlePanel} />}
      </section>
    </>
  );
};

export default HeaderC;