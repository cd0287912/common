import React, { useEffect, useState } from 'react';
import { Button, Table, Pagination, Space, Popconfirm } from 'antd';
import './demo.scss';
import { delDemoApi, getDemoApi } from '@/api';
import { formatDate } from '@/ultis';
import Modal from './modal';
export default () => {
  const [data, setData] = useState({
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    showModal: false,
    current: null,
    reload: false,
  });
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a target="_blank" href={record.addre}>
          {text}
        </a>
      ),
    },
    {
      title: '日期',
      align: 'center',
      dataIndex: 'time',
      key: 'time',
      width: 200,
      render: text => <span>{formatDate(text, 'yyyy-MM-dd')}</span>,
    },
    {
      title: '封面',
      align: 'center',
      dataIndex: 'cover',
      key: 'cover',
      render: text => <img style={{ maxWidth: '50px' }} src={text} />,
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
    getDemoApi(params).then(res => {
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
    const result = await delDemoApi(_id);
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
      showModal: true,
    });
  };
  const handleShowModal = () => {
    setData({
      ...data,
      current: null,
      showModal: true,
    });
  };
  return (
    <div className="lv-demo-container">
      <Modal data={data} setData={setData} />
      <div className="lv-demo-container-head">
        <Button onClick={handleShowModal} type="primary">
          新增项目
        </Button>
      </div>
      <div className="lv-demo-container-content">
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
          showTotal={total => `共 ${total} 个项目`}
          className="lv-demo-container-content-page"
        />
      </div>
    </div>
  );
};
