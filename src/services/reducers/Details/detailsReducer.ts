import { IGetIngredients } from '../../../types';
import { OPEN_MODAL, CLOSE_MODAL } from '../../actions/modalAction';

interface IInitialState {
  isOpen: boolean;
  currentIngredient: IGetIngredients;
}

interface IActionType {
  type: string;
  payload: IGetIngredients;
}

const currentIngredientInit: IGetIngredients = {
  _id: '',
  name: '',
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image_large: '',
  image: '',
  image_mobile: '',
  __v: 0,
};

const initialState: IInitialState = {
  isOpen: false,
  currentIngredient: {...currentIngredientInit},
};

export function detailsReducer(state = initialState, action: IActionType): IInitialState {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true, currentIngredient: action.payload };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        currentIngredient: {...currentIngredientInit},
      };
    default:
      return state;
  }
}
