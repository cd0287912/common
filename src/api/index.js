import axios from 'axios';
import { history } from 'umi';
import { getToken } from '@/ultis';
import { notification } from 'antd';

const instance = axios.create({
  timeout: 10000,
  baseURL: '/api/v1',
});

instance.interceptors.request.use(
  config => {
    config.headers.authorization = getToken();
    return config;
  },
  error => {},
);

instance.interceptors.response.use(
  response => {
    const { status, data, config } = response;
    if (status === 200) {
      const { message, code } = data;
      if (config.showTip) {
        code === 0
          ? notification.success({ message, duration: 2 })
          : notification.error({ message, duration: 2 });
      }
      return code === 0 ? data : null;
    } else {
      Promise.reject(response);
    }
  },
  error => {
    // 请求已发出，但是不在2xx的范围
    const { response } = error;
    const { status, statusText } = response;
    switch (status) {
      case 401:
        notification.error({ message: statusText, duration: 3 });
        localStorage.clear();
        setTimeout(() => {
          history.replace('/login');
        }, 1000);
        return false;
      case 404:
        return notification.error({ message: statusText, duration: 3 });
      case 500:
        return notification.error({ message: statusText, duration: 3 });
    }
  },
);
/* 
  showTip     是否有提示信息
  showLoading 是否有提示信息 默认 false
*/
export const loginApi = data =>
  instance({ url: '/login', method: 'post', data, showTip: true });
export const registApi = data =>
  instance({ url: '/register', method: 'post', data, showTip: true });
export const getUserInfo = () =>
  instance({ url: '/getUserInfo', method: 'get' });
export const updateUserInfo = data =>
  instance({ url: '/updateUserInfo', method: 'post', data, showTip: true });
export const updateUserPwd = data =>
  instance({ url: '/updateUserPwd', method: 'post', data, showTip: true });

/* 资源 */
export const getResourceApi = params =>
  instance({ url: '/resource', method: 'get', params });
export const delResourceApi = id =>
  instance({ url: `/resource/${id}`, method: 'delete', showTip: true });
export const fileUpload = (data, onUploadProgress) =>
  instance({
    url: '/upload',
    method: 'post',
    data,
    showTip: true,
    onUploadProgress: onUploadProgress,
  });

/* 文章类型 */
export const getPageType = params =>
  instance({ url: '/pageType', method: 'get', params });
export const getPageTypeApi = id =>
  instance({ url: `/pageType/${id}`, method: 'get' });
export const getAllPageTypesApi = () =>
  instance({ url: '/pageTypeAll', method: 'get' });
export const addPageTypeApi = data =>
  instance({ url: '/pageType', method: 'post', data, showTip: true });
export const delPageTypeApi = id =>
  instance({ url: `/pageType/${id}`, method: 'delete', showTip: true });
export const updatePageTypeApi = (id, data) =>
  instance({ url: `/pageType/${id}`, method: 'put', data, showTip: true });
export const changePageTypeApi = (id, data) =>
  instance({
    url: `/pageTypeStatus/${id}`,
    method: 'put',
    data,
    showTip: true,
  });

/* 文章 */
export const createPageApi = data =>
  instance({ url: '/page', method: 'post', data, showTip: true });
export const getPageByIdApi = id =>
  instance({ url: `/page/${id}`, method: 'get' });
export const updatePageByIdApi = (id, data) =>
  instance({ url: `/page/${id}`, method: 'put', data, showTip: true });
export const getPageApi = params =>
  instance({ url: '/page', method: 'get', params });
export const delPageApi = id =>
  instance({ url: `/page/${id}`, method: 'delete', showTip: true });
export const updatePageAttrApi = (id, data) =>
  instance({
    url: `/updatePageType/${id}`,
    method: 'put',
    data,
    showTip: true,
  });

/* demo */
export const createDemoApi = data =>
  instance({ url: '/demo', method: 'post', data, showTip: true });
export const delDemoApi = id =>
  instance({ url: `/demo/${id}`, method: 'delete', showTip: true });
export const getDemoApi = params =>
  instance({ url: '/demo', method: 'get', params });
export const updateDemoApi = (id, data) =>
  instance({ url: `/demo/${id}`, method: 'put', data, showTip: true });

/* 用户 */
export const getUserApi = params =>
  instance({ url: '/user', method: 'get', params });
export const delUserApi = id =>
  instance({ url: `/user/${id}`, method: 'delete', showTip: true });
/* 角色 */
export const createAuthApi = data =>
  instance({ url: '/auth', method: 'post', data, showTip: true });
export const getAuthApi = params =>
  instance({ url: '/auth', method: 'get', params });
export const delAuthApi = id =>
  instance({ url: `/auth/${id}`, method: 'delete', showTip: true });
/* 前台展示 */
// index
export const getIndexApi = () => instance({ url: '/index', method: 'get' });
export const fetchPageByIdApi = id =>
  instance({ url: `/pageDetail/${id}`, method: 'get' });
export const getPageByTypeApi = params =>
  instance({ url: '/pageByType', method: 'get', params });
