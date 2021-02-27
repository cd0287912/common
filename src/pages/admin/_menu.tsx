import React from 'react';
import {
  UserOutlined,
  HomeOutlined,
  CrownOutlined,
  GiftOutlined,
  FileImageOutlined,
  TeamOutlined,
} from '@ant-design/icons';
export default {
  route: {
    path: '/admin',
    routes: [
      // {
      //   path: '/admin/',
      //   exact: true,
      //   name: '首页',
      //   icon: <HomeOutlined />,
      // },
      {
        path: '/admin/page',
        exact: true,
        name: '文章管理',
        icon: <CrownOutlined />,
        routes: [
          {
            path: '/admin/page/create',
            name: '文章创作',
          },
          {
            path: '/admin/page/list',
            name: '文章列表',
          },
          {
            path: '/admin/page/type',
            name: '文章分类',
          },
        ],
      },
      // {
      //   path: '/admin/user',
      //   exact: true,
      //   name: '用户管理',
      //   icon: <TeamOutlined />,
      //   routes: [
      //     {
      //       path: '/admin/user/list',
      //       exact: true,
      //       name: '用户列表',
      //     },
      //     {
      //       path: '/admin/user/auth',
      //       exact: true,
      //       name: '角色管理',
      //     },
      //   ],
      // },
      {
        path: '/admin/resource',
        exact: true,
        name: '资源管理',
        icon: <FileImageOutlined />,
      },
      {
        path: '/admin/demo',
        exact: true,
        name: '项目管理',
        icon: <GiftOutlined />,
      },
      {
        path: '/admin/personal',
        exact: true,
        name: '个人中心',
        icon: <UserOutlined />,
      },
    ],
  },
};
