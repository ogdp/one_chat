import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  message,
  Upload,
  Image,
  UploadProps,
  UploadFile,
  GetProp,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useGetMeQuery, useSiginupAccountMutation } from "@/api";
import { LoadingAll } from "@/pages";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

dayjs.extend(customParseFormat);
const UpdateUser = () => {
  const [signup, resultSignup] = useSiginupAccountMutation();
  const [form] = Form.useForm();
  const { data, isSuccess } = useGetMeQuery("me");
  const dateFormat = "YYYY-MM-DD";
  const minYear = dayjs(String(dayjs().year() - 90)).format("YYYY-MM-DD");
  const maxYear = dayjs(String(dayjs().year() - 9)).format("YYYY-MM-DD");

  //   Upload image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [avatarFileSend, setAvatarFileSend] = useState<File | any>();
  // ---
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

  if (!data.success) null;
  const { user } = data;

  //   Upload image
  const convertImageToBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      // Make new FileReader
      let reader: any = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);
      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ file }) => {
    setAvatarFileSend(file);
    const base64Image = await convertImageToBase64(file.originFileObj);
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: String(base64Image),
      },
    ]);
    return false;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  //   ----
  return (
    <>
      {resultSignup.isLoading && <LoadingAll />}
      <section className="w-full flex justify-center items-center pt-10">
        <main
          style={{
            width: "100%",
            maxWidth: "820px",
            margin: "0 auto",
            padding: "60px 30px 60px 30px",
          }}
          className="shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_1px_3px_1px] rounded-md bg-[#fff]"
        >
          <h1 className="text-center text-3xl font-bold pb-10">
            Cập nhật thông tin tài khoản
          </h1>
          <Form
            size="large"
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: "100%" }}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              lastName: user.information.lastName,
              firstName: user.information.firstName,
              email_tel: user.email_tel,
              gender: user.information.gender,
              dateOfBirth: dayjs(user.information.dateOfBirth),
            }}
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
              labelCol={{ span: 2 }}
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
              labelCol={{ span: 2 }}
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
                format={dateFormat}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
              <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={({ onSuccess }) => false}
                accept="image/*"
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                  }}
                  src={previewImage}
                />
              )}
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
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </main>
      </section>
    </>
  );
};

export default UpdateUser;
