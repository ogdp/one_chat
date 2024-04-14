import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
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
  const [idRoomChat, setIdRoomChat] = useState<string | undefined>(undefined);

  const [postMess, resultMess] = usePostMessageMutation<any>();
  const { data: meData, isSuccess: isMeSuccess } = useGetMeQuery("me");
  const { uid: uidGuest } = useParams();

  const [createChat, resultCreateChat] = useCreateChatMutation<any>();
  const [createChat2, resultCreateChat2] = useCreateChatMutation<any>();

  useEffect(() => {
    if (uidGuest !== undefined) {
      createChat({ userId: uidGuest })
        .unwrap()
        .then((res) => {
          setIdRoomChat(res?._id);
        })
        .catch((error) => (window.location.href = "/chat"));
    } else {
      if (meData?.user?._id !== undefined) {
        createChat({ userId: meData?.user?._id })
          .unwrap()
          .then((res) => {
            setIdRoomChat(res?._id);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [isMeSuccess]);

  // check change url and update ChatBox
  useEffect(() => {
    if (uidGuest !== undefined) {
      createChat2({ userId: uidGuest })
        .unwrap()
        .then((res) => {
          setIdRoomChat(res?._id);
        })
        .catch((error) => (window.location.href = "/chat"));
    } else {
      if (meData?.user?._id !== undefined) {
        createChat2({ userId: meData?.user?._id })
          .unwrap()
          .then((res) => {
            setIdRoomChat(res?._id);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [location]);

  const onSendingMessage = (data: any) => {
    const dataMessage: ISendMessage = {
      sender: meData?.user?._id,
      content: data?.content,
      chat: resultCreateChat?.data?._id,
    };
    postMess(dataMessage)
      .unwrap()
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  if (resultCreateChat?.status == "fulfilled") {
    let guest: any = resultCreateChat.data.users.filter(
      (user: any) => user?._id == uidGuest
    )[0];
    guest == undefined && (guest = resultCreateChat.data.users[0]);
    return (
      <>
        <section className="flex min-h-full">
          <div className="w-[72%]">
            {resultCreateChat.isSuccess &&
              resultCreateChat.status == "fulfilled" &&
              idRoomChat !== undefined && (
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
                  />
                </>
              )}
            <ChatInput onHandle={onSendingMessage} />
          </div>
          <div className="w-[28%]">
            <ChatBar />
          </div>
        </section>
      </>
    );
  }
};

export default ChatPage;
