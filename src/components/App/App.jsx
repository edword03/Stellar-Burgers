import React from 'react';
import { store } from '../../services/store';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import appStyles from './App.module.css';

import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructors';

export function App() {
  return (
    <Provider store={store}>
      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    </Provider>
  );
}
