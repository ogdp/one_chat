import { useGetUserSuggestQuery } from "@/api";
import { Loading } from "@/pages";
import { Link } from "react-router-dom";

const HomeBarComp = () => {
  const { data, isLoading } = useGetUserSuggestQuery("");
  let key = "loading";
  if (isLoading) {
    key = "loading";
  }
  if (data?.user?.docs?.length === 0) {
    key = "notfound";
  }
  if (data?.user?.docs?.length > 0) {
    key = "render";
  }
  switch (key) {
    case "loading":
      return (
        <>
          <div className="rounded-xl px-4 my-7 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] inline-flex flex-col">
            <h3 className="pt-3 font-medium text-lg px-2">Người liên hệ mới</h3>
            <Loading />
          </div>
        </>
      );
    case "notfound":
      return (
        <>
          <div className="rounded-xl px-4 my-7 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] inline-flex flex-col">
            <h3 className="pt-3 font-medium text-lg px-2">Người liên hệ mới</h3>
            <h5>Không tìm thấy người dùng</h5>
          </div>
        </>
      );
    case "render":
      return (
        <div className="rounded-xl px-6 my-7 bg-white shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] inline-flex flex-col">
          <h3 className="pt-3 font-medium text-lg px-2">Người liên hệ mới</h3>
          <main className="py-3 max-w-64">
            {data?.user?.docs.map((item: any, i: number) => (
              <div key={i} className=" mb-1 border-b-[1px] border-b-gray-200">
                <Link
                  to={`/chat/${item._id}`}
                  className="gap-x-3 hover:bg-gray-100 transition-all rounded-md px-3 py-1"
                  style={{
                    display: "-webkit-box",
                  }}
                >
                  <div className="rounded-full box-border border-2 border-blue-600 relative">
                    <img
                      src={`${item.information.avatar_url[0]}`}
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 bg-green-500"></div>
                  </div>
                  <div className="py-1 max-w-[76%]">
                    <span className="line-clamp-1 font-medium">
                      {item.information.firstName +
                        " " +
                        item.information.lastName}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </main>
        </div>
      );
    default:
      <>Notfound</>;
      break;
  }
};

export default HomeBarComp;
