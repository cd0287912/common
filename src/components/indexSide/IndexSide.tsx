import React from 'react';
import { history } from 'umi';
import { FireFilled } from '@ant-design/icons';
import './IndexSide.scss';

export default props => {
  const { hotList, seriesType, handleSelectPage } = props;
  return (
    <div className="lv-indexSide-container">
      <div className="lv-recent-pages lv-card-default">
        <SideHotBox handleSelectPage={handleSelectPage} hotList={hotList} />
      </div>
      {seriesType.length ? (
        <div className="lv-recent-pages lv-card-default">
          <SideSeriesBox seriesType={seriesType} />
        </div>
      ) : null}
    </div>
  );
};

function SideHotBox(props) {
  const { hotList, handleSelectPage } = props;
  const selectCurrentPage = _id => {
    return () => {
      handleSelectPage({ _id });
    };
  };
  return (
    <div>
      <div className="lv-side-title lv-fs-16">热门动态</div>
      <ul className="lv-side-content">
        {hotList.map((item, index) => (
          <li key={item._id}>
            <a className="lv-ellipsis" onClick={selectCurrentPage(item._id)}>
              {item.title}
            </a>
            {index === 0 ? (
              <>
                <FireFilled style={{ color: '#d81e06' }} />
                <FireFilled style={{ color: '#d81e06' }} />
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SideSeriesBox(props) {
  const { seriesType } = props;
  const handle2TypePages = id => {
    return () => {
      history.push(`/series/${id}`);
    };
  };
  return (
    <div>
      <div className="lv-side-title lv-fs-16">系列合集</div>
      <ul className="lv-side-content">
        {seriesType.map(item => (
          <li key={item._id}>
            <a onClick={handle2TypePages(item._id)} className="lv-ellipsis">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
