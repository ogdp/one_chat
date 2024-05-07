import { useGetMeQuery } from "@/api";
import { IUpdatePass } from "@/interface/user";
import { Button, Form, Input } from "antd";

interface IProps {
  activeMailComp: () => void;
  onHandleUpdatePass: (data: IUpdatePass) => void;
}
const CodeMailComp = ({ activeMailComp, onHandleUpdatePass }: IProps) => {
  const { data: meData, isLoading } = useGetMeQuery("me");
  const [form] = Form.useForm();
  const onFinish = (payload: any) => {
    onHandleUpdatePass(payload);
  };
  if (isLoading) return;
  return (
    <>
      <Form
        size="large"
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1 className="text-center text-3xl font-bold pb-10">
          Nhập mã xác minh từ Email
        </h1>
        <p className="py-2 text-base  font-medium">
          Một đoạn mã 6 ký tự đã được gửi đến{" "}
          <span className="text-red-700">{meData?.user?.email_tel}</span>
        </p>
        <Form.Item
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          name="code"
          rules={[
            { required: true, message: "Mã xác minh không được để trống !" },
            {
              pattern: /^(?:\d*)$/,
              message: "Mã xác minh phải là số!",
            },
            { len: 6, max: 6, message: "Mã xác minh bao gồm 6 ký tự là số!" },
            {
              validator: (_, value) => {
                if (value && value.includes(" ")) {
                  return Promise.reject(
                    "Mã xác minh không được chứa khoảng trắng!"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            variant={"filled"}
            style={{
              borderBottom: "1px solid black",
              borderRadius: "0",
            }}
            placeholder="Mã xác minh"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button
            type="primary"
            style={{
              width: "100%",
              backgroundColor: "#00A400",
              height: "45px",
              fontSize: "18px",
              fontWeight: "700",
              marginTop: "10px",
              borderRadius: "10px",
            }}
            htmlType="submit"
          >
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CodeMailComp;
