import { IListMessage } from "@/interface/chat";
import SentenceLeftChat from "./SentenceLeftChat";
import SentenceRightChat from "./SentenceRightChat";
import { IUserPro } from "@/interface/user";
import { io } from "socket.io-client";
import { useGetMessagesMutation } from "@/api";
import { useEffect, useState } from "react";
import { Loading } from "@/pages";
var socket: any;
interface IProps {
  idRoomChat: string;
  user: IUserPro;
  nowSend: any;
}

const ChatBox = ({ idRoomChat, user, nowSend }: IProps) => {
  const [listMess, setListMess] = useState<IListMessage | any>(undefined);
  const [getMess, resultGetMess] = useGetMessagesMutation();
  socket = io("http://localhost:8080");
  useEffect(() => {
    socket.emit("setup", user);
    socket.on("connected", () => {
      // setconnectedtosocket(true);
    });

    if (idRoomChat !== undefined) {
      getMess(idRoomChat)
        .unwrap()
        .then((messages) => {
          const arrayOfObjects: any = Object.values(messages.docs).reverse();
          setListMess(arrayOfObjects);
        })
        .catch((error) => console.error("rejected", error));
    }
  }, [idRoomChat]);
  socket.on("message recieved", async (newMessage: any) => {
    setListMess((prev: any) => {
      return [...prev, newMessage];
    });
  });

  useEffect(() => {
    if (listMess !== undefined && nowSend?.data?.mess !== undefined) {
      setListMess((prev: any) => {
        return [...prev, nowSend?.data?.mess];
      });
    }
  }, [nowSend.isSuccess]);

  if (resultGetMess?.isSuccess && listMess !== undefined) {
    return (
      <>
        <main className="overflow-x-hidden overflow-scroll h-[76vh] px-3 pb-8">
          {listMess.map((item: any, i: string) =>
            item.sender._id !== user._id ? (
              <SentenceLeftChat
                key={String(i)}
                name={
                  item?.sender.informations?.firstName +
                  item?.sender.informations?.lastName
                }
                uid={item?.sender?._id}
                content={item?.content}
                time={item?.createdAt}
                avatar_url={item?.sender?.information?.avatar_url}
              />
            ) : (
              <SentenceRightChat
                key={String(i)}
                name={
                  item?.sender.informations?.firstName +
                  item?.sender.informations?.lastName
                }
                uid={item?.sender?._id}
                content={item?.content}
                time={item?.createdAt}
                avatar_url={item?.sender?.information?.avatar_url}
              />
            )
          )}
        </main>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default ChatBox;
