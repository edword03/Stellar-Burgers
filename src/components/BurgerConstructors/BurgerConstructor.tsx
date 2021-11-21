import React, { useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { sendOrder, CLOSE_ORDER, OPEN_MODAL_ORDER } from '../../services/actions/orderAction';
import {
  ADD_ITEM,
  ADD_BUN,
  REMOVE_ITEM,
  MOVE_ITEM,
  CLEAR_CONSTRUCTOR,
} from '../../services/actions/constructorAction';
import { getConstructor } from '../../services/selectors';
import { useDrop } from 'react-dnd';

import BurgerIngredientStyles from './BurgerConstructor.module.css';

import { BurgerConstructorItem } from './BurgerConstructorItem';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';
import { Stub } from './Stub';
import { IGetIngredients } from '../../types';

export const BurgerConstructor = () => {
  const { ingredientsConstructor, bunItems } = useSelector(getConstructor);
  const { orderFailed, isModal } = useSelector(store => store.order);
  const { isAuth } = useSelector(store => store.user);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [, dropTarget] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({
        type: ADD_BUN,
        payload: item,
        isLocked: true,
      });
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const [, secondBunRef] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({
        type: ADD_BUN,
        payload: item,
        isLocked: true,
      });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const [, ingrTarget] = useDrop({
    accept: 'IngredientItems',
    drop(item) {
      dispatch({
        type: ADD_ITEM,
        payload: item,
      });
    },
  });

 
  const moveItem = useCallback(
    (dragIndex: number, hoverIdnex: number) => {
      const dragItem = ingredientsConstructor[dragIndex];
      const newItem = [...ingredientsConstructor];
      newItem.splice(dragIndex, 1);
      newItem.splice(hoverIdnex, 0, dragItem);

      dispatch({
        type: MOVE_ITEM,
        payload: newItem,
      });
    },
    [ingredientsConstructor, dispatch],
  );

  const totalPrice = useMemo(
    () =>
      ingredientsConstructor.reduce((acc: number, cur: { price: number }) => acc + cur.price, 0) +
      bunItems.price * 2,
    [ingredientsConstructor, bunItems],
  );

  const getIngredientId = (arr: Array<IGetIngredients>, id: string) => {
    return { ingredients: [...arr.map(item => item._id), id] };
  };

  const closeModal = () =>
    dispatch({
      type: CLOSE_ORDER,
    });

  const sendOrderData = () => {
    const orderList = getIngredientId(ingredientsConstructor, bunItems._id);

    if (isAuth) {
      if (ingredientsConstructor.length > 0 && bunItems.price > 0) {
        dispatch(sendOrder(orderList));
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        });
        dispatch({
          type: OPEN_MODAL_ORDER,
        });
        setError(false);
      } else {
        setError(true);
      }
    } else {
      history.replace('/login');
    }

    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const removeItem = (id: string) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: id,
    });
  };

  const errorClass = error ? '1px solid red' : '';

  return (
    <>
      <section className={`mt-25 pr-4 pl-4`}>
        <div ref={ref => dropTarget(ref)}>
          {bunItems.name ? (
            <BurgerConstructorItem
              typeItem="top"
              name={bunItems.name + '(верх)'}
              index={bunItems.index}
              image={bunItems.image}
              price={bunItems.price}
            />
          ) : (
            <Stub type="top" errorClass={errorClass} />
          )}
        </div>
        <div
          className={`${BurgerIngredientStyles.ingredientBlock} custom-scroll`}
          ref={ref => ingrTarget(ref)}>
          {ingredientsConstructor.length > 0 ? (
            ingredientsConstructor.map((item, i: number) => (
              <BurgerConstructorItem
                {...item}
                isLocked={false}
                key={item.itemId}
                move={moveItem}
                index={i}
                // ref={ingrTarget}
                onRemove={removeItem}>
                <div className="mr-2">
                  <DragIcon type="primary" />
                </div>
              </BurgerConstructorItem>
            ))
          ) : (
            <Stub errorClass={errorClass} />
          )}
        </div>
        <div ref={ref => secondBunRef(ref)}>
          {bunItems.name ? (
            <BurgerConstructorItem
              typeItem="bottom"
              name={bunItems.name + '(низ)'}
              index={bunItems.index}
              image={bunItems.image}
              price={bunItems.price}
            />
          ) : (
            <Stub type="bottom" errorClass={errorClass} />
          )}
        </div>

        <div className={`mt-10 ${BurgerIngredientStyles.price}`}>
          <p className={`mr-10`}>
            <span className="mr-2 text text_type_digits-medium">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="large" onClick={sendOrderData}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModal && !orderFailed && (
        <Modal onClose={closeModal} paddingBottom="pb-30">
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
