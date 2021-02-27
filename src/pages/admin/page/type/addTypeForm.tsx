import React, { useEffect } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import { addPageTypeApi, updatePageTypeApi, getPageTypeApi } from '@/api';
const AddTypeForm = props => {
  const { state, setState } = props;
  useEffect(() => {
    if (state.current) {
      form.setFieldsValue(state.current);
    } else {
      form.resetFields();
    }
  }, [state.show]);

  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.validateFields().then(async values => {
      let result = null;
      if (state.current) {
        result = await updatePageTypeApi(state.current._id, values);
      } else {
        result = await addPageTypeApi(values);
      }
      if (result) {
        reload();
      }
    });
  };
  const onCloseShow = () => {
    setState({ ...state, show: false, current: null });
  };

  const reload = () => {
    setState({ ...state, reload: !state.reload, show: false, current: null });
  };

  return (
    <Modal
      title="新增文章分类"
      visible={state.show}
      okText="保存"
      cancelText="取消"
      onOk={handleSubmit}
      onCancel={onCloseShow}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="标题:"
          name="title"
          rules={[{ required: true, message: '请输入分类标题' }]}
        >
          <Input placeholder="请输入分类标题" />
        </Form.Item>
        <Form.Item label="描述:" name="desc">
          <Input placeholder="请输入分类描述" />
        </Form.Item>
        <Form.Item label="封面:" name="mask">
          <Input placeholder="请输入封面链接" />
        </Form.Item>
        <Form.Item label="启用:" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="是否系列:" name="series" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddTypeForm;
