import { Avatar, Button, Form, Input, Space, message } from "antd";
import { BsFillSendFill } from "react-icons/bs";
import { useState } from "react";
import { useActionsPostMutation, useGetMeQuery } from "@/api";
import { IPost } from "@/interface/post";

const CommentComp = (item: IPost | any) => {
  const { data: meData } = useGetMeQuery("me");
  const [actionsPost] = useActionsPostMutation();
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const onFinish = async (values: any) => {
    form.resetFields();
    setContent("");
    const payload = {
      contents: values.contents,
      post: item.item._id,
      user: meData.user._id,
      id: item.item._id,
      type: "comment",
    };
    try {
      await actionsPost(payload);
      message.success("Bình luận thành công");
    } catch (error: any) {
      message.error(error.data.message);
    }
  };
  return (
    <>
      <section className="pt-3 px-2 border-t-[1px] border-t-gray-100">
        <Form
          form={form}
          name="validate_other"
          onFinish={onFinish}
          style={{ width: "100%", height: "65px" }}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              style={{
                display: "inline-block",
                width: "10%",
                justifyContent: "right",
                alignItems: "center",
              }}
              className="relative"
            >
              <Avatar
                src={meData?.user?.information?.avatar_url[0]}
                style={{
                  float: "right",
                  marginRight: "10px",
                }}
                size={35}
              />
            </Form.Item>
            <Form.Item
              name="contents"
              rules={[{ required: true, message: "Hãy điền nội dung chat" }]}
              style={{
                display: "inline-block",
                width: "86%",
              }}
            >
              <Space.Compact
                style={{ width: "100%", outline: "0" }}
                size="large"
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

export default CommentComp;
