import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

type TProtectRouteProps = {
  children: any;
  path: string;
  exact?: boolean;
};

export const ProtectRoute: React.FC<TProtectRouteProps> = ({ children, path, exact }) => {
  const { isAuth } = useSelector((store: any) => store.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) =>
        isAuth ? (
          children
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
  );
};
