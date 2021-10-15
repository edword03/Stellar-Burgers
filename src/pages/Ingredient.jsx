import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../components/IngredientDetails';
import {AppHeader} from '../components/AppHeader'

export const Ingredient = () => {
  const { ingredientItems } = useSelector(store => store.ingredients);
  const { id } = useParams();
  const props = ingredientItems.find(item => item._id === id);

  return (
    <>
    <AppHeader />
      <div
        style={{
          margin: '0 auto',
          maxWidth: '520px'
        }}>
        <IngredientDetails {...props} />
      </div>
    </>
  );
};
