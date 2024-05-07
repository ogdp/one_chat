import { Input, Form, Button, Modal, message } from "antd";
import CodeMailComp from "./CodeMailComp";
import { useState } from "react";
import {
  useChangePassUserMutation,
  useGetMeQuery,
  useSendCodeMailMutation,
} from "@/api";
import { isValidEmail } from "@/utils/function";
import { IUpdatePass } from "@/interface/user";

interface IProps {
  activeModelChangePass: () => void;
}

const ChangePassComp = ({ activeModelChangePass }: IProps) => {
  const [form] = Form.useForm();
  const { data: meData, isLoading } = useGetMeQuery("me");
  const [getCode] = useSendCodeMailMutation();
  const [updatePass] = useChangePassUserMutation();
  const [formPass, setFormPass] = useState<IUpdatePass | undefined>(undefined);

  const [activeMail, setActiveMail] = useState(false);
  const onFinish = async (payload: any) => {
    // activeModelChangePass();
    if (isValidEmail(meData?.user?.email_tel)) {
      setFormPass(payload);
      await getCode("");
      activeMailComp();
    } else {
      message.warning("Vui lòng cập nhật Email để thay đổi mật khẩu");
    }
  };

  const activeMailComp = () => {
    setActiveMail(!activeMail);
  };
  const onHandleUpdatePass = async (data: IUpdatePass) => {
    const sendData = { ...formPass, ...data };
    updatePass(sendData)
      .unwrap()
      .then((res) => {
        message.success("Cập nhật mật khẩu thành công !");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        if (err?.data?.type == "code") {
          message.error(err?.data?.message);
        } else {
          activeMailComp();
          message.error(err?.data?.message);
        }
      });
  };
  if (isLoading) return;
  return (
    <>
      <main
        style={{
          width: "100%",
          maxWidth: "820px",
          margin: "0 auto",
          padding: "60px 30px 60px 30px",
        }}
        className=" rounded-md bg-[#fff]"
      >
        <h1 className="text-center text-3xl font-bold pb-10">Đổi mật khẩu</h1>
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
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="password_old"
            rules={[
              { required: true, message: "Mật khẩu cũ không được bỏ trống!" },
              {
                min: 6,
                message: "Mật khẩu cũ phải có ít nhất 6 ký tự!",
              },
              {
                validator: (_, value) => {
                  if (value && value.includes(" ")) {
                    return Promise.reject(
                      "Mật khẩu cũ không được chứa khoảng trắng!"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              allowClear={true}
              variant={"filled"}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Mật khẩu cũ"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="password_new"
            rules={[
              { required: true, message: "Mật khẩu không được bỏ trống!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
              {
                validator: (_, value) => {
                  if (value && value.includes(" ")) {
                    return Promise.reject(
                      "Mật khẩu không được chứa khoảng trắng!"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              allowClear={true}
              variant={"filled"}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Mật khẩu mới"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="password_new_confirm"
            dependencies={["password_new"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận lại mật khẩu mới",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password_new") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không chính xác")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              allowClear={true}
              variant={"filled"}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Mật khẩu xác nhận"
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
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </main>
      {activeMail && (
        <Modal
          centered
          open={activeMail}
          onOk={() => activeMailComp()}
          onCancel={() => activeMailComp()}
          width={700}
          footer={null}
        >
          <CodeMailComp
            activeMailComp={activeMailComp}
            onHandleUpdatePass={onHandleUpdatePass}
          />
        </Modal>
      )}
    </>
  );
};

export default ChangePassComp;
