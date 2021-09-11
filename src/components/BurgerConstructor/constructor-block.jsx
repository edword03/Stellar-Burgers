import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerCard } from './BurgerCard';
import PropTypes from 'prop-types';


export const ConstructorBlock = ({ list = [], title }) => {
  return (
    <div className={`mt-10 mb-10`}>
      <h3 className={`mb-6 text text_type_main-medium`}>{title}</h3>
      <div className={`pl-4 pr-4 ${styles.col}`}>
        {list && list.map((list, i) => <BurgerCard {...list} key={`burger-card_${i}`} />)}
      </div>
    </div>
  );
};

ConstructorBlock.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string
};
