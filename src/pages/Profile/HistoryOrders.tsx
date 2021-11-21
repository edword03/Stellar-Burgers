import React, { useEffect } from 'react';
import styles from './Profile.module.css';

import { Feed } from '../../components/Feed';
import { WS_CLOSE, WS_OPEN } from '../../services/actions/wsAction';
import { useDispatch, useSelector } from '../../services/hooks';
import { getCookie } from '../../utils/cookie';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../../components/Loader';

export const HistoryOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { success } = useSelector(store => store.feed);
  const { orders } = useSelector(store => store.feed);

  const token = getCookie('accessToken')?.split('Bearer ')[1];

  useEffect(() => {
    dispatch({ type: WS_OPEN, payload: `wss://norma.nomoreparties.space/orders?token=${token}` });
    return () => {
      dispatch({ type: WS_CLOSE });
    };
  }, [dispatch, token]);

  return (
    <section className={styles.ordersBlock}>
      {orders &&
        orders.map(order => (
          <Link
            to={{
              pathname: `/profile/orders/${order._id}`,
              state: { ingredientModal: location },
            }}
            key={order._id}>
            <Feed
              isAccount
              status={order.status}
              order={order.number}
              title={order.name}
              date={order.createdAt}
              ingredients={order.ingredients}
            />
          </Link>
        ))}
      {!success && (
        <div style={{ marginLeft: 210 }}>
          <Loader />
        </div>
      )}
    </section>
  );
};
