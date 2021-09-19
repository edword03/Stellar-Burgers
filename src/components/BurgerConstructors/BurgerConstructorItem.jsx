import React from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const BurgerConstructorItem = ({ name = '', price = 0, image = '', isLocked = true, type, children }) => {
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

BurgerConstructorItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.node,
};
