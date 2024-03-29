import { useGetGuestQuery } from "@/api";
import { Button } from "antd";

const InfoUser = () => {
  //   const user = useGetMeQuery;
  //   const { data, isSuccess } = useGetMeQuery("");
  //   console.log(user);
  const { data, isLoading } = useGetGuestQuery("6606db3346bb0b7b7a56aa19");
  const onClickk = async () => {
    try {
      console.log(data);
      // const { data: any } = await useGetMeQuery("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={async () => onClickk()}
        type="primary"
        className="text-black"
      >
        GetInfoUser
      </Button>
    </div>
  );
};

export default InfoUser;
