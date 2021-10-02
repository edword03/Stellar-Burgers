import { createSelector } from 'reselect';

export const selectAllIngredients = state => state.ingredients.ingredientItems
export const getConstructor = state => state.counstructor

export const getBuns = createSelector(
  selectAllIngredients,
  buns => buns.filter(item => item.type === 'bun')
)

export const getSauce = createSelector(
  selectAllIngredients,
  sauce => sauce.filter(item => item.type === 'sauce')
)

export const getMain = createSelector(
  selectAllIngredients,
  main => main.filter(item => item.type === 'main')
)