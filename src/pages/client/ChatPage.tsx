import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import { Link, useParams } from "react-router-dom";
import {
  useCreateChatMutation,
  useGetMeQuery,
  usePostMessageMutation,
} from "@/api";
import { useEffect } from "react";
import ChatInput from "@/components/client/Chat/ChatInput";
import { ISendMessage } from "@/interface/message";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { Avatar, Space } from "antd";

const ChatPage = () => {
  const [postMess, resultMess] = usePostMessageMutation<any>();
  const { data: meData } = useGetMeQuery("me");
  const { uid: uidGuest } = useParams();

  const [createChat, resultCreateChat] = useCreateChatMutation<any>();

  useEffect(() => {
    createChat({ userId: uidGuest })
      .unwrap()
      .then((res) => {
        return res;
      })
      .catch((error) => console.error("rejected", error));
  }, []);

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
    const guest: any = resultCreateChat.data.users.filter(
      (user: any) => user._id !== uidGuest
    )[0];
    console.log(guest);
    console.log("man hinh chatPage", Date.now());
    return (
      <>
        <section className="flex min-h-full">
          <div className="w-[72%]">
            {resultCreateChat.isSuccess &&
              resultCreateChat.status == "fulfilled" && (
                <>
                  <div className="w-full flex px-8 py-3 border-b-[1px] border-b-gray-400 justify-between text-blue-700">
                    <div className="flex gap-x-3">
                      <Space size={16} wrap>
                        <Avatar
                          className="cursor-pointer bg-red-400"
                          src={guest?.information?.avatar_url[0]}
                        />
                      </Space>
                      <Link to={`/profiles?id=${guest._id}`}>
                        <h1 className="font-bold text-xl ">
                          {guest.information?.firstName +
                            guest.information?.lastName}
                        </h1>
                      </Link>
                    </div>

                    <div>
                      <HiDotsCircleHorizontal size={"30px"} />
                    </div>
                  </div>
                  <ChatBox
                    idRoomChat={String(resultCreateChat?.data?._id)}
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
