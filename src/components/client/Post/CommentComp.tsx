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
      <section className="max-lg:pt-0 max-lg:px-0 pt-3 px-2 border-t-[1px] border-t-gray-100">
        <Form
          form={form}
          name="validate_other"
          onFinish={onFinish}
          style={{ width: "100%", height: "65px" }}
        >
          <Form.Item
            style={{ marginBottom: 0 }}
            className="inline-block justify-center items-center w-full"
          >
            <Form.Item className="relative max-lg:pr-1">
              <Avatar
                src={meData?.user?.information?.avatar_url[0]}
                className="mx-[5px]"
                size={35}
              />{" "}
              <Form.Item
                name="contents"
                rules={[{ required: true, message: "Hãy điền nội dung chat" }]}
                style={{
                  display: "inline-block",
                }}
                className="max-lg:w-[80%] w-[calc(100%_-_57px)]"
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
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export default CommentComp;
