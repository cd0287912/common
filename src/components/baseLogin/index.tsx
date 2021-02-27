import React, { useState } from 'react';
import { history } from 'umi';
import { message } from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import md5 from 'md5';
import { setToken } from '@/ultis/store';
import { getQueryVariable } from '@/ultis';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import BaseCheckBox from '@/components/BaseCheckBox';
import { userApi } from '@/api/index.js';
export default () => {
  const [actionType, setActionType] = useState('login');
  const [checkedBox, setCheckedBox] = useState(true);
  const [isPwdVisible, setPwdVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const params = {
      username,
      password: md5(password),
    };
    if (actionType === 'login') {
      const result = await userApi.login(params);
      if (result) {
        setToken(result.data);
        message.success('登录成功');
        const back = getQueryVariable('back');
        if (back) {
          window.location.href = decodeURIComponent(back);
        } else {
          history.replace('/admin');
        }
      }
    } else {
      const result = await userApi.regist(params);
      if (result) {
        message.success('注册成功');
        setActionType('login');
      }
    }
  };
  return (
    <div className={styles['login-form']}>
      <div className={styles['login-title']}>
        <span
          onClick={() => setActionType('login')}
          className={classnames({ active: actionType === 'login' })}
        >
          用户登录
        </span>
        <span
          onClick={() => setActionType('regist')}
          className={classnames({ active: actionType === 'regist' })}
        >
          用户注册
        </span>
      </div>
      <div className={styles['form-item']}>
        <input
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="用户名"
        />
      </div>
      <div className={styles['form-item']}>
        <input
          onChange={e => setPassword(e.target.value)}
          type={isPwdVisible ? 'text' : 'password'}
          placeholder="密码"
        />
        <div
          onClick={() => setPwdVisible(!isPwdVisible)}
          className={styles['icon-container']}
        >
          {isPwdVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </div>
      </div>
      {actionType === 'login' ? (
        <div className={styles['form-item']}>
          <BaseCheckBox
            checked={checkedBox}
            onChange={() => setCheckedBox(!checkedBox)}
            id="formCheckBox"
          >
            保持登录状态
          </BaseCheckBox>
        </div>
      ) : (
        ''
      )}
      <div onClick={handleSubmit} className={styles['form-item']}>
        <button
          disabled={!username || !password}
          className={classnames({ active: username && password })}
        >
          {actionType === 'login' ? '登 录' : '注 册'}
        </button>
      </div>
    </div>
  );
};
