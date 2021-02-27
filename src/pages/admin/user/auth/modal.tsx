import React, { useEffect } from 'react';
import { Form, Input, Modal, Tree } from 'antd';
// import { createDemoApi, updateDemoApi } from '@/api';

const treeData = [
  {
    title: '首页',
    key: 'index',
  },
  {
    title: '文章管理',
    key: 'page',
    children: [
      {
        title: '文章创作',
        key: 'page_create',
      },
      {
        title: '文章列表',
        key: 'page_list',
      },
      {
        title: '文章分类',
        key: 'page_type',
      },
    ],
  },
  {
    title: '用户管理',
    key: 'user',
    children: [
      {
        title: '用户列表',
        key: 'user_list',
      },
      {
        title: '角色列表',
        key: 'user_role_list',
      },
    ],
  },
  {
    title: '资源管理',
    key: 'resource',
  },
  {
    title: '项目管理',
    key: 'demo',
  },
  {
    title: '个人中心',
    key: 'personal',
  },
];
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
      console.log(value);
      return;
      if (data.current) {
        // await updateDemoApi(data.current._id, value);
      } else {
        // await createDemoApi(value);
      }
      setData({
        ...data,
        showModal: false,
        current: null,
        reload: !data.reload,
      });
    });
  };
  const onSelect = menu => {
    console.log(menu);
  };
  return (
    <Modal
      getContainer={false}
      title="新增角色"
      visible={data.showModal}
      okText="保存"
      cancelText="取消"
      onOk={submit}
      onCancel={onCloseShow}
    >
      <Form layout="vertical" form={form} name="control-hooks">
        <Form.Item
          label="角色名称:"
          name="name"
          rules={[{ required: true, message: '请输入角色名称' }]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item label="菜单:" name="menu">
          <Tree
            onSelect={onSelect}
            defaultExpandAll
            checkable
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
