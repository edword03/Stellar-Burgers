import React from 'react';
import { useSelector } from '../../services/hooks';
import detailsStyles from './IngredientDetails.module.css';

interface IDetailsProps {
  name?: string,
  image_large?: string,
  calories?: number,
  fat?: number,
  carbohydrates?: number,
  proteins?: number
}

export const IngredientDetails: React.FC<IDetailsProps> = (props) => {
  const { image_large, name, calories, proteins, fat, carbohydrates } = useSelector(
    store => store.details.currentIngredient,
  );

  return (
    <>
      <div className={detailsStyles.imgContainer}>
        <img src={image_large || props.image_large} alt={name || props.name} />
      </div>
      <p className={`text text_type_main-medium mt-4 mb-8 ${detailsStyles.title}`} data-testid='titleIngredient'>{name || props.name}</p>
      <div className={detailsStyles.nurtions}>
        <p className={detailsStyles.nurtionText}>
          Калории,ккал
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {calories || props.calories}
          </span>
        </p>
        <p className={detailsStyles.nurtionText}>
          Белки, г
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {proteins || props.proteins}
          </span>
        </p>
        <p className={detailsStyles.nurtionText}>
          Жиры, г
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {fat || props.fat}
          </span>
        </p>
        <p className={detailsStyles.nurtionText}>
          Углеводы, г
          <span className={`${detailsStyles.nurtionValue} text text_type_digits-default`}>
            {carbohydrates || props.carbohydrates}
          </span>
        </p>
      </div>
    </>
  );
};