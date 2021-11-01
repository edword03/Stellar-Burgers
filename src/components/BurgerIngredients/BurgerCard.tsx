import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_MODAL } from '../../services/actions/modalAction';
import {getConstructor} from '../../services/selectors'
import styles from './BurgerIngredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

interface ICardProps {
  image: string
  price: number
  name: string
  _id: string
  type: string
}

type TCount = {
  [key: string]: number
}

export const BurgerCard: React.FC<ICardProps> = props => {
  const { image, price, name, type, _id } = props;
  const { ingredientsConstructor } = useSelector(getConstructor);
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: type === 'bun' ? 'bun' : 'IngredientItems',
    item: { ...props, itemId: uuidv4() },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    }),
    
  });

  const getCounts = (mainArray: Array<any>): TCount => {
    const counts: TCount = {};
    for (const num of mainArray) {
      counts[num._id] = counts[num._id] ? counts[num._id] + 1 : 1;
    }
    return counts;
  };

  const countItem = getCounts(ingredientsConstructor)

  const openModal = (): void => {
    dispatch({
      type: OPEN_MODAL,
      payload: { ...props },
    });
  };

  const opacity = isDrag ? 0 : 1;

  return (
    <>
      <article className={styles.cart} onClick={openModal} ref={dragRef} style={{ opacity }}>
        {countItem[_id] && <Counter count={countItem[_id]} />}
        <img className={`ml-4 mr-4`} src={image} alt="" />
        <p className={`${styles.price} mt-1 mb-1`}>
          <span className={`mr-1`}>{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p style={{ textAlign: 'center' }} className="text text_type_main-default">
          {name}
        </p>
      </article>
    </>
  );
};