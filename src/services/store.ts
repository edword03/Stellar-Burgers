import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socket';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(socketMiddleware());
  },
});
