import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks';
import { Feed } from '../../components/Feed';
import { DoneBlock } from './DoneBlock';
import styles from './Feed.module.css';
import { WS_CLOSE, WS_OPEN } from '../../services/actions/wsAction';
import { Loader } from '../../components/Loader';

export const FeedPage = () => {
  const { orders, total, totalToday, success } = useSelector(store => store.feed);
  const dispatch = useDispatch();
  const location = useLocation();

  const done = useMemo(() => orders.filter(item => item.status === 'done').slice(0, 25), [orders]);
  const pending = useMemo(() => orders.filter(item => item.status === 'pending'), [orders]);
  console.log('pending: ', pending);

  useEffect(() => {
    dispatch({ type: WS_OPEN, payload: 'wss://norma.nomoreparties.space/orders/all' });
    return () => {
      dispatch({ type: WS_CLOSE });
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={styles.gridContainer}>
        <section className={`${styles.listOrders} custom-scroll pr-2`}>
          {orders &&
            orders.map(order => (
              <Link
                to={{
                  pathname: `/feed/${order._id}`,
                  state: { ingredientModal: location },
                }}
                key={order._id}>
                <Feed
                  order={order.number}
                  title={order.name}
                  date={order.createdAt}
                  ingredients={order.ingredients}
                  status={order.status}
                />
              </Link>
            ))}
          {!success ? <Loader /> : null}
        </section>
        <section className={styles.blockStatus}>
          <div className={styles.orders}>
            <div>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <div className={styles.done}>
                {done &&
                  done.map(item => (
                    <span
                      key={item._id}
                      className={`text text_type_digits-default mb-2 ${styles.doneItem}`}>
                      {item.number}
                    </span>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <div className={styles.inWork}>
                {pending &&
                  pending.map(item => (
                    <span key={item._id} className={`text text_type_digits-default mb-2`}>
                      {item.number}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <DoneBlock title="Выполнено за все время:" count={`${total}`} />
          <DoneBlock title="Выполнено за сегодня:" count={`${totalToday}`} />
        </section>
      </div>
    </div>
  );
};
