import { IGetIngredients } from '../../types';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_BUN,
  MOVE_ITEM,
  CLEAR_CONSTRUCTOR,
} from '../actions/constructorAction';

interface IConstructoItems extends IGetIngredients {
  itemId: string;
}

interface IActionType {
  type: string;
  payload: any;
  isLocked?: boolean;
}

interface IInitialState {
  ingredientsConstructor: Array<IConstructoItems>;
  bunItems: {
    price: number;
    _id: string;
    isLocked: boolean;
    name: string;
    index: number;
    type: string;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    itemId: string;
  };
  draggedItem: {};
}

const initialState: IInitialState = {
  ingredientsConstructor: [],
  bunItems: {
    price: 0,
    _id: '',
    isLocked: false,
    name: '',
    index: 0,
    type: '',
    image: '',
    image_large: '',
    image_mobile: '',
    __v: 0,
    itemId: ''
  },
  draggedItem: {},
};

export function counstructorReducer(state = initialState, action: IActionType): IInitialState {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.payload],
      };
    case ADD_BUN:
      return { ...state, bunItems: { ...action.payload, isLocked: action.isLocked } };
    case REMOVE_ITEM:
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter(
          item => item.itemId !== action.payload,
        ),
      };
    case MOVE_ITEM: {
      return { ...state, ingredientsConstructor: action.payload };
    }
    case CLEAR_CONSTRUCTOR:
      return { ...state, ingredientsConstructor: [], bunItems: initialState.bunItems };

    default:
      return state;
  }
}
