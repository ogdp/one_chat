import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { Button, Form, Input, Space, Upload } from "antd";

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
};

const ChatInput: React.FC = () => (
  <>
    <section className="py-2 pt-6 px-2 border-t-[1px] border-t-gray-100">
      <Form name="validate_other" onFinish={onFinish} style={{ width: "100%" }}>
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
            name="message"
            rules={[{ required: true, message: "Hãy điền nội dung chat" }]}
            style={{
              display: "inline-block",
              width: "87%",
            }}
          >
            <Space.Compact style={{ width: "100%", outline: "0" }} size="large">
              <Input
                style={{ height: "40px" }}
                placeholder="Nhập nội dung chat"
              />
              <Button type="default">Gửi</Button>
            </Space.Compact>
          </Form.Item>
        </Form.Item>
      </Form>
    </section>
  </>
);

export default ChatInput;
