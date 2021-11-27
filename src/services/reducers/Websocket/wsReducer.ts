import { IWSMessageBody } from '../../../types';
import {
  WS_OPEN,
  WS_MESSAGE,
  WS_ERROR,
  WS_CLOSE,
  TWsActions,
  WS_SUCCESS,
} from '../../actions/wsAction';

interface IInitialStateWS extends IWSMessageBody {
  isConection: boolean;
  error?: boolean;
}

export const initialState: IInitialStateWS = {
  isConection: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWsActions): IInitialStateWS => {
  switch (action.type) {
    case WS_OPEN:
      return { ...state, isConection: true };
    case WS_SUCCESS:
      return { ...state, success: action.payload };
    case WS_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        success: action.payload.success,
      };
    case WS_ERROR:
      return { ...state, isConection: false, orders: [], error: action.payload, total: 0, totalToday: 0 };
    case WS_CLOSE:
      return { ...state, isConection: false, orders: [], success: false, total: 0, totalToday: 0 };
    default:
      return state;
  }
};
