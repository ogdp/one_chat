interface IProps {
  name: string;
  lastChat: string;
  time: string;
  guestId: string;
  onSwitchChat: (room: string) => void;
}
const ItemBar = (props: IProps) => {
  return (
    <>
      <div className="border-b-[1px] border-b-slate-200 px-4 py-2 ">
        <span
          className="font-medium inline-flex items-center gap-x-1 hover:bg-gray-200 text-blue-700 cursor-pointer"
          onClick={() => props.onSwitchChat(props.guestId)}
        >
          {props.name}
          <img
            src="https://i.ibb.co/NN0c8gh/Dbsprg-Iu-YE0.png"
            className="h-4 w-2"
          />
        </span>
        <h5 className="text-sm truncate line-clamp-1 text-gray-600">
          {props.lastChat}
        </h5>
        <h6 className="text-sm text-blue-600">{props.time}</h6>
      </div>
    </>
  );
};

export default ItemBar;
