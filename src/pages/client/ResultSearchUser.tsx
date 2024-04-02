import { useSearchUserQuery } from "@/api/user";
import SearchCard from "@/components/client/SearchCard";
import { FiLink, FiMessageCircle, FiUserPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { LoadingAll } from "..";

const ResultSearchUser = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const key = String(searchParams.get("key"));
  const { data, isLoading } = useSearchUserQuery(key);

  if (isLoading) return <LoadingAll />;
  return (
    <>
      <section className="px-3 py-2 max-w-[50%] m-auto">
        <h3 className="py-2">
          Kết quả tìm kiếm dành cho : <span className="font-medium">{key}</span>
        </h3>
        <div>
          {data?.user.totalDocs > 0 &&
            data.user.docs.map((item: any) => (
              <SearchCard
                key={item._id}
                uid={item._id}
                fullName={
                  item.information.firstName + item.information.lastName
                }
                avatar_url={item.information.avatar_url}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default ResultSearchUser;
