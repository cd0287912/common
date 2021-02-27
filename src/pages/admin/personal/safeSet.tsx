import React from 'react';
import { history } from 'umi';
import md5 from 'md5';
import { Form, Button, Input, notification, message } from 'antd';
import { updateUserPwd } from '@/api';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
export default props => {
  const { username } = props;
  const [form] = Form.useForm();
  const onFinish = async ({
    username,
    password,
    newpassword1,
    newpassword2,
  }) => {
    if (newpassword1 != newpassword2) {
      return notification.error({ message: '两次输入密码不一致', duration: 2 });
    }
    const data = {
      username,
      password: md5(password),
      newpassword1: md5(newpassword1),
      newpassword2: md5(newpassword2),
    };
    const result = await updateUserPwd(data);
    if (result) {
      message.success('两秒后请重新登录');
      setTimeout(() => {
        history.replace('/login');
      }, 2000);
    }
  };
  return (
    <Form
      layout="vertical"
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
    >
      <Form.Item
        initialValue={username}
        name="username"
        label="用户名"
        rules={[{ required: true, message: '用户名不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="旧密码"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="newpassword1"
        label="新密码"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="newpassword2"
        label="新密码"
        rules={[{ required: true, message: '密码不能为空' }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新
        </Button>
      </Form.Item>
    </Form>
  );
};
