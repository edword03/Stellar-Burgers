import { WS_ERROR, WS_MESSAGE, WS_OPEN, WS_SUCCESS } from '../../actions/wsAction';
import { wsReducer, initialState } from './wsReducer';

describe('websocket reducer', () => {
  it('should have initial state', () => {
    expect(wsReducer(undefined, { type: null, payload: null })).toEqual(initialState);
  });

  it('should handle WS_OPEN', () => {
    const reducer = wsReducer(initialState, {
      type: WS_OPEN,
      payload: 'wss://normaspace/api/orders',
    });

    expect(reducer).toEqual({
      ...initialState,
      isConection: true,
    });
  });

  it('should handle WS_SUCCESS', () => {
    const reducer = wsReducer(
      {
        ...initialState,
        isConection: true,
      },
      { type: WS_SUCCESS, payload: true },
    );

    expect(reducer).toEqual({
      ...initialState,
      isConection: true,
      success: true,
    });
  });

  it('should handle WS_MESSAGE', () => {
    const reducer = wsReducer(
      { ...initialState, isConection: true },
      {
        type: WS_MESSAGE,
        payload: {
          success: true,
          orders: [
            {
              ingredients: ['dd2f25', '255ahga2', '256aaf25c3'],
              _id: '1d2da-2ch3ca-2faa',
              status: 'pending',
              name: 'string',
              number: 5162,
              createdAt: '2021/11/6',
              updatedAt: '2021/11/23',
            },
          ],
          total: 5520,
          totalToday: 119,
        },
      },
    );

    expect(reducer).toEqual({
      ...initialState,
      orders: [
        {
          ingredients: ['dd2f25', '255ahga2', '256aaf25c3'],
          _id: '1d2da-2ch3ca-2faa',
          status: 'pending',
          name: 'string',
          number: 5162,
          createdAt: '2021/11/6',
          updatedAt: '2021/11/23',
        },
      ],
      total: 5520,
      totalToday: 119,
      success: true,
      isConection: true,
    });
  });

  it('should handle WS_ERROR', () => {
    const reducer = wsReducer(
      { ...initialState, isConection: true },
      { type: WS_ERROR, payload: true },
    );

    expect(reducer).toEqual({
      ...initialState,
      isConection: false,
      orders: [],
      error: true,
      total: 0,
      totalToday: 0,
    });
  });
});
