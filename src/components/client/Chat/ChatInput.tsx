import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Upload, message } from "antd";
import { useGetMeQuery, usePostMessageMutation } from "@/api";
import { IListMessage, ISender } from "@/interface/chat";
import { IUserPro } from "@/interface/user";
import { ISendMessage } from "@/interface/message";
import { BsFillSendFill } from "react-icons/bs";

interface IProps {
  chatRoom: ISender;
  user: IUserPro;
}

const ChatInput = ({ chatRoom, user }: IProps) => {
  const [postMess, resultMess] = usePostMessageMutation();
  const [form] = Form.useForm();

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onHandlePostMess = async (data: ISendMessage) => {
    try {
      await postMess(data).unwrap();
      message.success("Gửi tin nhắn thành công");
    } catch (error) {
      message.error("Gửi tin nhắn thất bại");
      console.log(error);
    }
  };

  const onFinish = async (values: any) => {
    const dataMessage: ISendMessage = {
      sender: user?._id,
      content: values?.content,
      chat: chatRoom?._id,
    };
    try {
      await onHandlePostMess(dataMessage);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="py-2 pt-6 px-2 border-t-[1px] border-t-gray-100">
        <Form
          form={form}
          name="validate_other"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{
                display: "inline-block",
                width: "12%",
              }}
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button style={{ height: "40px" }} icon={<UploadOutlined />}>
                  Chọn ảnh
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Hãy điền nội dung chat" }]}
              style={{
                display: "inline-block",
                width: "87%",
              }}
            >
              <Space.Compact
                style={{ width: "100%", outline: "0" }}
                size="large"
              >
                <Input
                  style={{ height: "40px" }}
                  placeholder="Nhập nội dung chat"
                />
                <Button type="default" htmlType="submit">
                  <div>
                    <BsFillSendFill />
                  </div>
                </Button>
              </Space.Compact>
            </Form.Item>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default ChatInput;
