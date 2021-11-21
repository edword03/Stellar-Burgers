import React from 'react';
import styles from './Feed.module.css'

interface IPropsType {
  title: string;
  count: string;
}

export const DoneBlock: React.FC<IPropsType> = ({ title, count }) => {
  return (
    <article className="mt-15">
      <span className="text text_type_main-medium" style={{ display: 'block' }}>
        {title}
      </span>
      <strong className={`text text_type_digits-large ${styles.count}`}>{count}</strong>
    </article>
  );
};
