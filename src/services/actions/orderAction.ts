import { AppDispatch, AppThunk } from '../types';
import { IOrderBody, IOrderRequestBody } from '../../types';
import { IOrderFailed, IOrderRequest, IOrderSuccess } from '../types/orderType';
import { getCookie } from '../../utils/cookie';

export const SEND_DATA: 'SEND_DATA' = 'SEND_DATA';
export const SEND_DATA_REQUEST: 'SEND_DATA_REQUEST' = 'SEND_DATA_REQUEST';
export const SEND_DATA_SUCCESS: 'SEND_DATA_SUCCESS' = 'SEND_DATA_SUCCESS';
export const SEND_DATA_FAILED: 'SEND_DATA_FAILED' = 'SEND_DATA_FAILED';
export const CLOSE_ORDER: 'CLOSE_ORDER' = 'CLOSE_ORDER';
export const OPEN_MODAL_ORDER: 'OPEN_MODAL_ORDER' = 'OPEN_MODAL_ORDER'

const apiUrl = `${process.env.REACT_APP_URL}/orders`;

export const sendDataRequest = (): IOrderRequest => ({
  type: SEND_DATA_REQUEST,
});

export const sendDataSuccess = (data: IOrderRequestBody): IOrderSuccess => ({
  type: SEND_DATA_SUCCESS,
  orderBody: data,
});

export const sendDataFailed = (): IOrderFailed => ({
  type: SEND_DATA_FAILED,
});

export const sendOrder: AppThunk = (body: IOrderBody) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sendDataRequest());

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + getCookie('accessToken')?.split('Bearer ')[1],
        },
        body: JSON.stringify(body),
      });

      const data: IOrderRequestBody = await res.json();

      if (data && data.success) {
        dispatch(sendDataSuccess(data));
      }
    } catch (error) {
      console.error(error);
      dispatch(sendDataFailed());
    }
  };
};
