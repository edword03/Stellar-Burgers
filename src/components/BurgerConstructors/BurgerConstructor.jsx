import React, { useMemo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder, CLOSE_ORDER } from '../../services/actions/orderAction';
import { ADD_ITEM, ADD_BUN, REMOVE_ITEM, MOVE_ITEM } from '../../services/actions/constructorAction';
import { useDrop } from 'react-dnd';

import BurgerIngredientStyles from './BurgerConstructor.module.css';

import { BurgerConstructorItem } from './BurgerConstructorItem';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';
import { Stub } from './Stub';

export const BurgerConstructor = () => {
  const { ingredientsConstructor, bunItems } = useSelector(store => store.counstructor);
  const { orderFailed, isModal } = useSelector(store => store.order);
  const [error, setError] = useState(false)
  const bunItem = useSelector(store => store.counstructor.bunItems);
  const dispatch = useDispatch();
  const [{canDrop}, dropTarget] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({
        type: ADD_BUN,
        payload: item,
        isLocked: true,
      });
    },
    collect: monitor => ({
      canDrop: monitor.canDrop()
    })
  });

  const [{}, secondBunRef] = useDrop({
    accept: 'bun',
    drop(item) {
      dispatch({
        type: ADD_BUN,
        payload: item,
        isLocked: true,
      });
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const [{isHover}, ingrTarget] = useDrop({
    accept: 'IngredientItems',
    drop(item) {
      dispatch({
        type: ADD_ITEM,
        payload: item,
      });
    },
  });

  const borderColor = isHover ? '3px dashed #4C4CFF' : '';
  const moveItem = useCallback((dragIndex, hoverIdnex) => {
    const dragItem = ingredientsConstructor[dragIndex]
    const newItem = [...ingredientsConstructor]
    newItem.splice(dragIndex, 1)
    newItem.splice(hoverIdnex, 0, dragItem)

    dispatch({
      type: MOVE_ITEM,
      payload: newItem
    })
  }, [ingredientsConstructor, dispatch])

  const totalPrice = useMemo(
    () => ingredientsConstructor.reduce((acc, cur) => acc + cur.price, 0) + bunItems.price * 2,
    [ingredientsConstructor, bunItems],
  );

  const getIngredientId = (arr, id) => {
    return { ingredients: [...arr.map(item => item._id), id] };
  };

  const closeModal = () =>
    dispatch({
      type: CLOSE_ORDER,
    });

  const sendOrderData = () => {
    const orderList = getIngredientId(ingredientsConstructor, bunItems._id);
    if (ingredientsConstructor.length > 0 && bunItems.price > 0) {
      dispatch(sendOrder(orderList));
      setError(false)
    } else {
      setError(true)
    }

    setTimeout(() => {
      setError(false)
    }, 2000)
  };

  const removeItem = id => {
    dispatch({
      type: REMOVE_ITEM,
      id,
    });
  };

  const errorClass = error ? '1px solid red' : ''

  return (
    <>
      <section className={`mt-25 pr-4 pl-4`}>
        <div ref={ref => dropTarget(ref)}>
          {bunItems.name ? (
            <BurgerConstructorItem {...bunItem} typeItem={'top'} name={bunItems.name + '(верх)'} />
          ) : (
            <Stub type="top" errorClass={errorClass} />
          )}
        </div>
        <div
          className={`${BurgerIngredientStyles.ingredientBlock} custom-scroll`}
          ref={ref => ingrTarget(ref)}>
          {ingredientsConstructor.length > 0 ? (
            ingredientsConstructor.map((item, i) => (
              <BurgerConstructorItem
                {...item}
                isLocked={false}
                key={item.itemId}
                move={moveItem}
                index={i}
                ref={ingrTarget}
                onRemove={removeItem}>
                <div className="mr-2">
                  <DragIcon />
                </div>
              </BurgerConstructorItem>
            ))
          ) : (
            <Stub errorClass={errorClass} />
          )}
        </div>
        <div ref={ref => secondBunRef(ref)}>
          {bunItems.name ? (
            <BurgerConstructorItem {...bunItem} typeItem={'bottom'} name={bunItems.name + '(низ)'} />
          ) : (
            <Stub type="bottom" errorClass={errorClass} />
          )}
        </div>

        <div className={`mt-10 ${BurgerIngredientStyles.price}`}>
          <p className={`mr-10`}>
            <span className="mr-2 text text_type_digits-medium">{totalPrice}</span>
            <CurrencyIcon />
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
