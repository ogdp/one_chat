import { Link } from "react-router-dom";

interface IProps {
  name: string;
  lastChat: string;
  time: string;
  guestId: string;
}
const ItemBar = (props: IProps) => {
  return (
    <>
      <div className="border-b-[1px] border-b-slate-200 px-4 py-2 ">
        <Link to={`/chat/${props.guestId}`}>
          <span className="font-medium inline-flex items-center gap-x-1 hover:bg-gray-200 text-blue-700">
            {props.name}
            <img
              src="https://i.ibb.co/NN0c8gh/Dbsprg-Iu-YE0.png"
              className="h-4 w-2"
            />
          </span>
        </Link>
        <h5 className="text-sm truncate line-clamp-1 text-gray-600">
          {props.lastChat}
        </h5>
        <h6 className="text-sm text-blue-600">{props.time}</h6>
      </div>
    </>
  );
};

export default ItemBar;
