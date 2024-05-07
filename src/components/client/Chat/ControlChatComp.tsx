import { MdDeleteSweep } from "react-icons/md";

interface IProps {
  toggleModel: () => void;
}

const ControlChatComp = ({ toggleModel }: IProps) => {
  return (
    <>
      <div className="absolute bg-white min-w-[250px] -right-full rounded-md shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] pt-2 pb-3 ">
        <button
          onClick={() => toggleModel()}
          className="min-w-full text-red-600 text-base font-medium flex  items-center gap-x-2 hover:bg-slate-100 transition-all rounded-md px-2 py-1"
        >
          <MdDeleteSweep size={30} />
          <span>Xoá cuộc trò chuyện</span>
        </button>
      </div>
    </>
  );
};

export default ControlChatComp;
