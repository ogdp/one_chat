import { Button, Form, Input, Space } from "antd";
import { BsFillSendFill } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeIconModel, openIconModel } from "@/slices";

interface IProps {
  onHandle: (val: any) => void;
}

const ChatInput = ({ onHandle }: IProps) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  // const normFile = (e: any) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };

  const onFinish = async (values: any) => {
    form.resetFields();
    setContent("");
    onHandle(values);
  };
  const statusModels = useSelector((state: any) => state.chatSlices);
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
            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item
              style={{
                display: "inline-block",
                width: "10%",
                justifyContent: "right",
                alignItems: "center",
              }}
              className="relative"
            >
              <BsEmojiSmile
                size={26}
                className="cursor-pointer hover:text-yellow-500 transition-all "
                onClick={() => {
                  dispatch(openIconModel());
                }}
                style={{
                  float: "right",
                  marginRight: "10px",
                }}
              />

              {statusModels?.status && (
                <div className="absolute top-[-1400%] left-0 z-10">
                  <Picker
                    data={data}
                    onEmojiSelect={(e: any) => {
                      setContent((prev) => {
                        form.setFields([
                          {
                            name: "content",
                            value: prev + " " + e?.native,
                          },
                        ]);
                        return prev + " " + e?.native;
                      });
                    }}
                    locale="vi"
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "Hãy điền nội dung chat" }]}
              style={{
                display: "inline-block",
                width: "78%",
              }}
            >
              <Space.Compact
                style={{ width: "100%", outline: "0" }}
                size="large"
                onClick={() => dispatch(closeIconModel())}
              >
                <Input
                  style={{ height: "40px" }}
                  placeholder="Nhập nội dung chat"
                  value={String(content)} // Thêm giá trị từ state
                  onChange={(e: any) => setContent(e.target.value)} // Hàm cập nhật state
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
