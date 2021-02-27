import React from 'react';
import './CheckBox.scss';

export default (props: any) => {
  const { children, id, checked, onChange, className, ...reset } = props;
  const classNames = 'lv-checkBox-container ' + className;
  return (
    <span className={classNames} {...reset}>
      <input onChange={onChange} checked={checked} id={id} type="checkbox" />
      <label htmlFor={id}>{children}</label>
    </span>
  );
};
