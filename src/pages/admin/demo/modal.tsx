import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { createDemoApi, updateDemoApi } from '@/api';
export default props => {
  const { data, setData } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (data.current) {
      form.setFieldsValue(data.current);
    } else {
      form.resetFields();
    }
  }, [data.showModal]);
  const onCloseShow = () => {
    setData({
      ...data,
      current: null,
      showModal: false,
    });
  };
  const submit = () => {
    form.validateFields().then(async value => {
      if (data.current) {
        await updateDemoApi(data.current._id, value);
      } else {
        await createDemoApi(value);
      }
      setData({
        ...data,
        showModal: false,
        current: null,
        reload: !data.reload,
      });
    });
  };
  return (
    <Modal
      title="新增项目"
      visible={data.showModal}
      okText="保存"
      cancelText="取消"
      onOk={submit}
      onCancel={onCloseShow}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="项目名称:"
          name="name"
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>
        <Form.Item
          label="项目链接:"
          name="addre"
          rules={[{ required: true, message: '请输入项目链接' }]}
        >
          <Input placeholder="请输入项目链接" />
        </Form.Item>
        <Form.Item
          label="封面:"
          name="cover"
          rules={[{ required: true, message: '请输入项目封面' }]}
        >
          <Input placeholder="请输入项目封面" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
