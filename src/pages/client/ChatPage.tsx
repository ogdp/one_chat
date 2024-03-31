import ChatBar from "@/components/client/Chat/ChatBar";
import ChatBox from "@/components/client/Chat/ChatBox";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const pathh = useParams();
  console.log(pathh);
  return (
    <>
      <section className="flex min-h-full">
        <div className="w-[70%]">
          <ChatBox />
        </div>
        <div className="w-[28%]">
          <ChatBar />
        </div>
      </section>
    </>
  );
};

export default ChatPage;
