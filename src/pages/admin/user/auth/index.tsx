import React, { useEffect, useState } from 'react';
import { Table, Pagination, Space, Popconfirm, Button } from 'antd';
import './auth.scss';
import { delAuthApi, getAuthApi } from '@/api';
import Modal from './modal';
export default () => {
  const [data, setData] = useState({
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    reload: false,
    showModal: false,
    current: null,
  });
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      width: 200,
      key: 'name',
    },
    {
      title: '菜单',
      align: 'center',
      dataIndex: 'auth',
      key: 'auth',
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      key: 'action',
      render: (text: null, record) => (
        <Space size="middle">
          <Popconfirm
            placement="top"
            title="Are you sure to delete this?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => remove(record._id)}
          >
            <a>移除</a>
          </Popconfirm>
          <a onClick={() => update(record)}>编辑</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getList(data.pageNo, data.pageSize);
  }, [data.pageNo, data.pageSize, data.reload]);

  const getList = (pageNo, pageSize) => {
    const params = {
      pageNo,
      pageSize,
    };
    getAuthApi(params).then(res => {
      if (res) {
        setData({
          ...data,
          list: res.data.list,
          total: res.data.total,
        });
      }
    });
  };

  const remove = async _id => {
    const result = await delAuthApi(_id);
    if (result) {
      setData({
        ...data,
        pageNo: 1,
        reload: !data.reload,
      });
    }
  };
  const update = target => {
    setData({
      ...data,
      current: target,
    });
  };
  const addRole = () => {
    setData({
      ...data,
      current: null,
      showModal: true,
    });
  };
  return (
    <div className="lv-auth-container">
      <Modal data={data} setData={setData} />
      <div className="lv-auth-container-head">
        <Button onClick={addRole} type="primary">
          添加角色
        </Button>
      </div>
      <div className="lv-auth-container-content">
        <Table
          columns={columns}
          rowKey="_id"
          pagination={false}
          dataSource={data.list}
        />
        <Pagination
          current={data.pageNo}
          pageSize={data.pageSize}
          total={data.total}
          onChange={pageNo => setData({ ...data, pageNo })}
          showTotal={total => `共 ${total} 个角色`}
          className="lv-auth-container-content-page"
        />
      </div>
    </div>
  );
};
