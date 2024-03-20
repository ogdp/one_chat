import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Page500 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="500"
        title="500"
        subTitle="Xin lỗi, đã có lỗi xảy ra!"
        extra={<Button onClick={() => navigate("/")}>Trở về</Button>}
      />
    </>
  );
};

export default Page500;
