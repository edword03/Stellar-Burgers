import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../../components/AppHeader';
import styles from './Login.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../services/actions/loginUserAction';

export const Login = () => {
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);
  const {state} = useLocation()

  const onChange = e => {
    const target = e.target;

    setValue({ ...form, [target.name]: target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (form.email && form.password) {
      dispatch(loginUser(form));
    }
  };

  if (isAuth) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <>
      <AppHeader />
      <div className={`${styles.login} pt-30`}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
          <div className={`${styles.inputBlock} mb-6`}>
            <EmailInput size="default" value={form.email} onChange={onChange} name="email" />
          </div>
          <div className={`mb-6`}>
            <PasswordInput value={form.password} onChange={onChange} name="password" />
          </div>
          <div className={styles.container}>
            <Button size="large" type="primary">
              Войти
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link className={`p-2 ${styles.link}`} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <Link className={`p-2 ${styles.link}`} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
};
