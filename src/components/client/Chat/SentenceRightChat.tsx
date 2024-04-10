import { Link } from "react-router-dom";
import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");
interface IProps {
  name: string;
  uid: string;
  content: string;
  time: string;
  avatar_url: Array<string>;
}

const SentenceRightChat = (props: IProps) => {
  return (
    <>
      <div className="flex justify-end my-2">
        <Link to={`/profiles/?id=${props.uid}`} className="order-2">
          <div className="rounded-full">
            <img
              className="h-12 w-12 bg-cover rounded-full"
              src={props.avatar_url[0]}
              alt=""
            />
          </div>
        </Link>
        <div className="order-1 max-w-[65%] bg-blue-600 text-white rounded-md px-4 py-1 pb-3">
          <div>{props.content}</div>
          <div className="text-xs text-gray-200 text-left ">
            {moment(props.time).fromNow()}
          </div>
        </div>
      </div>
    </>
  );
};

export default SentenceRightChat;
