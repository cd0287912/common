import React from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;

export default props => {
  const { typeList } = props;
  const [form] = Form.useForm();
  const handleSearch = (values: any) => {
    console.log(values);
  };
  const handleRest = () => {
    form.resetFields();
  };
  return (
    <Form form={form} layout="inline" onFinish={handleSearch}>
      <Form.Item name="title" label="标题">
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="type" label="分类">
        <Select placeholder="请选择分类" style={{ width: 200 }}>
          {typeList.map(item => (
            <Option key={item._id} value={item._id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="is_publish" label="状态">
        <Select placeholder="请选择状态" style={{ width: 200 }}>
          <Option value="true">已上架</Option>
          <Option value="false">已下架</Option>
        </Select>
      </Form.Item>
      <Form.Item name="is_publish" label="是否置顶">
        <Select placeholder="请选择是否置顶" style={{ width: 200 }}>
          <Option value="true">是</Option>
          <Option value="false">否</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          查询
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleRest}>重置</Button>
      </Form.Item>
    </Form>
  );
};
