import React from 'react';
import './pageModal.scss';
import { formatDate } from '@/ultis';

export default props => {
  const { click } = props;
  const { title, desc, time, mask, type, auth } = props.page;
  return (
    <div className="lv-pageItem-container">
      <div onClick={click} className="lv-pageItem-title lv-fs-16">
        {title}
      </div>
      <div className="lv-pageItem-content">{desc}</div>
      <div className="lv-pageItem-mask">
        {mask &&
          mask.length > 0 &&
          mask.map(src => (
            <div key={src} style={{ backgroundImage: `url(${src})` }}></div>
          ))}
      </div>
      <div className="lv-pageItem-detail lv-fs-12">
        <span>{auth && auth.username}</span>
        {type && type.map(item => <span key={item._id}>{item.title}</span>)}
        <span>{formatDate(time, 'yyyy-MM-dd')}</span>
      </div>
    </div>
  );
};
