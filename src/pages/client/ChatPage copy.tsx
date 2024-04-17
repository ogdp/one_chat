import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { socket, useCreateChatMutation, useGetMeQuery } from "@/api";
import { useEffect, useState } from "react";
import ChatInput from "@/components/client/Chat/ChatInput";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { Avatar, Space } from "antd";

const ChatPage = () => {
  const navigate = useNavigate();
  const { uid: uidGuest } = useParams();
  const { data: meData, isSuccess: isMeSuccess } = useGetMeQuery("me");
  const [createChat, resultCreateChat] = useCreateChatMutation<any>();
  const [createChat2, resultCreateChat2] = useCreateChatMutation<any>();
  const [idRoomChat, setIdRoomChat] = useState<string | undefined>(undefined);
  const [guest, setGuest] = useState<any>(undefined);
  const [resultMess, setResultMess] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (isMeSuccess) {
      createChat({
        userId: uidGuest == undefined ? meData?.user?._id : uidGuest,
      })
        .unwrap()
        .then((res) => {
          setIdRoomChat(res?._id);
          res.users.length == 1
            ? setGuest(meData?.user)
            : setGuest(
                res.users.filter((user: any) => user?._id == uidGuest)[0]
              );
        })
        .catch((error) => {
          console.log(error);
          window.location.href = "/chat";
        });
    }
  }, [isMeSuccess]);

  // check change url and update ChatBox
  const changeRoomChat = (idGuest: string) => {
    if (idGuest == undefined) idGuest = meData?.user?._id;
    navigate(`/chat/${idGuest}`);
    createChat2({
      userId: idGuest,
    })
      .unwrap()
      .then((res) => {
        setIdRoomChat(res?._id);
        res.users.length == 1
          ? setGuest(res?.users[0])
          : setGuest(res?.users.filter((user: any) => user?._id == idGuest)[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (resultCreateChat.isSuccess && isMeSuccess && idRoomChat !== undefined) {
    socket?.on("message recieved", async (newMessage: any) => {
      setResultMess(newMessage);
      console.log("new mess", newMessage);
    });
    console.log("man hinh");
    // console.log("idRoomChat", idRoomChat);
    return (
      <>
        <section className="flex min-h-full">
          <div className="w-[72%]">
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
            <main className="overflow-x-hidden overflow-scroll h-[76vh] px-3 pb-8">
              <ChatBox
                idRoomChat={String(idRoomChat)}
                user={meData.user}
                nowSend={resultMess}
              />
            </main>
            <ChatInput idRoomChat={idRoomChat} user={meData?.user} />
          </div>
          <div className="w-[28%]">
            <ChatBar changeRoomChat={changeRoomChat} />
          </div>
        </section>
      </>
    );
  }
};

export default ChatPage;
