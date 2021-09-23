import React, { useMemo } from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorItem } from './BurgerConstructorItem';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { OrderDetails } from '../OrderDetails';

import {Context} from '../../services/Context'

const apiUrl = 'https://norma.nomoreparties.space/api/orders';

export const BurgerConstructor = () => {
  const [isModal, setIsModal] = React.useState(false);
  const [orderData, setOrderData] = React.useState({})
  const [isError, setIsError] = React.useState(false)

  const {data, state, dispatch} = React.useContext(Context)

  React.useEffect(() => {
    const price = data.reduce((acc, cur) => acc + cur.price, 0);
    dispatch({ type: 'SET', payload: price })
  }, [data, dispatch])

  const getIngredientId = (arr = []) => {
    return {ingredients: arr.map(item => item._id)}
  }
  
  const toggleModal = () => setIsModal(prev => !prev);

  const sendApi = async(url) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getIngredientId(data))
    })

    if (res.ok) {
      return await res.json()
    }

    throw new Error(res.status)
  }

  const sendOrder = () => {
    sendApi(apiUrl)
      .then(data => {
        setOrderData(data.order)
        setIsModal(true)
        console.log(data);
      })
      .catch(err => {
        console.error(err)
        setIsError(true)
      })
  }

  const sortIngredients = useMemo(() => data.filter(item => item.type !== 'bun'), [data])
  const sortBuns = useMemo(() => data.filter(item => item.type === 'bun')[0], [data])

  return (
    <>
      <section className={`mt-25 pr-4 pl-4`}>
        {sortBuns && <BurgerConstructorItem  {...sortBuns} type={'top'} name={sortBuns.name + '(верх)'} />}
        <div className={`${BurgerIngredientStyles.ingredientBlock} custom-scroll`}>
          {sortIngredients ? (
            sortIngredients.map((item, i) => (
              <BurgerConstructorItem {...item} isLocked={false} key={item._id}>
                <div className="mr-2">
                  <DragIcon />
                </div>
              </BurgerConstructorItem>
            ))
          ) : (
            <p>Не найдено</p>
          )}
        </div>
        {sortBuns && <BurgerConstructorItem {...sortBuns} type={'bottom'} name={sortBuns.name + '(низ)'}  />}

        <div className={`mt-10 ${BurgerIngredientStyles.price}`}>
          <p className={`mr-10`}>
            <span className="mr-2 text text_type_digits-medium">{state.price}</span>
            <CurrencyIcon />
          </p>
          <Button type="primary" size="large" onClick={sendOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModal && !isError && (
        <Modal onClose={toggleModal} paddingBottom="pb-30">
          <OrderDetails data={orderData} />
        </Modal>
      )}
    </>
  );
};
