import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import './index.scss';
import Author from '@/components/author/Author';
import IndexSide from '@/components/indexSide/IndexSide';
import Dividing from '@/components/dividing/Dividing';
import PagePreview from '@/components/pagePreview/pagePreview';
import PageModal from '@/components/pageModal/pageModa';
import { getIndexApi } from '@/api';
// import { formatDate } from '@/ultis';

import Prism from 'prismjs';
Prism.hooks.add('before-highlight', function(env) {
  env.element.innerHTML = env.element.innerHTML.replace(/<br\s*\/?>/g, '\n');
  env.code = env.element.textContent.replace(/^(?:\r?\n|\r)/, '');
});

/* 
  个人简介-简历
  文章规范
  年度计划

  // 分类文章比例报表
*/
export default () => {
  Prism.highlightAll();
  const [data, setData] = useState({
    pageList: [],
    hotList: [],
    topList: [],
    pageType: [],
    seriesType: [],
    currentPage: null,
  });
  useEffect(() => {
    getIndexApi().then(res => {
      setData({
        ...data,
        pageList: res.data.pageList,
        hotList: res.data.hotList,
        topList: res.data.topList,
        pageType: res.data.pageType,
        seriesType: res.data.seriesType,
      });
    });
  }, []);
  const handleSelectPage = item => {
    document.body.classList.add('lv-over-hide');
    setData({
      ...data,
      currentPage: item._id,
    });
  };
  const closePagePreview = () => {
    document.body.classList.remove('lv-over-hide');
    setData({
      ...data,
      currentPage: null,
    });
  };
  /* 选择分类 */
  const handleSelecType = ({ _id }) => {
    history.push(`/series/${_id}`);
  };
  return (
    <>
      <div className="lv-index-container lv-pl-10 lv-pr-10">
        <div className="lv-index-fix">
          <Author />
        </div>
        <div className="lv-index-content lv-card-default">
          {data.topList.length === 3 ? (
            <PageTop click={handleSelectPage} topList={data.topList} />
          ) : null}
          <Dividing title="最新文章" />
          {data.pageList.map(item => (
            <PageModal
              click={() => handleSelectPage(item)}
              key={item._id}
              page={item}
            />
          ))}
          {/* 推荐目录 */}
          {data.pageType.length ? (
            <>
              <Dividing title="推荐目录" />
              <div className="lv-pageType-container">
                {data.pageType.map(item => (
                  <div
                    onClick={() => handleSelecType(item)}
                    key={item._id}
                    className="lv-pageType-item"
                  >
                    <div className="lv-pageType-content">
                      <div
                        className="lv-pageType-content-bg"
                        style={{ backgroundImage: `url(${item.mask})` }}
                      ></div>
                      <div className="lv-pageType-content-title lv-fs-12">
                        {item.title}
                        {`「${item.desc}」`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
        <div className="lv-index-aside">
          <IndexSide
            handleSelectPage={handleSelectPage}
            hotList={data.hotList}
            seriesType={data.seriesType}
          />
        </div>
      </div>
      {/* ===========preview============== */}
      {data.currentPage ? (
        <PagePreview
          closePagePreview={closePagePreview}
          currentPage={data.currentPage}
        />
      ) : null}
    </>
  );
};
/* 置顶文章 */
const PageTop = props => {
  const { topList, click } = props;
  return (
    <div className="lv-index-content-top clearfix">
      <div
        onClick={() => click({ _id: topList[0]._id })}
        className="lv-index-content-top-item left"
      >
        <div
          style={{ backgroundImage: `url(${topList[0].mask[0]})` }}
          className="lv-index-content-cover"
        ></div>
        <div className="lv-index-content-title lv-fs-14">
          {topList[0].title}
        </div>
        <div className="lv-index-content-mask"></div>
      </div>
      <div
        onClick={() => click({ _id: topList[1]._id })}
        className="lv-index-content-top-item right top"
      >
        <div
          style={{ backgroundImage: `url(${topList[1].mask[0]})` }}
          className="lv-index-content-cover"
        ></div>
        <div className="lv-index-content-title lv-fs-14">
          {topList[1].title}
        </div>
        <div className="lv-index-content-mask"></div>
      </div>
      <div
        onClick={() => click({ _id: topList[2]._id })}
        className="lv-index-content-top-item right bottom"
      >
        <div
          style={{ backgroundImage: `url(${topList[2].mask[0]})` }}
          className="lv-index-content-cover"
        ></div>
        <div className="lv-index-content-title lv-fs-14">
          {topList[2].title}
        </div>
        <div className="lv-index-content-mask"></div>
      </div>
    </div>
  );
};
/* 最新文章模板 */
// const PageModal = props => {
//   const { click } = props;
//   const { title, desc, time, mask, type, auth } = props.page;
//   return (
//     <div className="lv-pageItem-container">
//       <div onClick={click} className="lv-pageItem-title lv-fs-20">
//         {title}
//       </div>
//       <div className="lv-pageItem-content">{desc}</div>
//       <div className="lv-pageItem-mask">
//         {mask &&
//           mask.length > 0 &&
//           mask.map(src => (
//             <div key={src} style={{ backgroundImage: `url(${src})` }}></div>
//           ))}
//       </div>
//       <div className="lv-pageItem-detail lv-fs-12">
//         <span>{auth && auth.username}</span>
//         {type && type.map(item => <span key={item._id}>{item.title}</span>)}
//         <span>{formatDate(time, 'yyyy-MM-dd')}</span>
//       </div>
//     </div>
//   );
// };
