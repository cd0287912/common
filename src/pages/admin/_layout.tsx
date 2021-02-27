import React from 'react';
import { connect } from 'dva';
import { useHistory, history } from 'umi';
import { Avatar } from 'antd';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import defaultProps from './_menu';

const _layout = props => {
  const { username, avatar } = props;
  const initPath = useHistory().location.pathname;
  return (
    <div
      id="lv-admin-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        fixSiderbar
        navTheme="light"
        title="忘不了oh"
        logo="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
        rightContentRender={() => (
          <div>
            <span>{username}</span>
            <Avatar className="lv-ml-10" src={avatar} />
          </div>
        )}
        menuItemRender={(item, dom) => {
          return (
            <a
              onClick={() => {
                history.push(item.path);
              }}
            >
              {dom}
            </a>
          );
        }}
        location={{ pathname: initPath }}
        style={{
          height: '100vh',
        }}
      >
        <PageContainer ghost></PageContainer>
        <div>{props.children}</div>
      </ProLayout>
    </div>
  );
};
const mapStateToProps = ({ user }) => {
  return user;
};
export default connect(mapStateToProps, null)(_layout);
