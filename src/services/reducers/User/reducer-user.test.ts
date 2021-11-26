import { userReducer, initialState } from './userReducer';
import { userRequest, userSuccess, userError } from '../../actions/registerUserAction';
import { USER_LOGOUT } from '../../actions/logoutAction';

describe('user reducer', () => {
  it('should have initial state', () => {
    expect(userReducer(undefined, { type: null })).toEqual(initialState);
  });

  it('should handle USER_REQUEST', () => {
    const reducer = userReducer(initialState, userRequest());

    expect(reducer).toEqual({ ...initialState, userRequest: true });
  });

  it('should handle USER_SUCCESS', () => {
    const reducer = userReducer(
      { ...initialState, userRequest: true },
      userSuccess({
        success: true,
        user: {
          email: 'email@mail.ru',
          name: 'Andry',
        },
        accessToken: 'Barer da242hf2hc2.25sf2.cac225txfa',
        refreshToken: 'c267vx76vx7sv7m806',
      }),
    );

    expect(reducer).toEqual({
      ...initialState,
      userRequest: false,
      userSuccess: true,
      isAuth: true,
      user: {
        email: 'email@mail.ru',
        name: 'Andry',
      },
    });
  });

  it('should handle USER_FAILED', () => {
    const reducer = userReducer({ ...initialState, userRequest: true }, userError());

    expect(reducer).toEqual({
      ...initialState,
      userRequest: false,
      userFailed: true,
      userSuccess: false,
      isAuth: false,
    });
  });

  it('should hadnle USER_LOGOUT', () => {
    const reducer = userReducer(
      {
        ...initialState,
        userRequest: false,
        userSuccess: true,
        isAuth: true,
        user: {
          email: 'email@mail.ru',
          name: 'Andry',
        },
      },
      { type: USER_LOGOUT },
    );

    expect(reducer).toEqual(initialState)
  });
});
