import React, { useRef, useState } from 'react';
import { connect } from 'dva';
import SafeSet from './safeSet';
import { fileUpload, updateUserInfo } from '@/api';
import { Tabs, Avatar, Button, notification } from 'antd';
import { getBase64 } from '@/ultis';
import './personal.scss';
const { TabPane } = Tabs;
const Personal = props => {
  const inputRef = useRef<HTMLInputElement>();
  const { username, avatar: userAvatar, dispatch } = props;
  const [avatar, setAvatar] = useState({ src: '', file: '' });
  const onInputChange = ({ target }) => {
    const avatar = target.files[0];
    if (avatar) {
      getBase64(avatar).then(data => {
        setAvatar({
          file: avatar,
          src: data,
        });
      });
    }
  };
  const save = async () => {
    if (!avatar.file) {
      return false;
    }
    const form = new FormData();
    form.append('file', avatar.file);
    try {
      const { data } = await fileUpload(form);
      const result = await updateUserInfo({ avatar: data });
      if (result) {
        dispatch({
          type: 'user/fetchUserInfo',
        });
      }
    } catch (error) {
      notification.error({ message: '保存失败', duration: 2 });
    }
  };
  return (
    <div className="lv-admin-personal-container">
      <Tabs tabPosition="left">
        <TabPane tab={<h4>基本设置</h4>} key="1">
          <h2>基本设置</h2>
          <div className="lv-admin-personal-basic-avatar">
            <div>头像:</div>
            <Avatar size={128} src={avatar.src || userAvatar} />
            <div className="lv-admin-personal-basic-avatar-btn">
              <input onChange={onInputChange} ref={inputRef} type="file" />
              <Button onClick={() => inputRef.current.click()}>更换头像</Button>
            </div>
          </div>
          <Button type="primary" onClick={save}>
            保存
          </Button>
        </TabPane>
        <TabPane tab={<h4>安全设置</h4>} key="2">
          <h2>安全设置</h2>
          <SafeSet username={username} />
        </TabPane>
      </Tabs>
    </div>
  );
};
const mapStateToProps = ({ user }) => {
  return user;
};
export default connect(mapStateToProps, null)(Personal);
