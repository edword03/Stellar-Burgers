import React from 'react';
import { useSelector } from '../../services/hooks';
import styles from './Feed.module.css';

interface IPropsType {
  id: string
  isLast?: boolean
  lastItems?: number
}

export const IngredientItem: React.FC<IPropsType> = ({ id, isLast, lastItems }) => {
  const { ingredientItems } = useSelector(store => store.ingredients);
  const img = ingredientItems.find(item => item._id === id)?.image_mobile
  
  return (
    <span className={`${styles.orderItem} `}>
      <img src={img} alt="" />
      {isLast && <span>{lastItems}</span>}
    </span>
  );
};
