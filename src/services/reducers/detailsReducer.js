import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modalAction';

const initialState = {
  isOpen: false,
  currentIngredient: {},
};

export function detailsReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {...state, isOpen: true, currentIngredient: action.payload}
    case CLOSE_MODAL:
      return {...state, isOpen: false, currentIngredient: {}}
    default: return state
  }
}
