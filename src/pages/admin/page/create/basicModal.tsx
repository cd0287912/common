import React from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
const { TextArea } = Input;
export default props => {
  const { preview, setPreview, handle2Preview } = props;
  const [form] = Form.useForm();
  const handle2Close = () => {
    setPreview({
      ...preview,
      showBasic: false,
    });
  };
  return (
    <Modal
      title="文章基础信息设置"
      onCancel={handle2Close}
      visible={preview.showBasic}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handle2Preview}
        initialValues={preview}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="描述"
          name="desc"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <TextArea rows={6} />
        </Form.Item>
        <Form.Item label="分类" name="type">
          <Checkbox.Group options={preview.typeList} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            预览
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
