import { IRequestIngredientsBody } from '../../types';
import { AppDispatch, AppThunk } from '../types';
import {
  IGetIngredientsFailedType,
  IGetIngredientsRequestType,
  IGetIngredientsSuccessAction,
} from '../types/ingredientsTypes';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

const urlApi = `${process.env.REACT_APP_URL}/ingredients`;

export const getIngredientsRequestAction = (): IGetIngredientsRequestType => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (
  data: IRequestIngredientsBody,
): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload: data,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedType => ({
  type: GET_INGREDIENTS_FAILED,
});

export const getIngredients: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getIngredientsRequestAction());

      const res = await fetch(urlApi);
      const data: IRequestIngredientsBody = await res.json();

      if (data && data.success) {
        dispatch(getIngredientsSuccessAction(data));
      }
    } catch (error) {
      console.log(error);
      dispatch(getIngredientsFailedAction());
    }
  };
};
