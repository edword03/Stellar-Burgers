import React, { useMemo } from 'react';

import { v4 } from 'uuid';
import { formatDistance, subDays, parseJSON } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './Feed.module.css';
import { IngredientItem } from './IngredientItem';
import { OPEN_FEED_MODAL } from '../../services/reducers/feedModalReducer';

interface IPropsType {
  order: number;
  date: string;
  title: string;
  ingredients: Array<string>;
  isAccount?: boolean;
  status?: 'done' | 'pending' | 'created';
}

export const Feed: React.FC<IPropsType> = ({
  order,
  date,
  title,
  ingredients,
  isAccount,
  status,
}) => {
  const date2 = (Date.now() - Date.parse(date)) / 1000;
  const dispatch = useDispatch();

  const newDate = formatDistance(subDays(Date.now(), date2 / 3600 / 24), new Date(), {
    locale: ru,
    addSuffix: true,
  });

  const { ingredientItems } = useSelector(store => store.ingredients);
  const sortItems = useMemo(
    () => ingredientItems.filter(item => ingredients.includes(item._id)),
    [ingredientItems, ingredients],
  );
  const count = useMemo(
    () => sortItems.reduce((acc, cur) => acc + (cur.type === 'bun' ? cur.price * 2 : cur.price), 0),
    [sortItems],
  );
  const sortIngredients = ingredients.slice(0, 6);

  const openModal = () => {
    dispatch({
      type: OPEN_FEED_MODAL,
      payload: { number: order, createdAt: date, ingredients, status, name: title },
    });
  };

  return (
    <section className={`${styles.feedCard} p-6 mb-4`} onClick={openModal}>
      <div className={`${styles.orderInfo} mb-6`}>
        <span className="text text_type_digits-default">{`#${order}`}</span>
        <span className="text text_type_main-default text_color_inactive">
          {new Date(date).toLocaleDateString('ru-RU', {
            minute: '2-digit',
            hour: '2-digit',
            day: 'numeric',
            weekday: 'long',
            month: 'long',
          })}
        </span>
      </div>
      <h3 className="text text_type_main-medium mb-6">
        {title}
        {isAccount && (
          <span
            className={`text text_type_main-default mt-2 ${styles.status} ${
              status === 'done' ? styles.done : ''
            }`}>
            {status === 'pending' ? 'Готовится' : 'Выполнен'}
          </span>
        )}
      </h3>

      <div className={styles.orderDetail}>
        <div className={styles.ingredients}>
          {sortIngredients && sortIngredients.map(item => <IngredientItem id={item} key={v4()} />)}
        </div>
        <div className={`${styles.price}`}>
          <span className="text text_type_main-medium mr-2">{count}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
};
