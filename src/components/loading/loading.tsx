import React from 'react';
import { ReactComponent as Loading } from '@/assets/images/puff.svg';
import './loading.scss';
export default () => {
  return (
    <div className="lv-loading">
      <Loading color="red" />
      <div>加载中,请稍后</div>
    </div>
  );
};
