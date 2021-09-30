import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../actions/ingredientsActions'

const initialState = {
  ingredientItems: [],
  order: {},

  ingredientsRequest: false,
  ingredientsSuccess: false,
  ingredientsFaled: false
}

export function ingredientsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {...state, ingredientsRequest: true}
    case GET_INGREDIENTS_SUCCESS: 
      return {...state, ingredientItems: action.data, ingredientsRequest: false, ingredientsSuccess: true}
    case GET_INGREDIENTS_FAILED: 
      return {...state, ingredientsRequest: false, ingredientsFaled: true, ingredientsSuccess: false}
    default:
      return state
  }
}
