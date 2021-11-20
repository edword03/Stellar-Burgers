import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import styles from './OrderInfo.module.css';

interface INumberField {
  [key: string]: number;
}

interface IPropsTypes {
  _id?: string;
  createdAt?: string;
  ingredients?: Array<string>;
  name?: string;
  status?: 'done' | 'pending' | 'created';
}

export const OrderInfo: React.FC<IPropsTypes> = props => {
  const { currentFeed } = useSelector(store => store.feedModal);
  const { ingredientItems } = useSelector(store => store.ingredients);
  const { ingredients, name, status, createdAt } = currentFeed;

  const data = ingredientItems.filter(
    item =>
      ingredients.includes(item._id) || (props.ingredients && props.ingredients.includes(item._id)),
  );

  const total = data.reduce((acc, cur) => acc + (cur.type === 'bun' ? cur.price * 2 : cur.price), 0);
  const date = createdAt && new Date(createdAt).toLocaleDateString('ru-RU', {
    minute: '2-digit',
    hour: '2-digit',
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  });

  const propDate = props && props.createdAt && new Date(props.createdAt.toString()).toLocaleDateString('ru-RU', {
    minute: '2-digit',
    hour: '2-digit',
    day: 'numeric',
    weekday: 'long',
    month: 'long',
  });

  const getCounts = (mainArray: Array<string>) => {
    const counts: INumberField = {};
    for (const num of mainArray) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
  };

  const count = getCounts(ingredients);
  const propCount = props && props.ingredients && getCounts(props.ingredients);

  return (
    <>
      <h2 className="text text_type_main-medium mb-3 mt-10">{name || props.name}</h2>
      <span
        className={`text text_type_main-default ${
          status || props.status === 'done' ? styles.done : ''
        }`}>
        {status || props.status === 'done' ? 'Выполнен' : 'Готовится'}
      </span>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <section className={`${styles.ingredients} mt-6 custom-scroll pr-6`}>
        {data &&
          ingredients &&
          data?.map(item => (
            <div key={v4()} className={`${styles.ingredientItem} mt-4`}>
              <div className={styles.ingredientItem}>
                <span className={`${styles.orderItem} `}>
                  <img src={item.image_mobile} alt="" />
                </span>
                <span className="text text_type_main-default ml-4">{item.name}</span>
              </div>
              <div className={`${styles.count}`}>
                <span className="mr-2 text text_type_digits-default mr-2">
                  {item.type === 'bun'
                    ? `2 x ${item.price}`
                    : `${count[item._id] || (propCount && propCount[item._id])} x ${item.price}`}
                </span>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
      </section>
      <div className={`${styles.bottom} mt-10`}>
        <span className="text text_type_main-default text_color_inactive">
          {date || propDate}
        </span>
        <div className={styles.bottom}>
          <span className="text text_type_digits-default mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
};
