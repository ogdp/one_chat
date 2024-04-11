import { IListMessage, ISender } from "@/interface/chat";
import ChatInput from "./ChatInput";
import SentenceLeftChat from "./SentenceLeftChat";
import SentenceRightChat from "./SentenceRightChat";
import { IUserPro } from "@/interface/user";

interface IProps {
  data: IListMessage[] | any;
  chatRoom: ISender;
  uid: string;
  user: IUserPro;
}

const ChatBox = ({ data, chatRoom, uid, user }: IProps) => {
  // console.log(data);
  // console.log(uid);
  return (
    <>
      <section>
        <main className="overflow-x-hidden overflow-scroll h-[82vh] px-3 pb-8">
          {data.map((item: any, i: string) =>
            item.sender._id !== uid ? (
              <SentenceLeftChat
                key={String(i)}
                name={
                  item?.sender.informations?.firstName +
                  item?.sender.informations?.lastName
                }
                uid="1"
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
                uid="1"
                content={item?.content}
                time={item?.createdAt}
                avatar_url={item?.sender?.information?.avatar_url}
              />
            )
          )}
        </main>
        <ChatInput chatRoom={chatRoom} user={user} />
      </section>
    </>
  );
};

export default ChatBox;
