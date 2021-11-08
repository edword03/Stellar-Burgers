import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Location } from 'history';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
  ErrorPage,
} from '../../pages';
import { ProtectRoute } from '../ProtectRoute';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { getUser } from '../../services/actions/getuser';
import { Modal } from '../Modal';
import { IngredientDetails } from '../IngredientDetails';
import { AppHeader } from '../AppHeader';

import { CLOSE_MODAL } from '../../services/actions/modalAction';

type TLocation = {
  from: Location;
  ingredientModal: Location;
  state: Location;
};

export function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store: any) => store.user);
  const location = useLocation<TLocation>();
  const history = useHistory();

  const action = history.action === 'PUSH' || history.action === 'REPLACE';
  const modalIngredientOpen = action && location.state && location.state.ingredientModal;

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    history.goBack();
  };

  React.useEffect(() => {
    dispatch(getIngredients());

    if (!isAuth) {
      dispatch(getUser('GET'));
    }
  }, [dispatch, isAuth]);

  return (
    <>
      <AppHeader />
      <Switch location={modalIngredientOpen || location}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <ProtectRoute path="/profile" exact>
          <Profile />
        </ProtectRoute>
        <ProtectRoute path="/profile/orders" exact>
          <Profile />
        </ProtectRoute>
        <Route path="/ingredients/:id">
          <Ingredient />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>

      {modalIngredientOpen && (
        <Route path="/ingredients/:id">
          <Modal onClose={closeModal} title={'Детали ингредиента'}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}
