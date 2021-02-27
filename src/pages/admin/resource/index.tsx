import React, { useEffect, useState, useRef } from 'react';
import { Button, Table, Pagination, Space, Popconfirm, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './resource.scss';
import { getResourceApi, delResourceApi, fileUpload } from '@/api';
import { formatDate } from '@/ultis';
import Clipboard from '../../../ultis/clipboard';
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
export default () => {
  const inputRef = useRef<HTMLInputElement>();
  const [data, setData] = useState({
    list: [],
    total: 0,
    pageNo: 1,
    pageSize: 10,
    reload: false,
    loading: false,
    percentage: 0,
  });
  const columns = [
    {
      title: '资源名称',
      dataIndex: 'name',
      width: 300,
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      align: 'center',
      key: 'type',
    },
    {
      title: '日期',
      align: 'center',
      dataIndex: 'create_time',
      key: 'create_time',
      render: text => <span>{formatDate(text, 'yyyy-MM-dd')}</span>,
    },
    {
      title: '预览',
      align: 'center',
      dataIndex: 'path',
      key: 'path',
      render: (text, record) => {
        if (record.type.indexOf('image') != -1) {
          return <img style={{ maxWidth: '50px' }} src={text} />;
        } else {
          return null;
        }
      },
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
          <a onClick={event => Clipboard(record.path, event)}>复制链接</a>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getResourceApi({ pageNo: data.pageNo, pageSize: data.pageSize }).then(
      res => {
        if (res) {
          setData({
            ...data,
            list: res.data.list,
            total: res.data.total,
          });
        }
      },
    );
  }, [data.pageNo, data.pageSize, data.reload]);
  const remove = async _id => {
    const result = await delResourceApi(_id);
    if (result) {
      setData({
        ...data,
        pageNo: 1,
        reload: !data.reload,
      });
    }
  };
  const fileChange = files => {
    const file = files.target.files[0];
    if (file) {
      const form = new FormData();
      form.append('file', file);
      fileUpload(form, progress => {
        if (progress.lengthComputable) {
          setData({
            ...data,
            loading: true,
            percentage: Number(Math.ceil(progress.loaded / progress.total)),
          });
        }
      })
        .then(res => {
          if (res) {
            setData({
              ...data,
              loading: false,
              percentage: 0,
              pageNo: 1,
              reload: !data.reload,
            });
          }
        })
        .catch(() => {
          setData({
            ...data,
            loading: false,
          });
        });
    }
  };
  return (
    <div className="lv-admin-resource-container">
      {data.loading ? (
        <div className="lv-modal">
          <Spin
            className="lv-block-center"
            tip={`${data.percentage}%`}
            indicator={antIcon}
          />
        </div>
      ) : null}
      <div className="lv-admin-resource-container-head">
        <input
          ref={inputRef}
          onChange={fileChange}
          className="hide"
          type="file"
        />
        <Button onClick={() => inputRef.current.click()} type="primary">
          资源上传
        </Button>
      </div>
      <div className="lv-admin-resource-container-content">
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
          showTotal={total => `共 ${total} 条资源 `}
          className="lv-admin-resource-container-content-page"
        />
      </div>
    </div>
  );
};
