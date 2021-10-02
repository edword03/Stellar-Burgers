import { SEND_DATA_SUCCESS, SEND_DATA_REQUEST, SEND_DATA_FAILED, CLOSE_ORDER} from '../actions/orderAction';

const initialState = {
  orderRequest: false,
  orderSucces: false,
  orderFailed: false,

  isModal: false,

  order: {
    number: 0,
    orderBody: ''
  },
};

export function orderReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_DATA_REQUEST:
      return { ...state, orderRequest: true, orderFailed: false, orderSucces: false };
    case SEND_DATA_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderSucces: true,
        isModal: true,
        order: {...state.order, number: action.order, orderBody: action.orderBody},
      };
    case SEND_DATA_FAILED:
      return { ...state, orderFailed: true, orderSucces: false, orderRequest: false, order: {} };
    case CLOSE_ORDER:
      return {...state, isModal: false, order: {}}
    default:
      return state;
  }
}
