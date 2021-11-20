import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Register.module.css';
import { registerUser } from '../../services/actions/registerUserAction';

import { IRegisterType } from '../../types';
import { useDispatch, useSelector } from '../../services/hooks';

export const Register = () => {
  const [form, setValue] = useState<IRegisterType>({ name: '', email: '', password: '' });
  const [error, setError] = useState<true | false>(false);
  const dispatch = useDispatch();
  const { isAuth } = useSelector(store => store.user);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue({ ...form, [target.name]: target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.name && form.password && form.email) {
      dispatch(registerUser(form));
      console.log('register');
    }

    if (!form.name) {
      setError(true);
    } else {
      setError(false);
    }
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={`${styles.login} pt-30`}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
          <div className={`mb-6`}>
            <Input
              placeholder="Имя"
              name="name"
              value={form.name}
              onChange={onChange}
              error={error}
              errorText="Введите имя"
            />
          </div>
          <div className={`${styles.inputBlock} mb-6`}>
            <EmailInput size="default" value={form.email} onChange={onChange} name="email" />
          </div>
          <div className={`mb-6`}>
            <PasswordInput value={form.password} onChange={onChange} name="password" />
          </div>
          <div className={styles.container}>
            <Button size="large" type="primary">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link className={`p-2 ${styles.link}`} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};
