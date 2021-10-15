import React, { useState, useRef, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPassword.module.css';
import { AppHeader } from '../../components/AppHeader';
import {resetPassword, RESET_PASSWORD} from '../../services/actions/resetPassword'

export const ResetPassword = () => {
  const [form, setForm] = useState({password: '', token: ''});
  const [isVisisble, setIsVisible] = useState(false)
  const {wasForgot} = useSelector(store => store.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const inputRef = useRef(null)

  const onChange = e => {
    const target = e.target;
    setForm({...form, [target.name]: target.value});
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: RESET_PASSWORD,
        payload: false
      })
    }
  }, [dispatch])

  const onSubmit = e => {
    e.preventDefault();
    dispatch(resetPassword(form, false, '/reset'))
      history.replace({
        pathname: '/login'
      })
    
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    inputRef.current.type = isVisisble ? 'password' : 'text'
    setIsVisible(!isVisisble)
  }

  const onBlur = () => {
    inputRef.current.type = 'password'
    setIsVisible(false)
  }

  if (wasForgot === false) {
    return <Redirect to={{
      pathname: '/forgot-password'
    }} />
  }

  return (
    <>
      <AppHeader />
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
              icon={!isVisisble ? 'ShowIcon': 'HideIcon'}
              type="password"
              ref={ref => inputRef.current = ref}
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
