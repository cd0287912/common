import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import Search from './search';
import { Table, Pagination, Space, Popconfirm } from 'antd';
import {
  getPageApi,
  getAllPageTypesApi,
  delPageApi,
  updatePageAttrApi,
} from '@/api';
import './list.scss';
import { formatDate } from '@/ultis';
export default () => {
  const [typeList, setTypeList] = useState([]);
  const [page, setPage] = useState({
    list: [],
    pageNo: 1,
    pageSize: 10,
    total: 0,
  });
  const getPage = (pageNo, pageSize = 10) => {
    getPageApi({
      pageNo: pageNo,
      pageSize: pageSize,
    }).then(res => {
      if (res) {
        setPage({
          ...page,
          pageNo,
          list: res.data.list,
          total: res.data.total,
        });
      }
    });
  };
  /* 文章列表 */
  useEffect(() => {
    getPage(page.pageNo);
  }, [page.pageNo]);
  useEffect(() => {
    getAllPageTypesApi().then(res => {
      if (res) {
        setTypeList(res.data);
      }
    });
  }, []);

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: text => <a>{text}</a>,
    },
    {
      title: '作者',
      align: 'center',
      dataIndex: 'auth',
      key: 'auth',
      width: 120,
      render: text => <span>{text ? text.username : ''}</span>,
    },
    {
      title: '分类',
      align: 'center',
      dataIndex: 'type',
      key: 'type',
      render: text => (
        <Space>
          {text.map(item => (
            <span key={item}>{item.title}</span>
          ))}
        </Space>
      ),
    },
    {
      title: '浏览量',
      align: 'center',
      dataIndex: 'hot',
      key: 'hot',
    },
    {
      title: '日期',
      align: 'center',
      dataIndex: 'time',
      key: 'time',
      width: 220,
      render: (time: Number) => (
        <span>{formatDate(time, 'yyyy-MM-dd hh:mm')}</span>
      ),
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      width: 240,
      render: (text: null, record) => (
        <Space size="middle">
          {record.is_Publish ? (
            <a onClick={() => updatePageType(record._id, 'is_Publish', false)}>
              下架
            </a>
          ) : (
            <a onClick={() => updatePageType(record._id, 'is_Publish', true)}>
              上架
            </a>
          )}
          {record.is_top ? (
            <a onClick={() => updatePageType(record._id, 'is_top', false)}>
              取消置顶
            </a>
          ) : (
            <a onClick={() => updatePageType(record._id, 'is_top', true)}>
              置顶
            </a>
          )}
          <a onClick={() => onEdit(record._id)}>编辑</a>
          <Popconfirm
            placement="top"
            title="确认删除?"
            okText="删除"
            cancelText="取消"
            onConfirm={() => onDel(record)}
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  /* 删除文章 */
  const onDel = async ({ _id }) => {
    const result = await delPageApi(_id);
    if (result) {
      getPage(1);
    }
  };
  /* 更新文章状态 */
  const updatePageType = async (_id, type, value) => {
    const result = await updatePageAttrApi(_id, { [type]: value });
    if (result) {
      getPage(page.pageNo);
    }
  };
  /* 编辑文章 */
  const onEdit = _id => {
    history.push(`/admin/page/create?_id=${_id}`);
  };
  return (
    <div className="lv-admin-page-list-container">
      <div className="lv-admin-page-list-search">
        <Search typeList={typeList} />
      </div>
      <div className="lv-admin-page-list-content">
        <Table
          columns={columns}
          rowKey="_id"
          pagination={false}
          dataSource={page.list}
        />
        <Pagination
          current={page.pageNo}
          pageSize={page.pageSize}
          total={page.total}
          onChange={pageNo => setPage({ ...page, pageNo })}
          showTotal={total => `共 ${total} 篇文章 `}
          className="lv-mt-10"
        />
      </div>
    </div>
  );
};
