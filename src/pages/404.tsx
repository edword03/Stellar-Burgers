import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <>
      Упс...Указанная страница не найдена
      <Link to={'/'}>На главную</Link>
    </>
  );
};
