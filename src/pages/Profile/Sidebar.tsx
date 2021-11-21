import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Profile.module.css';
import { NavLink } from 'react-router-dom';

interface IProps {
  onLogOut: () => void;
}

export const Sidebar: React.FC<IProps> = ({ onLogOut }) => {
  const { pathname } = useLocation();
  
  return (
    <aside className={`${styles.sidebar} mr-15`}>
      <NavLink
        to="/profile"
        className={`${styles.link} text text_type_main-medium pt-5 pb-5`}
        activeClassName={styles.active}
        exact>
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        activeClassName={styles.active}
        className={`${styles.link} text text_type_main-medium pb-5`}
        exact>
        История заказов
      </NavLink>
      <button
        onClick={onLogOut}
        className={`${styles.link} text text_type_main-medium pb-20`}
        style={{ display: 'flex' }}>
        Выход
      </button>
      <p className="text text_type_main-default text_color_inactive">
        {pathname === '/profile'
          ? 'В этом разделе вы можете изменить свои персональные данные'
          : 'В этом разделе вы можете просмотреть свою историю заказов'}
      </p>
    </aside>
  );
};
