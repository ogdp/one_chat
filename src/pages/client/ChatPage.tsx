import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import { useParams } from "react-router-dom";
import {
  useCreateChatMutation,
  useGetMeQuery,
  useGetMessagesMutation,
} from "@/api";
import LoadingAll from "../error/LoadingAll";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// var socket, currentChattingWith;

const ChatPage = () => {
  const { uid: uidGuest } = useParams();
  const { data: meData } = useGetMeQuery("me");
  const [createChat, resultCreate] = useCreateChatMutation();
  const [getMess, resultGetMess] = useGetMessagesMutation();

  useEffect(() => {
    (async () => {
      const res = await getSenderChat({ userId: String(uidGuest) });
      await getMessage(res._id);
    })();
  }, []);

  const getSenderChat = async (data: { userId: string }) => {
    try {
      const res = await createChat(data).unwrap();
      return res;
    } catch (error) {
      return false;
    }
  };
  const getMessage = async (chatId: string) => {
    try {
      const res = await getMess(chatId).unwrap();
      return res;
    } catch (error) {
      return false;
    }
  };

  if (resultCreate.isLoading || resultGetMess.isLoading) return <LoadingAll />;

  if (
    resultCreate.status !== "fulfilled" &&
    resultGetMess.status !== "fulfilled"
  )
    return <LoadingAll />;
  if (!resultCreate.isSuccess || !resultGetMess.isSuccess)
    return <LoadingAll />;

  // console.log(resultGetMess?.data?.docs);
  // if (!isMeLoading && meData !== undefined) {
  //   socket = io("http://localhost:8080/");
  //   socket.emit("setup", meData.user);
  //   socket.on("connected", () => {
  //     // setconnectedtosocket(true);
  //   });
  // }

  return (
    <>
      <section className="flex min-h-full">
        <div className="w-[70%]">
          <ChatBox data={resultGetMess?.data?.docs} uid={meData?.user?._id} />
        </div>
        <div className="w-[28%]">
          <ChatBar />
        </div>
      </section>
    </>
  );
};

export default ChatPage;
