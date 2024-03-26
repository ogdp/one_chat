import {
  Form,
  Input,
  Button,
  Checkbox,
  Radio,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSiginupAccountMutation } from "@/api";
import { LoadingAll } from "@/pages";

dayjs.extend(customParseFormat);

interface IProps {
  handleModel(): void;
}

const Signup = (props: IProps) => {
  const [signup, resultSignup] = useSiginupAccountMutation();

  const dateFormat = "YYYY-MM-DD";
  const minYear = dayjs(String(dayjs().year() - 90)).format("YYYY-MM-DD");
  const maxYear = dayjs(String(dayjs().year() - 9)).format("YYYY-MM-DD");
  const onFinish = async (values: any) => {
    try {
      const data = {
        email_tel: values.email_tel,
        information: {
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: dayjs(String(values.dateOfBirth.$d)).format(
            "YYYY-MM-DD"
          ),
          gender: values.gender,
          avatar_url: [
            "https://res.cloudinary.com/minhduc/image/upload/v1710836772/one_chat_db/ayczza4wipygfvepvrup.png",
          ],
        },
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      const res = await signup(data).unwrap();
      await message.success(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.error("Sign-in error:", error);
      if (error?.data?.error) {
        message.error(error.data.error[0]);
      } else if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      {resultSignup.isLoading && <LoadingAll />}
      <section className="fixed flex justify-center items-center w-screen h-screen z-10">
        <aside
          onClick={() => props.handleModel()}
          className="btn-close fixed min-h-full min-w-full bg-[#cbecffa6] z-10"
        ></aside>
        <main
          style={{
            width: "100%",
            maxWidth: "520px",
            margin: "0 auto",
            padding: "60px 30px 60px 30px",
          }}
          className="fixed z-[20] shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_1px_3px_1px] rounded-md bg-[#fff]"
        >
          <Form
            size="large"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              style={{ marginBottom: "10px" }}
            >
              <Form.Item
                style={{
                  display: "inline-block",
                  float: "left",
                  width: "calc(50% - 8px)",
                }}
                name="lastName"
                rules={[{ required: true, message: "Họ không được bỏ trống!" }]}
              >
                <Input
                  maxLength={16}
                  variant={"filled"}
                  style={{
                    borderBottom: "1px solid black",
                    borderRadius: "0",
                  }}
                  placeholder="Họ"
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: "inline-block",
                  float: "right",
                  width: "calc(50% - 8px)",
                }}
                name="firstName"
                rules={[
                  { required: true, message: "Tên không được bỏ trống!" },
                ]}
              >
                <Input
                  variant={"filled"}
                  style={{
                    borderBottom: "1px solid black",
                    borderRadius: "0",
                  }}
                  maxLength={16}
                  placeholder="Tên"
                />
              </Form.Item>
            </Form.Item>

            <Form.Item
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              name="email_tel"
              rules={[
                {
                  required: true,
                  message: "Email hoặc số điện thoại không được bỏ trống !",
                },
                {
                  message: "Email hoặc số điện thoại không hợp lệ !",
                },
              ]}
            >
              <Input
                variant={"filled"}
                placeholder="Email"
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0",
                }}
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Lựa chọn giới tính" }]}
              style={{ marginBottom: "10px" }}
            >
              <Radio.Group
                style={{
                  marginLeft: "10px",
                }}
              >
                <Radio value="male">Nam</Radio>
                <Radio value="female"> Nữ </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[
                { required: true, message: "Ngày sinh không được để trống" },
              ]}
            >
              <DatePicker
                style={{ marginLeft: "10px" }}
                placeholder="Ngày sinh"
                maxDate={dayjs(String(maxYear), dateFormat)}
                minDate={dayjs(String(minYear), dateFormat)}
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              name="password"
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
                variant={"filled"}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0",
                }}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu xác nhận không khớp!");
                  },
                }),
              ]}
            >
              <Input.Password
                variant={"filled"}
                style={{
                  borderBottom: "1px solid black",
                  borderRadius: "0",
                }}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>
            <Form.Item
              style={{ marginTop: "-20px", marginBottom: "6px", padding: 0 }}
              name="termsOfUse"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 24 }}
              rules={[
                {
                  required: true,
                  message: "Điều khoản không được bỏ trống !!!",
                },
              ]}
            >
              <Checkbox>Chấp nhận tất cả điều khoản bên chúng tôi</Checkbox>
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
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>
        </main>
      </section>
    </>
  );
};

export default Signup;
