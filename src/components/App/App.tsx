import React from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { Location } from 'history';
import { Route, Switch, useLocation, useHistory, useParams } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Ingredient,
  ErrorPage,
  FeedPage,
  FeedItemPage,
} from '../../pages';
import { ProtectRoute } from '../ProtectRoute';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { getUser } from '../../services/actions/getuser';
import { Modal } from '../Modal';
import { IngredientDetails } from '../IngredientDetails';
import { AppHeader } from '../AppHeader';

import { CLOSE_MODAL } from '../../services/actions/modalAction';
import { OrderInfo } from '../OrderInfo';
import { CLOSE_FEED_MODAL } from '../../services/reducers/feedModalReducer';
import { HistoryOrders } from '../../pages/Profile/HistoryOrders';
import { getCookie } from '../../utils/cookie';

type TLocation = {
  from: Location;
  ingredientModal: Location;
  state: Location;
  orders: Location;
};

export function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);
  const location = useLocation<TLocation>();
  const history = useHistory();

  const action = history.action === 'PUSH' || history.action === 'REPLACE';
  const modalIngredientOpen = action && location.state && location.state.ingredientModal;
  const token = getCookie('accessToken')?.split('Bearer ')[1];

  const closeModal = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
    dispatch({
      type: CLOSE_FEED_MODAL,
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
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <FeedItemPage url='wss://norma.nomoreparties.space/orders/all' />
        </Route>
        <ProtectRoute path="/profile" exact>
          <Profile />
        </ProtectRoute>
        <ProtectRoute path="/profile/orders" exact>
          <Profile />
        </ProtectRoute>
        <ProtectRoute path="/profile/orders/:id">
          <FeedItemPage url={`wss://norma.nomoreparties.space/orders?token=${token}`} />
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

      {modalIngredientOpen && (
        <Route path="/profile/orders/:id">
          <Modal onClose={closeModal} isTitle largeContainer>
            <OrderInfo />
          </Modal>
        </Route>
      )}

      {modalIngredientOpen && (
        <Route path="/feed/:id">
          <Modal onClose={closeModal} isTitle largeContainer>
            <OrderInfo />
          </Modal>
        </Route>
      )}
    </>
  );
}
