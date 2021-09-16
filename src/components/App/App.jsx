import React, { useEffect, useState } from 'react';
import appStyles from './App.module.css';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from '../BurgerIngredients';
import { BurgerConstructor } from '../BurgerConstructors';

const urlApi = 'https://norma.nomoreparties.space/api/ingredients';

export function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(urlApi)
      .then(res => res.json())
      .then(data => setData(data.data))
      .catch(err => {
        console.error(err);
        setIsError(true);
      });
  }, []);

  console.log(data);
  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.container}>
        {isError && !data ? (
          <h2>Что то пошло не так</h2>
        ) : (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        )}
      </main>
    </div>
  );
}
