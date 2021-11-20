import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Feed } from '../../components/Feed';
import styles from './Profile.module.css';
import { logout } from '../../services/actions/logoutAction';
import { getUser } from '../../services/actions/getuser';

import { IFieldType } from '../../types';
import { Sidebar } from './Sidebar';
import { useDispatch, useSelector } from '../../services/hooks';
import { WS_CLOSE, WS_OPEN } from '../../services/actions/wsAction';
import { getCookie } from '../../utils/cookie';
import { HistoryOrders } from './HistoryOrders';

type TInitialState = {
  name: string;
  email: string;
  password: string;
};

export const Profile = () => {
  const { email, name } = useSelector(store => store.user.user);
  const initialState: TInitialState = { name: name, email: email, password: '' };

  const [form, setForm] = useState<TInitialState>(initialState);
  const [edit, setEdit] = useState<IFieldType<boolean>>({
    name: true,
    email: true,
    password: true,
  });
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(getUser('GET'));
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(logout());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setForm({ ...form, [target.name]: target.value });
  };

  const onCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setForm(initialState);
  };

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.name !== initialState.name ||
      form.email !== initialState.email ||
      form.password !== initialState.password
    ) {
      dispatch(getUser('PATCH', { body: JSON.stringify(form) }));
      setForm({ ...form, password: '' });
    }
  };

  const onIconClick = (ref: { current: any }) => {
    setEdit({ ...edit, [ref.current.name]: !edit[ref.current.name] });
    console.log(ref.current);
    setTimeout(() => ref.current.focus(), 0);
  };

  const onBlur = (ref: { current: any }) => {
    const target = ref.current;
    setEdit({ ...edit, [target.name]: !edit[target.name] });
  };

  return (
    <>
      <div className={`mt-30 ${styles.container}`}>
        <Sidebar onLogOut={onLogOut} />
        {pathname === '/profile' ? (
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
                onIconClick={e => onIconClick(emailRef)}
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
        ) : (
          <HistoryOrders />
        )}
      </div>
    </>
  );
};

// orders && orders.map(order => <Feed order={order.number}
//   title={order.name}
//   date={order.createdAt}
//   ingredients={order.ingredients} />
