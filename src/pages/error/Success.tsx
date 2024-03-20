import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="success"
      title="Báo cáo"
      subTitle="Thời gian phản hồi từ 24-48h"
      extra={<Button onClick={() => navigate("/")}>Trở về</Button>}
    />
  );
};

export default Success;
