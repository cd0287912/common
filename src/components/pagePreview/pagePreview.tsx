import React, { useState, useEffect } from 'react';
import {
  UserOutlined,
  FolderOutlined,
  FireOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { fetchPageByIdApi } from '@/api';
import './pagePreview.scss';
import Loading from '@/components/loading/loading';
import { formatDate } from '@/ultis';

import 'braft-editor/dist/output.css';
import Prism from 'prismjs';
Prism.hooks.add('before-highlight', function(env) {
  env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, '\n');
  env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, '');
});
export default props => {
  const [pageInfo, setPageInfo] = useState({
    title: '',
    auth: { username: '' },
    type: [],
    time: '',
    content: '',
    hot: 0,
    loading: true,
  });
  const { currentPage, closePagePreview } = props;
  useEffect(() => {
    fetchPageByIdApi(currentPage).then(res => {
      setPageInfo({ ...res.data, loading: false });
      Prism.highlightAll();
    });
  }, [currentPage]);
  return (
    <div className="lv-page-preview-container lv-scrollBar">
      <div className="lv-page-content">
        {pageInfo.loading ? (
          <Loading />
        ) : (
          <>
            <div className="lv-page-title">{pageInfo.title}</div>
            <div className="lv-page-detail lv-fs-16">
              <div>
                <UserOutlined />
                <span>{pageInfo.auth.username}</span>
              </div>
              {pageInfo.type.length ? (
                <div>
                  <FolderOutlined />
                  {pageInfo.type.map(item => (
                    <span key={item._id}>{item.title}</span>
                  ))}
                </div>
              ) : null}
              <div>
                <FireOutlined />
                <span>{pageInfo.hot}</span>
              </div>
              <div>
                <ClockCircleOutlined />
                <span>{formatDate(pageInfo.time, 'yyyy-MM-dd hh:mm')}</span>
              </div>
            </div>
            <div
              className="braft-output-content"
              dangerouslySetInnerHTML={{ __html: pageInfo.content }}
            ></div>
          </>
        )}
        {/* <Loading /> */}
        {/* <div className="lv-page-title">{pageInfo.title}</div>
        <div className="lv-page-detail lv-fs-16">
          <div>
            <UserOutlined />
            <span>{pageInfo.auth.username}</span>
          </div>
          {pageInfo.type.length ? (
            <div>
              <FolderOutlined />
              {pageInfo.type.map(item => (
                <span key={item._id}>{item.title}</span>
              ))}
            </div>
          ) : null}
          <div>
            <FireOutlined />
            <span>{pageInfo.hot}</span>
          </div>
          <div>
            <ClockCircleOutlined />
            <span>{formatDate(pageInfo.time, 'yyyy-MM-dd hh:mm')}</span>
          </div>
        </div>
        <main dangerouslySetInnerHTML={{ __html: pageInfo.content }}></main> */}
        <div className="lv-page-close">
          <CloseCircleOutlined onClick={closePagePreview} />
        </div>
      </div>
    </div>
  );
};
