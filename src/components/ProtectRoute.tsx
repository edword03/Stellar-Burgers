import React from 'react';
import { useSelector } from '../services/hooks';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from './Loader';

type TProtectRouteProps = {
  children: any;
  path: string;
  exact?: boolean;
};

export const ProtectRoute: React.FC<TProtectRouteProps> = ({ children, path, exact }) => {
  const { isAuth, userSuccess, userFailed } = useSelector(store => store.user);

  return (
    <>
      <Route
        path={path}
        exact={exact}
        render={({ location }) =>
          userSuccess && isAuth ? (
            children
          ) : !userFailed && !isAuth ? (
            <Loader />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    </>
  );
};
