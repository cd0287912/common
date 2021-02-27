import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import md5 from 'md5';
import classnames from 'classnames';
import CheckBox from '@/components/checkBox/checkBox';
import { loginApi, registApi } from '@/api';
import { setToken, getToken } from '@/ultis';
import './login.scss';
const joinList = ['登录', '注册'];
export default () => {
  const [checkedBox, setCheckedBox] = useState(true);
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [active, setActive] = useState('登录');
  const canSubmit = loginInfo.username && loginInfo.password;
  const handleSubmit = async () => {
    const data = {
      username: loginInfo.username,
      password: md5(loginInfo.password),
    };
    let result = null;
    if (active === '登录') {
      result = await loginApi(data);
      if (result) {
        setToken(result.data);
        history.replace('/admin/page/create');
      }
    } else {
      result = await registApi(data);
      if (result) {
        setActive('登录');
      }
    }
  };
  useEffect(() => {
    const token = getToken();
    if (token) {
      history.replace('/admin/');
    }
  }, []);
  return (
    <div className="lv-login-container">
      <div className="lv-login-bg">
        <h3>Discover the world’s top Designers &amp; Creatives.</h3>
      </div>
      <div className="lv-login-content">
        <div className="lv-login-form">
          <div className="lv-login-form-title lv-fs-18">
            {joinList.map(item => (
              <span
                key={item}
                onClick={() => setActive(item)}
                className={classnames({ active: active === item })}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="lv-login-form-item">
            <input
              onChange={e =>
                setLoginInfo({ ...loginInfo, username: e.target.value })
              }
              type="text"
              placeholder="用户名"
            />
          </div>
          <div className="lv-login-form-item">
            <input
              onChange={e =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              type="password"
              placeholder="密码"
            />
          </div>
          {active === '登录' ? (
            <CheckBox
              className="lv-checkBox-wrap"
              checked={checkedBox}
              id="formCheckBox"
              onChange={() => setCheckedBox(!checkedBox)}
            >
              保持登录状态
            </CheckBox>
          ) : (
            ''
          )}
          <div className="lv-login-form-item">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={classnames({ canSubmit })}
            >
              {active === '登录' ? '登 录' : '注 册'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
