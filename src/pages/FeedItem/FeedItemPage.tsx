import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { OrderInfo } from '../../components/OrderInfo';
import { WS_CLOSE, WS_OPEN } from '../../services/actions/wsAction';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './FeedItem.module.css';

export const FeedItemPage: React.FC<{ url: string }> = ({ url }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.feed);
  const { success } = useSelector(store => store.feed);
  const props = orders.find(item => item._id === id);
  console.log('orders: ', props);

  useEffect(() => {
    dispatch({ type: WS_OPEN, payload: url });
    return () => {
      dispatch({ type: WS_CLOSE });
    };
  }, [dispatch, url]);

  return (
    <div className={styles.container}>
      {success ? (
        <>
          <h3 className="text text_type_digits-default mt-30" style={{ textAlign: 'center' }}>
            {'#' + props?.number}
          </h3>
          <OrderInfo
            name={props?.name}
            ingredients={props?.ingredients}
            createdAt={props?.createdAt}
            status={props?.status}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
