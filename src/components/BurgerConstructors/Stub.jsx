import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientStyles from './BurgerConstructor.module.css';

export const Stub = React.forwardRef(({ type, errorClass, isHover }, ref) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }} ref={ref}>
      <div style={{ width: 24, height: 24 }}></div>
      <div
        className={`${BurgerIngredientStyles.constructorItem} ${
          type === 'top'
            ? BurgerIngredientStyles.stubTop
            : type === 'bottom'
            ? BurgerIngredientStyles.stubBottom
            : ''
        }`}
        style={{ border: errorClass  }}>
        Выберите начинку
      </div>
    </div>
  );
});

Stub.propTypes = {
  type: PropTypes.string,
};
