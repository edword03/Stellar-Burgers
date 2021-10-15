import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { AppHeader } from '../../components/AppHeader';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Profile.module.css';
import { logout } from '../../services/actions/logoutAction';
import { getUser } from '../../services/actions/getuser';

export const Profile = () => {
  const { name, email } = useSelector(store => store.user.user);
  const initialState = { name: name, email: email, password: '' };

  const [form, setForm] = useState(initialState);
  const [edit, setEdit] = useState({ name: true, email: true, password: true });
  const dispatch = useDispatch();
  const history = useHistory();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    dispatch(getUser('GET'));
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(logout());
  };

  const onChange = e => {
    const target = e.target;
    setForm({ ...form, [target.name]: target.value });
  };

  const onCancel = e => {
    e.preventDefault();
    setForm(initialState);
  };

  const onSave = e => {
    e.preventDefault();
    if (
      form.name !== initialState.name ||
      form.email !== initialState.email ||
      form.password !== initialState.password
    ) {
      dispatch(getUser('PATCH', { body: JSON.stringify(form) }));
      setForm({...form, password: ''});
    }
  };

  const onIconClick = ref => {
    setEdit({ ...edit, [ref.current.name]: !edit[ref.current.name] });
    console.log(ref.current);
    setTimeout(() => ref.current.focus(), 0);
  };

  const onBlur = ref => {
    const target = ref.current;
    setEdit({ ...edit, [target.name]: !edit[target.name] });
  };

  return (
    <>
      <AppHeader />
      <div className={`mt-30 ${styles.container}`}>
        <aside className={styles.sidebar}>
          <NavLink
            to="/profile"
            className={`${styles.link} text text_type_main-medium pt-5 pb-5`}
            activeClassName={styles.active}
            exact>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" activeClassName={styles.active} className={`${styles.link} text text_type_main-medium pb-5`} exact>
            История заказов
          </NavLink>
          <button
            onClick={onLogOut}
            className={`${styles.link} text text_type_main-medium pb-20`}
            style={{ display: 'flex' }}>
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </aside>
        <form className="ml-15" onSubmit={onSave}>
          <div className="mb-6">
            <Input
              onChange={onChange}
              type="text"
              name="name"
              placeholder={'Имя'}
              value={form.name}
              icon={!edit.name ? 'CloseIcon' : 'EditIcon'}
              ref={nameRef}
              onIconClick={e => onIconClick(nameRef)}
              onBlur={() => onBlur(nameRef)}
              disabled={edit.name}
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder={'Логин'}
              value={form.email}
              icon={!edit.email ? 'CloseIcon' : 'EditIcon'}
              ref={emailRef}
              disabled={edit.email}
              onChange={onChange}
              onIconClick={e => onIconClick(e, emailRef)}
              onBlur={() => onBlur(emailRef)}
            />
          </div>
          <div>
            <Input
              type="password"
              name="password"
              placeholder={'Пароль'}
              value={form.password}
              icon={!edit.password ? 'CloseIcon' : 'EditIcon'}
              ref={passwordRef}
              disabled={edit.password}
              onChange={onChange}
              onIconClick={e => onIconClick(passwordRef)}
              onBlur={() => onBlur(passwordRef)}
            />
          </div>
          <div className="mt-6">
            <Button type="secondary" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="primary">Сохранить</Button>
          </div>
        </form>
      </div>
    </>
  );
};
