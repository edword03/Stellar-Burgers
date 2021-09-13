import React from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { listBurgers } from '../../utils/data';
import { BurgerConstructorItem } from './BurgerConstructorItem';

export const BurgerConstructor = () => {
  const price = listBurgers.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <section className={`mt-25 pr-4 pl-4`}>
      <BurgerConstructorItem
        name={listBurgers[0].name + '(верх)'}
        image={listBurgers[0].image}
        price={listBurgers[0].price}
        type={'top'}
      />
      <div className={`${BurgerIngredientStyles.ingredientBlock} custom-scroll`}>
        {listBurgers ? (
          listBurgers.map((item, i) =>
            i !== 0 && i !== listBurgers.length - 1 ? (
              <BurgerConstructorItem {...item} isLocked={false} key={item._id}>
                <div className="mr-2">
                  <DragIcon />
                </div>
              </BurgerConstructorItem>
            ) : null,
          )
        ) : (
          <p>Не найдено</p>
        )}
      </div>
      <BurgerConstructorItem
        name={listBurgers[0].name + '(низ)'}
        image={listBurgers[0].image}
        price={listBurgers[0].price}
        type={'bottom'}
      />

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
