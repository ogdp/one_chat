import { IListMessage } from "@/interface/chat";
import SentenceLeftChat from "./SentenceLeftChat";
import SentenceRightChat from "./SentenceRightChat";
import { IUserPro } from "@/interface/user";
import { socket, useGetMessagesMutation } from "@/api";
import { useEffect, useState } from "react";
import { Loading } from "@/pages";
interface IProps {
  idRoomChat: string;
  user: IUserPro;
  nowSend: any;
}

const ChatBox = ({ idRoomChat, user, nowSend }: IProps) => {
  const [listMess, setListMess] = useState<IListMessage | any>(undefined);
  const [getMess, resultGetMess] = useGetMessagesMutation();
  useEffect(() => {
    if (idRoomChat !== undefined) {
      getMess(idRoomChat)
        .unwrap()
        .then((messages) => {
          const arrayOfObjects: any = Object.values(messages.docs).reverse();
          setListMess(arrayOfObjects);
        })
        .catch((error) => console.error("rejected", error));
    }
  }, []);
  useEffect(() => {
    socket.on("message new in room", async (newMessage: any) => {
      setListMess((prev: any) => {
        return [...prev, newMessage];
      });
    });
  }, []);

  useEffect(() => {
    if (listMess !== undefined && nowSend?.data?.mess !== undefined) {
      setListMess((prev: any) => {
        return [...prev, nowSend?.data?.mess];
      });
    }
  }, [nowSend.isSuccess, idRoomChat]);

  if (resultGetMess.isSuccess && listMess !== undefined) {
    // console.log("ChatBoxx");
    // console.log("ChatBox idRoomChat :: ", idRoomChat);
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
