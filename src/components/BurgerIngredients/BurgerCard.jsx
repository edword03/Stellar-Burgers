import React from 'react';
import styles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetails } from '../IngredientDetails';

export const BurgerCard = ({ image, price, name, ...props }) => {
  const [isModal, setIsModal] = React.useState(false);

  const toggleModal = () => setIsModal(prev => !prev);

  return (
    <>
      <article className={styles.cart} onClick={toggleModal}>
        <Counter count={1} />
        <img className={`ml-4 mr-4`} src={image} alt="" />
        <p className={`${styles.price} mt-1 mb-1`}>
          <span className={`mr-1`}>{price}</span>
          <CurrencyIcon />
        </p>
        <p style={{ textAlign: 'center' }} className="text text_type_main-default">
          {name}
        </p>
      </article>
      {isModal && (
        <IngredientDetails
          isVisible={isModal}
          price={price}
          name={name}
          onClose={toggleModal}
          {...props}
        />
      )}
    </>
  );
};

BurgerCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
