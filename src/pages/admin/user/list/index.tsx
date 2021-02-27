import React, { useEffect, useState } from 'react';
import { Table, Pagination, Space, Popconfirm } from 'antd';
import './list.scss';
import { delUserApi, getUserApi } from '@/api';
import { formatDate } from '@/ultis';
export default () => {
  const [data, setData] = useState({
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    reload: false,
    current: null,
  });
  const columns = [
    {
      title: '用户',
      dataIndex: 'username',
      width: 300,
      key: 'username',
    },
    {
      title: '日期',
      align: 'center',
      dataIndex: 'time',
      key: 'time',
      render: text => <span>{formatDate(text, 'yyyy-MM-dd')}</span>,
    },
    {
      title: '角色',
      align: 'center',
      dataIndex: 'role',
      key: 'role',
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
          <a onClick={() => update(record)}>禁用</a>
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
    getUserApi(params).then(res => {
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
    const result = await delUserApi(_id);
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
  return (
    <div className="lv-user-container">
      <div className="lv-user-container-content">
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
          showTotal={total => `共 ${total} 个用户`}
          className="lv-user-container-content-page"
        />
      </div>
    </div>
  );
};
