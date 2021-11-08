import React from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';

interface IStubProps {
  type?: string
  errorClass: string
  isHover?: boolean
}

export const Stub = React.forwardRef<HTMLDivElement, IStubProps>(({ type, errorClass, isHover }, ref) => {
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
