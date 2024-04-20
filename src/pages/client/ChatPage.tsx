import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, Space } from "antd";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import {
  socket,
  useCreateChatMutation,
  useGetMeQuery,
  usePostMessageMutation,
} from "@/api";
import { ISendMessage } from "@/interface/message";
import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import ChatInput from "@/components/client/Chat/ChatInput";

const ChatPage = () => {
  const navigate = useNavigate();
  const { uid: uidGuest } = useParams();
  const location = useLocation();
  const { data: meData, isSuccess: isMeSuccess } = useGetMeQuery("me");
  const [postMess, resultMess] = usePostMessageMutation();
  const [createChat, resultCreateChat] = useCreateChatMutation();
  const [idRoomChat, setIdRoomChat] = useState<string | undefined>(undefined);
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
          setIdRoomChat(res?._id);
          socket.emit("join chat", res?._id);
          setGuest(res.users.find((user: any) => user?._id === uidGuest));
        })
        .catch(() => (window.location.href = "/chat"));
    } else if (uidGuest === undefined && meData?.user?._id !== undefined) {
      setShowDisplay(true);
    }
  }, [isMeSuccess, location, uidGuest, createChat, meData]);

  const onSendingMessage = (data: any) => {
    const dataMessage: ISendMessage = {
      sender: meData?.user?._id,
      content: data?.content,
      chat: resultCreateChat?.data?._id,
    };
    postMess(dataMessage)
      .unwrap()
      .then(() => setRefreshBars(!refreshBars))
      .catch(console.error);
  };

  const onSwitchChat = (idChat: string) => {
    socket.emit("leaveRoom", idRoomChat);
    navigate(`/chat/${idChat}`);
  };

  if (!showDisplay) return null;
  return (
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
                        " " +
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
              />
              <ChatInput onHandle={onSendingMessage} />
            </>
          )}
      </div>
      <div className="w-[28%]">
        <ChatBar onSwitchChat={onSwitchChat} refreshBars={refreshBars} />
      </div>
    </section>
  );
};

export default ChatPage;
