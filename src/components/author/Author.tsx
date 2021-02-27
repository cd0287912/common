import React from 'react';
import { history } from 'umi';
import { message } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import './Author.scss';
import author from '@/assets/images/avatar.jpg';
const list = [
  {
    label: 'demo',
    path: '/',
  },
  {
    label: '阅历',
    path: '/',
  },
  {
    label: '管理',
    path: '/admin/page/create',
  },
];
export default () => {
  const handleRouterChange = item => {
    return () => {
      if (item.path === '/') {
        return message.info('功能尚未开发!');
      }
      history.push(item.path);
    };
  };
  return (
    <div className="lv-author-container lv-card-default">
      <div className="lv-author-top">
        <a href="">
          <img
            className="lv-author-pic lv-border-circle"
            src={author}
            alt="author"
          />
        </a>
        <div className="lv-author-title lv-fs-18 lv-mt-10 lv-mb-10">
          忘不了oh
        </div>
        <p className="lv-author-desc lv-fs-12">忘不了のDEMO站</p>
        <div className="lv-author-concat">
          <WechatOutlined />
        </div>
      </div>
      <ul className="lv-author-bottom">
        {list.map(item => (
          <li
            onClick={handleRouterChange(item)}
            className="lv-pt-10 lv-pb-10 lv-fs-14"
            key={item.label}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
