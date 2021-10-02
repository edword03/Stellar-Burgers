import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredients } from '../../services/actions/ingredientsActions';

import appStyles from './App.module.css';

import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructors';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>

  );
}
