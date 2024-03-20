import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại!"
        extra={<Button onClick={() => navigate("/")}>Trở về</Button>}
      />
    </>
  );
};

export default Page404;
