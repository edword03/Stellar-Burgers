import { ADD_ITEM, REMOVE_ITEM, ADD_BUN, MOVE_ITEM, CLEAR_CONSTRUCTOR } from '../actions/constructorAction';

const initialState = {
  ingredientsConstructor: [],
  bunItems: {price: 0, _id: ''},
  draggedItem: {},
};

export function counstructorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.payload],
      };
    case ADD_BUN:
      return {...state, bunItems: {...action.payload, isLocked: action.isLocked}}
    case REMOVE_ITEM:
      return {...state, ingredientsConstructor: state.ingredientsConstructor.filter(item => item.itemId !== action.id)}
    case MOVE_ITEM: {
      return {...state, ingredientsConstructor: action.payload}
    }
    case CLEAR_CONSTRUCTOR:
      return {...state, ingredientsConstructor: [], bunItems: initialState.bunItems}

    default:
      return state;
  }
}
