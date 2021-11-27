import { USER_LOGOUT } from "../actions/logoutAction";
import { USER_FAILED, USER_REQUEST, USER_SUCCESS } from "../actions/registerUserAction";
import { RESET_PASSWORD } from "../actions/resetPassword";

export interface IUserRequest {
  type: typeof USER_REQUEST;
}

export interface IUserLogout {
  type: typeof USER_LOGOUT
}

export interface IUserSuccess {
  type: typeof USER_SUCCESS;
  payload: {
    email: string
    name: string
  }
}

export interface IResetPass {
  type: typeof RESET_PASSWORD,
  payload: boolean
}

export interface IUserFailed {
  type: typeof USER_FAILED,
}

export type IUserActions = IUserRequest | IUserSuccess | IUserFailed | IUserLogout | IResetPass | {type: null}