import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom'
import {
  Logo,
  BurgerIcon,
  MenuIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css';

export const AppHeader = () => {
  const [menu, setMenu] = React.useState<boolean>(false);

  const {path} = useRouteMatch()

  const toggleMenu = () => {
    setMenu(prev => !prev);
  };

  return (
    <header className={`${headerStyles.header} pt-4 pb-4`}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.headerWrapper}>
          <ul className={headerStyles.links}>
            <li>
              <NavLink to='/' activeClassName={headerStyles.activeLink} className={`${headerStyles.linksItem}`} exact>
                <BurgerIcon type={`${path === '/' ? 'primary': 'secondary'}`} />
                <span className={`${headerStyles.linkText} text text_type_main-default`}>Конструктор</span>
              </NavLink>
            </li>
            <li>
              <a href="/" className={headerStyles.linksItem}>
                <ListIcon type="secondary" />
                <span className={`${headerStyles.linkText} text text_type_main-default`}>Лента заказов</span>
              </a>
            </li>
          </ul>

          <a href="/">
            <Logo />
          </a>

          <NavLink activeClassName={headerStyles.activeLink} to='/profile' className={headerStyles.linksItem} exact>
            <ProfileIcon type={`${path === '/profile' ? 'primary': 'secondary'}`} />
            <span className={`${headerStyles.linkText} text text_type_main-default`}>Личный кабинет</span>
          </NavLink>
          
          <div className={headerStyles.mobileMenu}>
            <MenuIcon type="primary" onClick={toggleMenu} />
            <ul className={`${headerStyles.mobileDropdown} ${!menu ? headerStyles.hidden : ''}`}>
              <li>
                <a href="/" className={`${headerStyles.activeLink} ${headerStyles.linkMobile}`}>
                  <BurgerIcon type="primary" />
                  <span className={`${headerStyles.linkText} text text_type_main-default`}>Конструктор</span>
                </a>
              </li>
              <li>
                <a href="/" className={headerStyles.linkMobile}>
                  <ListIcon type="secondary" />
                  <span className={`${headerStyles.linkText} text text_type_main-default`}>Лента заказов</span>
                </a>
              </li>
              <li>
                <a href="/" className={headerStyles.linkMobile}>
                  <ProfileIcon type="secondary" />
                  <span className={`${headerStyles.linkText} text text_type_main-default`}>Личный кабинет</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};
