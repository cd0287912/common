import React, { useState, useEffect } from 'react';
import './type.scss';
import { Button, Table, Pagination, Space, Popconfirm } from 'antd';
import AddTypeForm from './addTypeForm';
import { getPageType, delPageTypeApi, changePageTypeApi } from '@/api';
export default () => {
  const [state, setState] = useState({
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    show: false,
    reload: false,
    current: null,
  });

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      width: 200,
      key: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '描述',
      align: 'center',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '封面',
      align: 'center',
      dataIndex: 'mask',
      key: 'mask',
      render: text => <img width="50" src={text} alt="" />,
    },
    {
      title: '系列',
      align: 'center',
      dataIndex: 'series',
      key: 'series',
      render: text => <span>{text ? '是' : '否'}</span>,
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      key: 'action',
      render: (text: null, record) => (
        <Space size="middle">
          <a onClick={() => handleChangeStatus(record)}>
            {record.status ? '停用' : '启用'}
          </a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDel(record)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getPageType({ pageNo: state.pageNo, pageSize: state.pageSize }).then(
      res => {
        if (res) {
          setState({ ...state, list: res.data.list, total: res.data.total });
        }
      },
    );
  }, [state.pageNo, state.pageSize, state.reload]);

  const handleEdit = record => {
    setState({ ...state, show: true, current: record });
  };

  const handleDel = async ({ _id }) => {
    const result = await delPageTypeApi(_id);
    if (result) {
      setState({ ...state, pageNo: 1, reload: !state.reload });
    }
  };

  const handleChangeStatus = async ({ _id, status }) => {
    const result = await changePageTypeApi(_id, { status: !status });
    if (result) {
      setState({ ...state, reload: !state.reload });
    }
  };

  const onRest = () => {
    setState({ ...state, reload: !state.reload, show: false });
  };

  return (
    <div className="lv-admin-type-container">
      <Button
        onClick={() => setState({ ...state, show: true, current: null })}
        type="primary"
      >
        添加
      </Button>
      <div className="lv-admin-type-content">
        <Table
          columns={columns}
          rowKey="_id"
          pagination={false}
          dataSource={state.list}
        />
        <Pagination
          current={state.pageNo}
          pageSize={state.pageSize}
          total={state.total}
          onChange={pageNo => setState({ ...state, pageNo })}
          showTotal={total => `共 ${total} 条分类 `}
          className="lv-admin-type-content-page"
        />
      </div>
      <AddTypeForm state={state} setState={setState} />
    </div>
  );
};
