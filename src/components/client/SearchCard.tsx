import { FiLink, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

interface IProps {
  uid: string;
  fullName: string;
  avatar_url: string[];
}

const SearchCard = (props: IProps) => {
  return (
    <>
      <div className="py-3 border-b-[1px] border-b-gray-200">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div>
              <img
                src={props.avatar_url[0]}
                alt=""
                className="h-10 w-10 rounded-full"
              />
            </div>
            <Link to={`/profiles?id=${props.uid}`}>
              <h3 className="font-medium text-lg text-blue-700">
                {props.fullName}
              </h3>
            </Link>
          </div>
          <div>
            <div className="bottom-[6%] right-[16%] flex items-center font-medium gap-x-2">
              <Link to={`/chat/${props.uid}`}>
                <button
                  className="flex items-center gap-x-2  px-7 py-2 rounded-md border border-gray-400 hover:bg-gray-300 bg-gray-200"
                  style={{ transition: "all .35s" }}
                >
                  {" "}
                  <FiMessageCircle /> Nhắn tin
                </button>
              </Link>
              <button
                className="px-3 py-3 rounded-md border border-gray-400 hover:bg-gray-300 bg-gray-200"
                style={{ transition: "all .35s" }}
              >
                <FiLink size={16} className="font-bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
