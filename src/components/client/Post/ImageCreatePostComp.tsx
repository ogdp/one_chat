import { IoClose } from "react-icons/io5";

interface IProps {
  list: any;
  onHandleDelete: (file: File) => void;
}

const ImageCreatePostComp = ({ list, onHandleDelete }: IProps) => {
  if (!list || list.length == 0) return;
  return (
    <>
      <div className="w-full max-h-[400px] overflow-y-auto rounded-lg px-3 py-2 ">
        {list.map((item: any, i: number) => (
          <div
            key={i}
            className="w-full h-full max-h-[300px]  relative rounded-lg mb-3 border border-gray-400 p-1 overflow-hidden"
          >
            <img src={item?.url} className="w-full rounded-lg" />
            <button
              className="rounded-full px-2 py-2 bg-gray-200 absolute right-0 top-0 hover:bg-gray-300 my-3 mx-4"
              onClick={() => onHandleDelete(item.file)}
            >
              <IoClose size={22} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageCreatePostComp;
