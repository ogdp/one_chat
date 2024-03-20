import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Page403 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không được phép truy cập trang này!"
        extra={<Button onClick={() => navigate("/")}>Trở về</Button>}
      />
    </>
  );
};

export default Page403;
