import React from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorItem } from './BurgerConstructorItem';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';

export const BurgerConstructor = ({ data = [] }) => {
  const [isModal, setIsModal] = React.useState(false);

  const toggleModal = () => setIsModal(prev => !prev);
  const sortIngredients = data.filter(item => item.type !== 'bun');
  const price = data.reduce((acc, cur) => acc + cur.price, 0);
  const sortBuns = data.filter(item => item.type === 'bun')[0];

  return (
    <>
      <section className={`mt-25 pr-4 pl-4`}>
        <BurgerConstructorItem {...sortBuns} type={'top'} />
        <div className={`${BurgerIngredientStyles.ingredientBlock} custom-scroll`}>
          {sortIngredients ? (
            sortIngredients.map((item, i) => (
              <BurgerConstructorItem {...item} isLocked={false} key={item._id}>
                <div className="mr-2">
                  <DragIcon />
                </div>
              </BurgerConstructorItem>
            ))
          ) : (
            <p>Не найдено</p>
          )}
        </div>
        <BurgerConstructorItem {...sortBuns} type={'bottom'} />

        <div className={`mt-10 ${BurgerIngredientStyles.price}`}>
          <p className={`mr-10`}>
            <span className="mr-2 text text_type_digits-medium">{price}</span>
            <CurrencyIcon />
          </p>
          <Button type="primary" size="large" onClick={toggleModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModal && (
        <Modal onClose={toggleModal} paddingBottom="pb-30">
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.array,
};
