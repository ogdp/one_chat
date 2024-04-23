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
  Space,
  Select,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  useGetMeQuery,
  useUpdateUserMutation,
  useUploadImagesMutation,
} from "@/api";
import { LoadingAll } from "@/pages";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useGetLocationMutation } from "@/api";
import { convertImageToBase64 } from "@/utils/function";
import "@/css/UpdateUser.css";

dayjs.extend(customParseFormat);
const UpdateUser = () => {
  const [updateUser, resultUpdateUser] = useUpdateUserMutation();
  const [getLocation, resultLocation] = useGetLocationMutation();
  const [uploadImage, resultUploadImage] = useUploadImagesMutation();
  const [form] = Form.useForm();
  const { data: meData, isSuccess } = useGetMeQuery<any>("me");
  const dateFormat = "YYYY-MM-DD";
  const minYear = dayjs(String(dayjs().year() - 90)).format("YYYY-MM-DD");
  const maxYear = dayjs(String(dayjs().year() - 9)).format("YYYY-MM-DD");

  //   Upload image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [avatarFileSend, setAvatarFileSend] = useState<File | any>(undefined);
  // ---

  // Location
  const [provinceData, setProvinceData] = useState<any>([]);
  const [districtData, setDistrictData] = useState<any>([]);
  const [district, setDistrict] = useState<string | null>();

  useEffect(() => {
    (async () => {
      try {
        if (meData) {
          const province: any = await getLocation("");
          setProvinceData(province?.data?.results);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Selected location

  const handleProvinceChange = async (value: string) => {
    setDistrict(null);
    try {
      const idProvince = provinceData.filter(
        (item: any) => item.province_name === value
      )[0].province_id;
      const district: any = await getLocation(`/district/${idProvince}`);
      setDistrictData(district?.data?.results);
    } catch (error) {
      return console.error(error);
    }
  };
  const onSecondCityChange = (value: any) => {
    setDistrict(value);
  };

  // ---

  if (!meData.success || !isSuccess) {
    return null;
  }

  const { user } = meData;

  const updateUserInfo = async (informationOld: any) => {
    if (district) informationOld.district = district;
    if (
      informationOld.province == undefined ||
      !informationOld.province ||
      !informationOld.district ||
      informationOld.district == undefined
    ) {
      informationOld.province = meData.user.information?.province;
      informationOld.district = meData.user.information?.district;
    }
    informationOld.dateOfBirth = dayjs(
      String(informationOld.dateOfBirth.$d)
    ).format("YYYY-MM-DDThh:mm:ss.sssZ");
    const { password, ...information } = informationOld;
    const sendData = { ...user };
    const newInfor = { ...user.information, ...information };
    sendData.information = newInfor;
    sendData.password = password;
    try {
      if (avatarFileSend !== undefined) {
        const resIMG: any = await uploadImage(avatarFileSend.originFileObj);
        if (resIMG?.data?.urls?.length > 0) {
          const listIMG = [
            ...sendData?.information?.avatar_url,
            ...resIMG?.data?.urls,
          ].reverse();
          sendData.information.avatar_url = listIMG;
        }
      }

      interface DataObject {
        [key: string]: any;
        information?: DataObject;
      }

      const objectToRemove: string[] = [
        '"information._id"',
        '"information.email_tel"',
        '"_id"',
        '"deleted"',
        '"createdAt"',
        '"updatedAt"',
      ];

      const cleanedData: DataObject = Object.fromEntries(
        Object.entries(sendData).flatMap(([key, value]) => {
          const keyToRemove = `"${key}"`;
          if (objectToRemove.includes(keyToRemove)) return [];

          if (typeof value === "object" && value !== null) {
            value = Object.fromEntries(
              Object.entries(value as DataObject).filter(([key, value]) => {
                const informationKeyToRemove = `"information.${key}"`;
                return !objectToRemove.includes(informationKeyToRemove);
              })
            );
          }

          return [[key, value]];
        })
      );

      return cleanedData;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const onFinish = (informationOld: any) => {
    updateUserInfo(informationOld)
      .then((res: any) => {
        updateUser(res)
          .then((res: any) => {
            if (res.error) {
              message.error(res.error.data.error[0]);
            } else {
              message.success("Cập nhật thông tin thành công");
            }
            console.log(res);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };
  //   Upload image

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({ file }) => {
    if (file.originFileObj) {
      setAvatarFileSend(file);
      const base64Image = await convertImageToBase64(file.originFileObj);
      return setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: String(base64Image),
        },
      ]);
    }
    if (file.status === "removed") {
      setAvatarFileSend(undefined);
      return setFileList([]);
    }
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
      {resultUpdateUser.isLoading ||
        (resultUploadImage.isLoading && <LoadingAll />)}
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
                name="firstName"
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
                name="lastName"
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
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              style={{
                display: "flex",
                justifyContent: "start",
              }}
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Lựa chọn giới tính" }]}
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
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 24 }}
              style={{
                display: "flex",
                justifyContent: "start",
              }}
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
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 24 }}
              style={{
                display: "flex",
                justifyContent: "start",
              }}
              label={
                <label style={{ display: "flex", color: "black" }}>
                  Quê quán
                </label>
              }
            >
              {provinceData.length > 0 && (
                <Space>
                  <Form.Item name="province" noStyle>
                    <Select
                      showSearch
                      placeholder={
                        !meData.user.information.province
                          ? "Tỉnh/TP"
                          : provinceData.filter(
                              (province: any) =>
                                province.province_name ===
                                meData.user?.information.province
                            )[0].province_name
                      }
                      style={{ width: 230 }}
                      onChange={handleProvinceChange}
                      options={provinceData?.map((province: any) => ({
                        label: province?.province_name,
                        value: province?.province_name,
                      }))}
                    />
                  </Form.Item>
                  <Select
                    // allowClear
                    // showSearch
                    style={{ width: 230 }}
                    placeholder={
                      !meData.user.information.district
                        ? "Quận/Huyện"
                        : meData.user.information.district
                    }
                    value={district}
                    onChange={onSecondCityChange}
                    options={districtData?.map((district: any) => ({
                      label: district?.district_name,
                      value: district?.district_name,
                    }))}
                  />
                </Space>
              )}
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
