import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSiginAccountMutation } from "@/api";
import { message } from "antd";
import { LoadingAll } from "@/pages";
import { useCookies } from "react-cookie";
import Signup from "@/components/auth/Signup";
import { useState } from "react";

const index = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useCookies(["accessToken"]);
  const [refresh, setRefresh] = useCookies(["refreshToken"]);
  const [signin, resultSignin] = useSiginAccountMutation();
  const [mdReg, setMdReg] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const res = await signin(values).unwrap();
      console.log(res);
      message.success(res.message);
      setRefresh("refreshToken", res.refreshToken, { path: "/" });
      setAccess("accessToken", res.accessToken, { path: "/" });
      navigate("/");
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

  const onFinishFailed = (errorInfo: any) => {
    console.error("Form validation failed:", errorInfo);
  };

  const handleModel = (): void => {
    setMdReg(!mdReg);
  };

  return (
    <>
      {mdReg && <Signup key={1} handleModel={handleModel} />}
      {resultSignin.isLoading && <LoadingAll />}

      <section>
        <div className="min-h-full">
          <div className="min-h-[76%] bg-[#F0F2F5] w-full">
            <main className="max-w-[1200px] m-auto flex justify-center items-center h-[76%]">
              <div className="lg:flex w-full">
                <div className="lg:order-1 lg:w-[50%] max-lg:pt-[10%] lg:py-[14%]">
                  <div className="flex justify-center">
                    <div className="max-lg:text-center lg:text-left ">
                      <h1 className="font-bold text-5xl max-lg:text-[28px] text-[#0866FF]">
                        OneChat App
                      </h1>
                      <h5 className="max-lg:pt-[6px] lg:pt-[16px]">
                        Chào mừng bạn đến với chúng tôi kết nối với bạn bè ngay
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="lg:order-2 lg:w-[50%] py-[10%] px-[7%]">
                  <div className="shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_1px_3px_1px] rounded-md bg-[#fff] ">
                    <main
                      className="lg:py-[40px] py-3 text-2xl max-lg:px-3"
                      style={{
                        width: "100%",
                        maxWidth: "360px",
                        margin: "0 auto",
                      }}
                    >
                      <Form
                        size="large"
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          labelCol={{ span: 0 }}
                          wrapperCol={{ span: 24 }}
                          name="email_tel"
                          rules={[
                            {
                              required: true,
                              message:
                                "Email hoặc số điện thoại không được bỏ trống !",
                            },
                            {
                              message:
                                "Email hoặc số điện thoại không hợp lệ !",
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
                          labelCol={{ span: 0 }}
                          wrapperCol={{ span: 24 }}
                          name="password"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Mật khẩu không được bỏ trống !",
                            },
                            {
                              validator: (_, value) => {
                                if (value && value.includes(" ")) {
                                  return Promise.reject(
                                    "Mật khẩu không được chứa khoảng trắng !"
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
                              backgroundColor: "#0866FF",
                              height: "45px",
                              fontSize: "18px",
                              fontWeight: "700",
                              marginTop: "10px",
                              borderRadius: "10px",
                            }}
                            htmlType="submit"
                          >
                            Đăng nhập
                          </Button>
                        </Form.Item>
                        <div className="flex justify-center">
                          <Link
                            to={"/forgot-password"}
                            className="text-[#0866FF] text-center text-base inline"
                          >
                            Quên mật khẩu ?
                          </Link>
                        </div>
                        <div className="w-full h-[1px] bg-gray-400 mt-4"></div>
                        <div className="py-4 flex justify-center">
                          <div
                            onClick={() => setMdReg(true)}
                            className="cursor-pointer bg-[#00A400] text-white font-bold text-lg rounded-lg py-2 px-5"
                          >
                            Tạo tài khoản mới
                          </div>
                        </div>
                      </Form>
                    </main>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="min-h-[24%] bg-[#FFFFFF] w-full text-center">
            <header className="py-3 px-2">
              ©2003-2024 OneChat App Vietnam JSC. All rights reserved.
            </header>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
