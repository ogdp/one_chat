import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Avatar, Modal, Space, message } from "antd";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import {
  socket,
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetMeQuery,
  usePostMessageMutation,
} from "@/api";
import { ISendMessage } from "@/interface/message";
import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import ChatInput from "@/components/client/Chat/ChatInput";
import ControlChatComp from "@/components/client/Chat/ControlChatComp";
import LoadingAll from "../error/LoadingAll";

const ChatPage = () => {
  const navigate = useNavigate();
  const { uid: uidGuest } = useParams();
  const location = useLocation();
  const { data: meData, isSuccess: isMeSuccess } = useGetMeQuery("me");
  const [postMess, resultMess] = usePostMessageMutation();
  const [createChat, resultCreateChat] = useCreateChatMutation();
  const [deleteChat, resultDeleteChat] = useDeleteChatMutation();
  const [idRoomChat, setIdRoomChat] = useState<string | undefined>(undefined);
  const [guest, setGuest] = useState<any>(undefined);
  const [showDisplay, setShowDisplay] = useState<boolean>(false);
  const [refreshBars, setRefreshBars] = useState<boolean>(false);
  const [openControl, setOpenControl] = useState<boolean>(false);
  const [modal2Open, setModal2Open] = useState(false);

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

  const toggleModel = () => {
    setModal2Open(!modal2Open);
    setOpenControl(!openControl);
  };

  const onHandleDeleteChat = () => {
    setModal2Open(false);
    deleteChat(String(idRoomChat))
      .unwrap()
      .then(() => {
        message.success("Xoá cuộc trò chuyện thành công");
        setTimeout(() => window.location.reload(), 600);
      })
      .catch((err) => {
        message.error("Xoá cuộc trò chuyện thất bại");
        console.log(err);
      });
  };

  if (!showDisplay) return null;
  return (
    <>
      {resultDeleteChat.isLoading && <LoadingAll />}
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

                  <div className="relative z-20">
                    <HiDotsCircleHorizontal
                      size={"30px"}
                      className="hover:scale-110 transition-all cursor-pointer"
                      onClick={() => setOpenControl(!openControl)}
                    />
                    {openControl && (
                      <ControlChatComp toggleModel={toggleModel} />
                    )}
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
        {modal2Open && (
          <Modal
            okButtonProps={{ style: { backgroundColor: "red" } }}
            okText="Xoá"
            cancelText="Huỷ"
            title="Xoá cuộc trò chuyện"
            centered
            open={modal2Open}
            onOk={() => onHandleDeleteChat()}
            onCancel={() => setModal2Open(false)}
          >
            <p>
              Cuộc trò chuyện sẽ bị xoá mà không thể khôi phục bạn chắc chắn
              không ?
            </p>
          </Modal>
        )}
      </section>
    </>
  );
};

export default ChatPage;
