import React from 'react';
import {
  Logo,
  BurgerIcon,
  MenuIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './header.module.css';

export const AppHeader = () => {
  const [menu, setMenu] = React.useState(false);

  const toggleMenu = () => {
    setMenu(prev => !prev);
  };

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <nav className={headerStyles.headerWrapper}>
          <ul className={headerStyles.links}>
            <li>
              <a href="/" className={`${headerStyles.activeLink} ${headerStyles.linksItem}`}>
                <BurgerIcon type="primary" />
                <span className={headerStyles.linkText}>Конструктор</span>
              </a>
            </li>
            <li>
              <a href="/" className={headerStyles.linksItem}>
                <ListIcon type="secondary" />
                <span className={headerStyles.linkText}>Лента заказов</span>
              </a>
            </li>
          </ul>

          <a href="/">
            <Logo />
          </a>

          <a href="/" className={headerStyles.linksItem}>
            <ProfileIcon type="secondary" />
            <span className={headerStyles.linkText}>Личный кабинет</span>
          </a>
          
          <div className={headerStyles.mobileMenu}>
            <MenuIcon type="primary" onClick={toggleMenu} />
            <ul className={`${headerStyles.mobileDropdown} ${!menu ? headerStyles.hidden : ''}`}>
              <li>
                <a href="/" className={`${headerStyles.activeLink} ${headerStyles.linkMobile}`}>
                  <BurgerIcon type="primary" />
                  <span className={headerStyles.linkText}>Конструктор</span>
                </a>
              </li>
              <li>
                <a href="/" className={headerStyles.linkMobile}>
                  <ListIcon type="secondary" />
                  <span className={headerStyles.linkText}>Лента заказов</span>
                </a>
              </li>
              <li>
                <a href="/" className={headerStyles.linkMobile}>
                  <ProfileIcon type="secondary" />
                  <span className={headerStyles.linkText}>Личный кабинет</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};
