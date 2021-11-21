import { IOrderRequestBody } from "../../types";
import { CLOSE_ORDER, SEND_DATA_FAILED, SEND_DATA_REQUEST, SEND_DATA_SUCCESS, OPEN_MODAL_ORDER } from "../actions/orderAction";


export interface IOrderRequest {
  type: typeof SEND_DATA_REQUEST;
}

export interface IOrderSuccess {
  type: typeof SEND_DATA_SUCCESS;
  order: number
  orderBody: IOrderRequestBody
}

export interface IOrderFailed {
  type: typeof SEND_DATA_FAILED;
}

export interface ICloseOrder {
  type: typeof CLOSE_ORDER;
}

export interface IOpenModalOrder {
  type: typeof OPEN_MODAL_ORDER
}

export type TOrderType = IOrderRequest | IOrderSuccess | IOrderFailed | ICloseOrder | IOpenModalOrder;
