import { FiLink, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useGetMeQuery } from "@/api";

interface IProps {
  uid: string;
  fullName: string;
  avatar_url: string[];
}

const InfoUserTop = (props: IProps | undefined) => {
  const { data: meData } = useGetMeQuery<any>("me");
  if (props !== undefined) {
    return (
      <div className="w-full h-[25vh] border-b-[1px] border-gray-300 relative">
        <div className="absolute bottom-[-16%] left-[16%] flex items-center">
          <img
            src={props.avatar_url[0]}
            alt=""
            className="h-52 w-52 rounded-full"
          />{" "}
          <div className="pl-7">
            <h3 className="cursor-pointer font-extrabold text-4xl mb-2 uppercase">
              {props.fullName}
            </h3>
            <h6 className="font-medium text-gray-600">99.999 người theo dõi</h6>
          </div>
        </div>
        <div className="absolute bottom-[6%] right-[16%] flex items-center font-medium gap-x-2">
          {props?.uid !== meData?.user?._id && (
            <Link to={`/chat/${props.uid}`}>
              <button
                className="flex items-center gap-x-2  px-7 py-2 rounded-md border border-gray-400 hover:bg-gray-300 bg-gray-200"
                style={{ transition: "all .35s" }}
              >
                <FiMessageCircle /> Nhắn tin
              </button>
            </Link>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              message.success("Sao chép link thành công");
            }}
            className="px-3 py-3 rounded-md border border-gray-400 hover:bg-gray-300 bg-gray-200"
            style={{ transition: "all .35s" }}
          >
            <FiLink size={16} className="font-bold" />
          </button>
        </div>
      </div>
    );
  }
};

export default InfoUserTop;
