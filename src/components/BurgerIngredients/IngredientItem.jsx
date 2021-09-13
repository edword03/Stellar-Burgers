import React from 'react';
import BurgerIngredientStyles from './burger-ingredient.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const IngredientItem = ({ name, price, image, isLocked = true, type, children }) => {
  return (
    <article
      className={`${BurgerIngredientStyles.burgerItem} ${BurgerIngredientStyles.burgerBun} mt-1`}>
      {children ? children : <div style={{ width: 24, height: 24 }}></div>}
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        type={type}
        isLocked={isLocked}
      />
    </article>
  );
};

IngredientItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.element,
};
