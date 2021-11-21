import { combineReducers } from 'redux';
import { counstructorReducer } from './counstructorReducer';
import { ingredientsReducer } from './ingredientReducer';
import { detailsReducer } from './detailsReducer';
import { orderReducer } from './orderReducer';
import { userReducer } from './userReducer';
import { wsReducer } from './wsReducer';
import { feedModalReducer } from './feedModalReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  counstructor: counstructorReducer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
  feed: wsReducer,
  feedModal: feedModalReducer,
});
