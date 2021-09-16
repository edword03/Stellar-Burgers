import React from 'react';
import ReactDOM from 'react-dom'
import { Modal } from '../Modal';
import doneGif from '../../assets/images/order-accepted.gif';
import orderStyles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

export const OrderDetails = ({ isModal, onClick }) => {
  return ReactDOM.createPortal(
    <Modal onClose={onClick} paddingBottom='pb-30'>
      <h2 className="text text_type_digits-large mt-4 mb-8">034536</h2>
      <p className={`text text_type_main-medium mb-15 ${orderStyles.textCenter}`}>
        идентификатор заказа
      </p>
      <div className={orderStyles.acceptedBlock}>
        <img src={doneGif} alt="accepted" className={orderStyles.acceptedImg} />
      </div>
      <p className={`text text_type_main-default mt-15 mb-2 ${orderStyles.textCenter}`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderStyles.subtitle} ${orderStyles.textCenter} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </Modal>,
    document.getElementById('root-modal')
  );
};

OrderDetails.propTypes = {
  isModal: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}