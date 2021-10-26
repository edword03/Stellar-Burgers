import React from 'react';
import {Link} from 'react-router-dom'
import { AppHeader } from '../components/AppHeader';

export const ErrorPage = () => {
  return (
    <>
      <AppHeader />
      Упс...Указанная страница не найдена
      <Link to={'/'}>
        На главную
      </Link>
    </>
  );
};
