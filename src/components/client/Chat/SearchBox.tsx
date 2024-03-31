import { Button, Input, Space } from "antd";
const SearchBox = () => {
  return (
    <>
      <section className="py-2 px-2">
        <Space.Compact style={{ width: "100%", outline: "0" }} size="large">
          <Input placeholder="Tìm kiếm tên bạn bè" />
          <Button type="default">Tìm kiếm</Button>
        </Space.Compact>
      </section>
    </>
  );
};

export default SearchBox;
