import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css';
import { resetPassword, RESET_PASSWORD } from '../../services/actions/resetPassword';

import { IFieldType } from '../../types';
import { useDispatch, useSelector } from '../../services/hooks';

export const ResetPassword = () => {
  const [form, setForm] = useState<IFieldType<string>>({ password: '', token: '' });
  const [isVisisble, setIsVisible] = useState(false);
  const { wasForgot } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setForm({ ...form, [target.name]: target.value });
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: RESET_PASSWORD,
        wasForgot: false,
      });
    };
  }, [dispatch]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(form, false, '/reset'));
    history.replace({
      pathname: '/login',
    });
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    if (inputRef.current) {
      inputRef.current.type = isVisisble ? 'password' : 'text';
    }
    setIsVisible(!isVisisble);
  };

  const onBlur = () => {
    if (inputRef.current) {
      inputRef.current.type = 'password';
    }
    setIsVisible(false);
  };

  if (wasForgot === false) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password',
        }}
      />
    );
  }

  return (
    <>
      <div className={`${styles.login} pt-30`}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
          <div className={`${styles.inputBlock} mb-6`}>
            <Input
              size="default"
              value={form.password}
              onChange={onChange}
              name="password"
              placeholder="Введите новый пароль"
              icon={!isVisisble ? 'ShowIcon' : 'HideIcon'}
              type="password"
              ref={ref => (inputRef.current = ref)}
              onIconClick={onIconClick}
              onBlur={onBlur}
            />
          </div>
          <div className={`${styles.inputBlock} mb-6`}>
            <Input
              size="default"
              value={form.token}
              onChange={onChange}
              name="token"
              placeholder="Введите код из письма"
              type="text"
            />
          </div>
          <div className={styles.container}>
            <Button size="large" type="primary">
              Сохранить
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link className={`p-2 ${styles.link}`} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};
