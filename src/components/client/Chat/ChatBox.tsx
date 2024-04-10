import ChatInput from "./ChatInput";
import SentenceLeftChat from "./SentenceLeftChat";
import SentenceRightChat from "./SentenceRightChat";

interface IProps {
  data: any;
  uid: string;
}

const ChatBox = ({ data, uid }: IProps) => {
  console.log(data);
  console.log(uid);
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
        <ChatInput />
      </section>
    </>
  );
};

export default ChatBox;
