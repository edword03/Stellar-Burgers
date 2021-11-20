import { Middleware, MiddlewareAPI } from 'redux';
import { TWsActions, WS_CLOSE, WS_MESSAGE, WS_OPEN, WS_SUCCESS, WS_SEND_ORDER } from '../actions/wsAction';
import { AppDispatch, RootState } from '../types';

export const socketMiddleware = (): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsActions) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_OPEN) {
        socket = new WebSocket(action.payload);
        console.log('conected');
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_SUCCESS, payload: true });
        };

        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: WS_MESSAGE, payload: JSON.parse(data) });
        };

        socket.onclose = event => {
          console.log('closed conection');
        };

        socket.onerror = event => {
          console.error(`Ошибка`, event);
        };

        if (type === WS_SEND_ORDER) {
          const message = payload;
          socket.send(JSON.stringify(message))
        }

        if (type === WS_CLOSE) {
          socket.close(1000, 'close conection');
          socket = null
        }
      }

      next(action);
    };
  };
};
