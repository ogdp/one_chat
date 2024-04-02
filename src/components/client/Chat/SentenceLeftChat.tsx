import { Link } from "react-router-dom";

interface IProps {
  name: string;
  uid: string;
  content: string;
  time: string;
  avatar_url: Array<string>;
}
const SentenceLeftChat = (props: IProps) => {
  return (
    <>
      <div className="flex my-2">
        <Link to={`/profiles/?id=${props.uid}`} className="order-1">
          <div className="rounded-full">
            <img
              className="h-12 w-12 bg-cover"
              src={props.avatar_url[0]}
              alt=""
            />
          </div>
        </Link>
        <div className="max-w-[65%] bg-slate-100 rounded-md px-4 py-1 pb-3 order-2">
          <div>{props.content}</div>
          <div className="text-xs text-gray-700 text-right ">{props.time}</div>
        </div>
      </div>
    </>
  );
};

export default SentenceLeftChat;
