import React from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../components/IngredientDetails';

export const Ingredient = () => {
  const { ingredientItems } = useSelector(store => store.ingredients);
  const { id } = useParams<{ id: string }>();
  const props = ingredientItems.find(item => item._id === id);

  return (
    <>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '520px',
        }}>
        <IngredientDetails {...props} />
      </div>
    </>
  );
};
