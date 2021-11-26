import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../../actions/ingredientsActions';
import { IGetIngredients } from '../../../types';
import { IIngredientsActions } from '../../types/ingredientsTypes';

interface IInitialState {
  ingredientItems: Array<IGetIngredients>;
  ingredientsRequest: boolean;
  ingredientsSuccess: boolean;
  ingredientsFaled: boolean;
}

const initialState: IInitialState = {
  ingredientItems: [],

  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFaled: false,
};

export function ingredientsReducer(state = initialState, action: IIngredientsActions): IInitialState {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return { ...state, ingredientsRequest: true };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientItems: action.payload.data,
        ingredientsRequest: false,
        ingredientsSuccess: true,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFaled: true,
        ingredientsSuccess: false,
      };
    default:
      return state;
  }
}
