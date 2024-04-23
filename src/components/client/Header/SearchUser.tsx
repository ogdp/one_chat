import { useLazySearchUserQuery } from "@/api/user";
import { Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Search } = Input;

const SearchUser = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const keyw = searchParams.get("key") == null ? "" : searchParams.get("key");
  const [trigger, {}] = useLazySearchUserQuery();
  const onSearch = async (values?: string | "") => {
    await trigger(String(values));
    navigate(`/search/top?key=${values}`);
  };
  return (
    <>
      <Search
        placeholder="Tìm kiếm bạn bè"
        allowClear
        enterButton="Search"
        size="large"
        defaultValue={String(keyw)}
        onSearch={onSearch}
      />
    </>
  );
};

export default SearchUser;
