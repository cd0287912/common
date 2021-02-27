import React from 'react';
import { formatDate } from '@/ultis';
// import 'braft-editor/dist/index.css';
// import 'braft-editor/dist/output.css';
// import 'prismjs/themes/prism.css';
// import 'braft-extensions/dist/code-highlighter.css';
export default props => {
  const { preview } = props;
  const imgMask = preview.mask;
  const findTarget = value => {
    const item = preview.typeList.find(item => item.value === value);
    if (item) {
      return item.label;
    }
    return '';
  };
  return (
    <div className="lv-admin-page-create-preview-simple">
      <div className="lv-admin-page-create-preview-title lv-fs-20">
        {preview.title}
      </div>
      <div className="lv-admin-page-create-preview-desc">{preview.desc}</div>
      {preview.mask ? (
        <div className="lv-admin-page-create-preview-mask">
          {imgMask.map(item => (
            <div
              key={item}
              style={{ backgroundImage: `url(${item})` }}
              className="lv-admin-page-create-preview-mask-item"
            ></div>
          ))}
        </div>
      ) : null}
      <div className="lv-admin-page-create-preview-footer">
        {preview.type.map(item => (
          <span key={item}>{findTarget(item)}</span>
        ))}
        <span>{formatDate(preview.time, 'yyyy-MM-dd')}</span>
      </div>
    </div>
  );
};
