import React from 'react';
import BurgerIngredientStyles from './burger-ingredient.module.css';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { listBurgers } from '../../utils/data';

export const BurgerIngredient = () => {
  const price = listBurgers.reduce((acc, cur) => acc + cur.price, 0);
  console.log(price);

  return (
    <section className={`mt-25 pr-4 pl-4`}>
      <div className={`${BurgerIngredientStyles.ingredientBlock} custom-scroll`}>
        {listBurgers ? (
          
          listBurgers.map((item, i) => (
            <article className={BurgerIngredientStyles.burgerItem} key={`ingredient-item_${i}`}>
              <div className="mr-2">
                <DragIcon />
              </div>
              <ConstructorElement
                type={i === 0 ? 'top' : i === listBurgers.length - 1 ? 'bottom' : null}
                isLocked={Math.random() < 0.5}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={`constructor-elem_${i}`}
              />
            </article>
          ))
        ) : 'Список пуст'}
      </div>
      <div className={`mt-10 ${BurgerIngredientStyles.price}`}>
        <p className={`mr-10`}>
          <span className="mr-2 text text_type_digits-medium">{price}</span>
          <CurrencyIcon />
        </p>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
