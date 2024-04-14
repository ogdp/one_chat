import { useGetAllChatUserQuery } from "@/api";
import ItemBar from "./ItemBar";
import SearchBox from "./SearchBox";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

const ChatBar = () => {
  const { data, isSuccess } = useGetAllChatUserQuery("");
  const [listChat, setListChat] = useState<any>(undefined);

  useEffect(() => {
    if (isSuccess) setListChat(data?.docs);
  }, [isSuccess]);
  if (isSuccess && listChat !== undefined) {
    return (
      <>
        <section className="border-l-[1px] border-l-slate-200 h-full">
          <SearchBox />
          <div className="overflow-x-hidden overflow-scroll h-[82vh]">
            {listChat?.map((item: any, i: string) => {
              return (
                <div key={i}>
                  <ItemBar
                    guestId={item?.users[0]?._id ? item?.users[0]?._id : ""}
                    name={
                      item?.users[0]?.information !== undefined
                        ? item?.users[0]?.information?.firstName +
                          " " +
                          item?.users[0]?.information?.lastName
                        : "Bạn"
                    }
                    lastChat={item.latestMessage?.content}
                    time={moment(item?.latestMessage?.createdAt).fromNow()}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </>
    );
  }
};

export default ChatBar;
