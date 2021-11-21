import { IResetPass } from "../types/userRegisterTypes";
import { AppDispatch, AppThunk } from "../types";

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD'


const resetPasswordAction = (payload: boolean): IResetPass => ({
  type: RESET_PASSWORD,
  payload: payload
})

export const resetPassword: AppThunk = (body, payload, url = '') => {
  return async(dispatch: AppDispatch) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/password-reset${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body)
      })

      const data = await res.json()
      
      if (data.success) {
        dispatch(resetPasswordAction(payload))
      }
    } catch (error) {
      console.error(error)
    }
  }
}