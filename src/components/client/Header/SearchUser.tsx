import { useLazySearchUserQuery } from "@/api/user";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchUser = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [keySearch, setKeySearch] = useState("");
  searchParams.get("key") == null ? "" : searchParams.get("key");
  const [trigger, {}] = useLazySearchUserQuery();
  const onSearch = async (e: any) => {
    e.preventDefault();
    await trigger(String(keySearch));
    navigate(`/search/top?key=${keySearch}`);
  };
  return (
    <>
      <div className="flex flex-col p-2 max-w-[500px] lg:w-[500px]">
        <form action="" onSubmit={(e) => onSearch(e)}>
          <div
            className="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 py-1"
            style={{ top: 5 }}
          >
            <input
              className="font-bold uppercase rounded-full w-full py-2 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
              type="text"
              placeholder="Tìm kiếm người dùng ..."
              value={keySearch}
              onChange={(e) => setKeySearch(e?.target?.value)}
            />

            <button type="submit">
              <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchUser;
