import React from 'react';
import styles from './burgerIngredients.module.css';
import { BurgerCard } from './BurgerCard';
import PropTypes from 'prop-types';


export const IngredientBlock = ({ list = [], title }) => {
  return (
    <div className={`mt-10 mb-10`}>
      <h3 className={`mb-6 text text_type_main-medium`}>{title}</h3>
      <div className={`pl-4 pr-4 ${styles.col}`}>
        {list && list.map((list) => <BurgerCard {...list} key={list._id} />)}
      </div>
    </div>
  );
};

IngredientBlock.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
