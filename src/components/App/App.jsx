import React, { useEffect, useState } from 'react';
import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructors';

import { Context } from '../../services/Context';

const urlApi = 'https://norma.nomoreparties.space/api/ingredients';


const initialState = { price: 0 }

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return {...state, price: action.payload}
    default: return state;
  }
}

export function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useEffect(() => {
    fetch(urlApi)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Error');
      })
      .then(data => setData(data.data))
      .catch(err => {
        console.error(err);
        setIsError(true);
      });
  }, []);

  console.log(data);
  return (
    <Context.Provider value={{ data, state, dispatch }}>
      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.container}>
          {isError && !data ? (
            <h2>Что то пошло не так</h2>
          ) : (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </div>
    </Context.Provider>
  );
}
