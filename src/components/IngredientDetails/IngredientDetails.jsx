import React from 'react';
import PropTypes from 'prop-types';
import detailsStyles from './IngredientDetails.module.css';

export const IngredientDetails = ({
  data: { name, image_large, proteins, calories, carbohydrates, fat },
}) => {
  return (
    <>
      <div className={detailsStyles.imgContainer}>
        <img src={image_large} alt={name} />
      </div>
      <p className={`text text_type_main-medium mt-4 mb-8 ${detailsStyles.title}`}>{name}</p>
      <div className={detailsStyles.nurtions}>
        <p className={detailsStyles.nurtionText}>
          Калории,ккал{' '}
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {calories}
          </span>
        </p>
        <p className={detailsStyles.nurtionText}>
          Белки, г{' '}
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {proteins}
          </span>
        </p>
        <p className={detailsStyles.nurtionText}>
          Жиры, г{' '}
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {fat}
          </span>
        </p>
        <p className={detailsStyles.nurtionText}>
          Углеводы, г{' '}
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {carbohydrates}
          </span>
        </p>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  name: PropTypes.string,
  onClose: PropTypes.func,
  image_large: PropTypes.string,
  proteins: PropTypes.number,
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
};
