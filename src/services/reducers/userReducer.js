import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from '../actions/registerUserAction';
import { USER_LOGOUT } from '../actions/logoutAction';
import { RESET_PASSWORD } from '../actions/resetPassword'

const initialState = {
  user: {},
  isAuth: false,
  userRequest: false,
  userSuccess: false,
  userFailed: false,
  wasForgot: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, userRequest: true };
    case USER_SUCCESS:
      return {
        ...state,
        userRequest: false,
        userSuccess: true,
        isAuth: true,
        user: { ...action.payload },
      };
    case USER_FAILED:
      return { ...state, userRequest: false, userFailed: true, userSuccess: false, isAuth: false };
    case USER_LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: {},
        userRequest: false,
        userSuccess: false,
        userFailed: false,
      };
    case RESET_PASSWORD:
      return {...state, wasForgot: action.payload}
    default:
      return state;
  }
}
