import React from 'react';
import appStyles from './app.module.css';
import { AppHeader } from '../app-header'
import { BurgerConstructor } from '../BurgerConstructor'
import { BurgerIngredient } from '../BurgerIngredients'

export function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.container}>
        <BurgerConstructor />
        <BurgerIngredient />
      </main>
    </div>
  );
}