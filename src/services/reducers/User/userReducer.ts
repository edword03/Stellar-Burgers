import { USER_REQUEST, USER_SUCCESS, USER_FAILED } from '../../actions/registerUserAction';
import { USER_LOGOUT } from '../../actions/logoutAction';
import { RESET_PASSWORD } from '../../actions/resetPassword';
import { IUserActions } from '../../types/userRegisterTypes';

interface IUser {
  name: string;
  email: string;
}

interface IInitialState {
  user: IUser;
  isAuth: boolean;
  userRequest: boolean;
  userSuccess: boolean;
  userFailed: boolean;
  wasForgot: boolean | undefined;
}

export const initialState: IInitialState = {
  user: {
    name: '',
    email: '',
  },
  isAuth: false,
  userRequest: false,
  userSuccess: false,
  userFailed: false,
  wasForgot: false,
};

export function userReducer(state = initialState, action: IUserActions): IInitialState {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, userRequest: true };
    case USER_SUCCESS:
      return {
        ...state,
        userRequest: false,
        userSuccess: true,
        isAuth: true,
        user: {...action.payload},
      };
    case USER_FAILED:
      return { ...state, userRequest: false, userFailed: true, userSuccess: false, isAuth: false };
    case USER_LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: { name: '', email: '' },
        userRequest: false,
        userSuccess: false,
        userFailed: false,
      };
    case RESET_PASSWORD:
      return { ...state, wasForgot: action.payload };
    default:
      return state;
  }
}
