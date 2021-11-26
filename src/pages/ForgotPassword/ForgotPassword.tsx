import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { Link, useHistory } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPassword.module.css';
import { RESET_PASSWORD } from '../../services/actions/resetPassword';
import { resetPassword } from '../../utils/api';


export const ForgotPassword = () => {
  const REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false)
  const { isAuth } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isAuth) {
      history.replace('/');
    }
  }, [history, isAuth]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setEmail(target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false)

    if (email && REGEXP.test(email)) {
      const data = await resetPassword({ email });
      console.log('data: ', data);

      if (data.success) {
        dispatch({
          type: RESET_PASSWORD,
          wasForgot: true,
        });
        history.replace({ pathname: '/reset-password' });
      }
    } 

    if (email.length <= 0) {
      setIsError(true)
    }

  };

  return (
    <>
      <div className={`${styles.login} pt-30`}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <form className={`${styles.form} pb-20`} onSubmit={onSubmit}>
          <div className={`${styles.inputBlock} mb-6`}>
            <EmailInput size="default" value={email} onChange={onChange} name="login" />
            {isError && <span className={`${styles.errorText} text text_type_main-default pl-5`}>Заполните поле</span>}
          </div>
          <div className={styles.container}>
            <Button size="large" type="primary">
              Восстановить
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
