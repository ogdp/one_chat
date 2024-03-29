import { Link } from "react-router-dom";
import { Avatar, Button, Input, Space } from "antd";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const { Search } = Input;

const HeaderC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  return (
    <>
      <section className="">
        <div className="h-[57px] w-full m-auto static flex justify-between items-center border border-b-gray-300 px-[16px]">
          <div>
            <Link to="/">
              <span className="text-2xl text-[#0866FF] font-bold">OneChat</span>
            </Link>
          </div>
          <div>
            <Search size="large" placeholder="Tìm kiếm bạn bè" />
          </div>
          <div className="flex gap-x-3">
            <Link to="/auth">
              <Button>Đăng nhập</Button>
            </Link>
            <Space size={16} wrap>
              <Avatar icon={<UserOutlined />} />{" "}
            </Space>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeaderC;
