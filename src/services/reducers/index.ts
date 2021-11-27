import { combineReducers } from 'redux';
import { counstructorReducer } from './Constructor/counstructorReducer';
import { ingredientsReducer } from './Ingredients/ingredientReducer';
import { detailsReducer } from './Details/detailsReducer';
import { orderReducer } from './Order/orderReducer';
import { userReducer } from './User/userReducer';
import { wsReducer } from './Websocket/wsReducer';
import { feedModalReducer } from './FeedModal/feedModalReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  counstructor: counstructorReducer,
  details: detailsReducer,
  order: orderReducer,
  user: userReducer,
  feed: wsReducer,
  feedModal: feedModalReducer,
});
