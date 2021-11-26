import React, { useState } from 'react';
import { Location } from 'history';
import { Link, Redirect, useLocation } from 'react-router-dom';
import styles from './Login.module.css';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../services/actions/loginUserAction';

import { IFieldType } from '../../types';
import { useDispatch, useSelector } from '../../services/hooks';

export const Login = () => {
  const [form, setValue] = useState<IFieldType<string>>({ email: '', password: '' });
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);
  const { state } = useLocation<{ from: Location }>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setValue({ ...form, [target.name]: target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      <div className={`${styles.login} pt-30`} data-testid='login'>
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
