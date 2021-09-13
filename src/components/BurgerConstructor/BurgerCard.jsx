import React from 'react';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerCard = ({ image, price, name, ...props }) => {
  return (
    <article className={styles.cart}>
      <Counter count={1} />
      <img className={`ml-4 mr-4`} src={image} alt="" />
      <p className={`${styles.price} mt-1 mb-1`}>
        <span className={`mr-1`}>{price}</span>
        <CurrencyIcon />
      </p>
      <p style={{ textAlign: 'center' }} className="text text_type_main-default">
        {name}
      </p>
    </article>
  );
};


BurgerCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
