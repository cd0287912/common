import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { getPageByTypeApi } from '@/api';
import './index.scss';
import { useParams, history } from 'umi';
import PageModal from '@/components/pageModal/pageModa';
import PagePreview from '@/components/pagePreview/pagePreview';
export default () => {
  const { id } = useParams<any>();
  const [info, setInfo] = useState({
    typeInfo: { title: '', desc: '', mask: '' },
    pageNo: 1,
    pageSize: 10,
    total: 0,
    data: [],
    currentPage: '',
  });
  useEffect(() => {
    const params = {
      id,
      pageNo: info.pageNo,
      pageSize: info.pageSize,
    };
    getPageByTypeApi(params).then(res => {
      if (res) {
        const { pageList, total, typeInfo } = res.data;
        setInfo({
          ...info,
          typeInfo,
          total,
          data: pageList,
        });
      }
    });
  }, [id, info.pageNo, info.pageSize]);
  const handleBack = () => {
    history.push('/');
  };
  const pageNoChange = pageNo => {
    setInfo({
      ...info,
      pageNo,
    });
  };
  const handleSelectPage = item => {
    document.body.classList.add('lv-over-hide');
    setInfo({
      ...info,
      currentPage: item._id,
    });
  };
  const closePagePreview = () => {
    document.body.classList.remove('lv-over-hide');
    setInfo({
      ...info,
      currentPage: null,
    });
  };
  return (
    <div className="lv-series-container lv-pl-10 lv-pr-10">
      {info.currentPage ? (
        <PagePreview
          closePagePreview={closePagePreview}
          currentPage={info.currentPage}
        />
      ) : null}

      <div className="lv-series-main">
        <span onClick={handleBack} className="lv-cursor">
          返回首页
        </span>
        <div className="lv-series-title lv-fs-30 lv-text-center">
          {info.typeInfo.title}
        </div>
        <div className="lv-series-subtitle lv-fs-12 lv-text-center">
          {info.typeInfo.desc}
        </div>
        <div className="lv-series-mask lv-text-center">
          <img src={info.typeInfo.mask} alt="" />
        </div>
        <div className="lv-series-content">
          {info.data.map(item => (
            <PageModal
              click={() => handleSelectPage(item)}
              key={item._id}
              page={item}
            ></PageModal>
          ))}
        </div>
        <div className="lv-series-pagination">
          <Pagination
            current={info.pageNo}
            onChange={pageNoChange}
            size="small"
            total={info.total}
          />
        </div>
      </div>
    </div>
  );
};
