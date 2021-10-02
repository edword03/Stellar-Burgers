import { combineReducers } from 'redux';
import { counstructorReducer } from './counstructorReducer';
import { ingredientsReducer } from './ingredientReducer';
import { detailsReducer } from './detailsReducer';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  counstructor: counstructorReducer,
  details: detailsReducer,
  order: orderReducer
});
