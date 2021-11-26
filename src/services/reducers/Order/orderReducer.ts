import {
  SEND_DATA_SUCCESS,
  SEND_DATA_REQUEST,
  SEND_DATA_FAILED,
  CLOSE_ORDER,
  OPEN_MODAL_ORDER,
} from '../../actions/orderAction';
import { TOrderType } from '../../types/orderType';

interface IInitialState {
  orderRequest: boolean;
  orderSucces: boolean;
  orderFailed: boolean;

  isModal: boolean;
  order: {
    name: string;
    number: number;
    success: boolean;
  };
}

export const initialState: IInitialState = {
  orderRequest: false,
  orderSucces: false,
  orderFailed: false,

  isModal: false,

  order: {
    name: '',
    number: 0,
    success: false,
  },
};

export function orderReducer(state = initialState, action: TOrderType): IInitialState {
  switch (action.type) {
    case SEND_DATA_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
        orderSucces: false,
        isModal: true,
      };
    case SEND_DATA_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderSucces: true,
        order: {
          ...state.order,
          name: action.orderBody.name,
          success: action.orderBody.success,
          number: action.orderBody.order.number,
        },
      };
    case SEND_DATA_FAILED:
      return {
        ...state,
        orderFailed: true,
        orderSucces: false,
        orderRequest: false,
        isModal: false,
        order: {
          name: '',
          number: 0,
          success: false,
        },
      };
    case CLOSE_ORDER:
      return {
        orderRequest: false,
        orderSucces: false,
        orderFailed: false,
        isModal: false,
        order: {
          name: '',
          number: 0,
          success: false,
        },
      };
    default:
      return state;
  }
}
