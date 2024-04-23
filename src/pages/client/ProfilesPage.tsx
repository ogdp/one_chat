import { useGetGuestQuery, useGetMeQuery } from "@/api";
import { UpdateUser } from "@/components";
import InfoUserTop from "@/components/client/InfoUserTop";
import { LoadingAll } from "@/pages";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useSearchParams, useNavigate } from "react-router-dom";

const ProfilesPage = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const uid = searchParams.get("id");
  if (uid) {
    const { data, isLoading } = useGetGuestQuery(String(uid));
    isLoading && <LoadingAll />;
    if (data == undefined && !isLoading) {
      return (
        <>
          <Result
            icon={<SmileOutlined />}
            title="Rất tiếc, người dùng không tồn tại!"
            extra={
              <>
                <span
                  onClick={() => navigate(-1)}
                  className="cursor-pointer inline-flex items-center m-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-base font-semibold text-gray-600"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                  </svg>
                  <span className="ml-1">Quay lại</span>
                </span>
              </>
            }
          />
        </>
      );
    } else {
      if (isLoading) return <LoadingAll />;
      const fullName =
        data?.userGuest?.information?.firstName +
        " " +
        data?.userGuest?.information.lastName;
      const uid = data?.userGuest._id;
      const avatar_url = data?.userGuest?.information.avatar_url;
      return (
        <>
          <section>
            {
              <InfoUserTop
                fullName={fullName}
                uid={uid}
                avatar_url={avatar_url}
              />
            }
          </section>
        </>
      );
    }
  } else {
    const { data, isLoading } = useGetMeQuery("me");
    if (isLoading) {
      return <LoadingAll />;
    } else if (!isLoading) {
      const fullName =
        data?.user?.information?.firstName +
        " " +
        data?.user?.information?.lastName;
      const uid = data?.user?._id;
      const avatar_url = data?.user?.information.avatar_url;
      isLoading && <LoadingAll />;
      return (
        <>
          {isLoading && <LoadingAll />}
          <section>
            {
              <InfoUserTop
                fullName={fullName}
                uid={uid}
                avatar_url={avatar_url}
              />
            }
            <UpdateUser />
          </section>
        </>
      );
    }
  }
};

export default ProfilesPage;