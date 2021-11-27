import {
  sendDataRequest,
  sendDataSuccess,
  sendDataFailed,
  CLOSE_ORDER,
} from '../../actions/orderAction';
import { orderReducer, initialState } from './orderReducer';

describe('order reducer', () => {
  const succesRequest = {
    name: 'Флюоресцентный традиционный-галактический антарианский space бургер',
    order: {
      number: 5321,
    },
    success: true,
  };

  it('should have initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle SEND_DATA_REQUEST', () => {
    const reducer = orderReducer(initialState, sendDataRequest());

    expect(reducer).toEqual({ ...initialState, orderRequest: true, isModal: true });
  });

  it('should handle SEND_DATA_SUCCESS', () => {
    const reducer = orderReducer(
      {
        ...initialState,
        orderRequest: true,
        isModal: true,
      },
      sendDataSuccess(succesRequest),
    );

    expect(reducer).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: false,
      orderSucces: true,
      isModal: true,
      order: {
        name: succesRequest.name,
        number: succesRequest.order.number,
        success: succesRequest.success,
      },
    });
  });

  it('should handle SEND_DATA_FAILED', () => {
    const reducer = orderReducer({ ...initialState, orderRequest: true }, sendDataFailed());

    expect(reducer).toEqual({ ...initialState, orderFailed: true });
  });

  it('should handle CLOSE_ORDER', () => {
    const reducer = orderReducer(
      {
        ...initialState,
        orderSucces: true,

        isModal: true,

        order: {
          name: succesRequest.name,
          number: succesRequest.order.number,
          success: succesRequest.success,
        },
      },
      {
        type: CLOSE_ORDER,
      },
    );

    expect(reducer).toEqual(initialState);
  });
});
