import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  socket,
  useCreateChatMutation,
  useGetMeQuery,
  usePostMessageMutation,
} from "@/api";
import { useEffect, useState } from "react";
import ChatInput from "@/components/client/Chat/ChatInput";
import { ISendMessage } from "@/interface/message";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { Avatar, Space } from "antd";

const ChatPage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [idRoomChat, setIdRoomChat] = useState<string | undefined>(undefined);
  const [postMess, resultMess] = usePostMessageMutation<any>();
  const { data: meData, isSuccess: isMeSuccess } = useGetMeQuery("me");
  const { uid: uidGuest } = useParams();
  const [createChat, resultCreateChat] = useCreateChatMutation<any>();
  const [guest, setGuest] = useState<any>(undefined);
  const [showDisplay, setShowDisplay] = useState<boolean>(false);
  const [refreshBars, setRefreshBars] = useState<boolean>(false);

  useEffect(() => {
    if (uidGuest !== undefined) {
      setIdRoomChat(undefined);
      setGuest(undefined);
      createChat({ userId: uidGuest })
        .unwrap()
        .then((res) => {
          setShowDisplay(true);
          // console.log("res?._id", res?._id);
          setIdRoomChat(res?._id);
          socket.emit("join chat", res?._id);
          setGuest(res.users.filter((user: any) => user?._id == uidGuest)[0]);
        })
        .catch((error) => (window.location.href = "/chat"));
    } else {
      if (uidGuest == undefined && meData?.user?._id !== undefined) {
        setShowDisplay(true);
      }
    }
  }, [isMeSuccess, location]);

  const onSendingMessage = (data: any) => {
    const dataMessage: ISendMessage = {
      sender: meData?.user?._id,
      content: data?.content,
      chat: resultCreateChat?.data?._id,
    };
    postMess(dataMessage)
      .unwrap()
      .then((res) => {
        res;
        setRefreshBars(!refreshBars);
      })
      .catch((err) => console.log(err));
  };
  const onSwitchChat = (idChat: string) => {
    socket.emit("leaveRoom", idRoomChat);
    navigate(`/chat/${idChat}`);
  };
  if (showDisplay) {
    return (
      <>
        <section className="flex min-h-full">
          <div className="w-[72%]">
            {resultCreateChat.isSuccess &&
              idRoomChat !== undefined &&
              guest !== undefined && (
                <>
                  <div className="w-full flex px-8 py-3 border-b-[1px] border-b-gray-400 justify-between text-blue-700">
                    <div className="flex gap-x-3">
                      <Space size={16} wrap>
                        <Avatar
                          className="cursor-pointer bg-red-400"
                          src={guest?.information?.avatar_url[0]}
                        />
                      </Space>
                      <Link to={`/profiles?id=${guest?._id}`}>
                        <h1 className="font-bold text-xl ">
                          {guest?.information?.firstName +
                            guest?.information?.lastName}
                        </h1>
                      </Link>
                    </div>

                    <div>
                      <HiDotsCircleHorizontal size={"30px"} />
                    </div>
                  </div>
                  <ChatBox
                    idRoomChat={String(idRoomChat)}
                    user={meData.user}
                    nowSend={resultMess}
                  />{" "}
                  <ChatInput onHandle={onSendingMessage} />
                </>
              )}
          </div>
          <div className="w-[28%]">
            <ChatBar onSwitchChat={onSwitchChat} refreshBars={refreshBars} />
          </div>
        </section>
      </>
    );
  }
};

export default ChatPage;
