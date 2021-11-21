import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { IIngredientsActions } from './ingredientsTypes';
import { TOrderType } from './orderType';
import { IUserActions } from './userRegisterTypes';
import { TWsActions } from '../actions/wsAction';

export type TAppActions = IIngredientsActions | TOrderType | IUserActions | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<T = void> = ActionCreator<ThunkAction<T, Action, RootState, TAppActions>>;
