import React from 'react';
import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader'
import { BurgerIngredients } from '../BurgerIngredients'
import { BurgerConstructor } from '../BurgerConstructors'

export function App() {
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}