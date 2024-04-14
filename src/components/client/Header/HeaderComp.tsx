import { Link } from "react-router-dom";
import { Avatar, Button, Space } from "antd";
import { useState } from "react";
import UserDrawerPanel from "@/components/auth/UserDrawerPanel";
import SearchUser from "./SearchUser";
import { useGetMeQuery } from "@/api";
import { io } from "socket.io-client";
var socket;

const HeaderComp = () => {
  const [togglePanel, setTogglePanel] = useState<boolean>(false);
  const { data, isLoading, isSuccess } = useGetMeQuery("me");

  socket = io("http://localhost:8080");
  socket.emit("setup", data?.user);
  socket.on("connected", () => {
    // setconnectedtosocket(true);
  });
  socket.on("message recieved", async (newMessage: any) => {
    console.log("message recieved", newMessage);
  });

  const onHandlePanel = () => {
    setTogglePanel(!togglePanel);
  };

  if (isSuccess) {
    const { user } = data;
    return (
      <>
        <section className="">
          <div className="h-[57px] bg-white w-full m-auto fixed z-20 flex justify-between items-center border border-b-gray-300 px-[16px]">
            <div>
              <Link to="/">
                <span className="text-2xl text-[#0866FF] font-bold">
                  OneChat
                </span>
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
                  src={user?.information?.avatar_url[0]}
                  onClick={() => onHandlePanel()}
                />
              </Space>
            </div>
          </div>
          {togglePanel && (
            <UserDrawerPanel user={user} toggle={onHandlePanel} />
          )}
        </section>
      </>
    );
  }
};

export default HeaderComp;
