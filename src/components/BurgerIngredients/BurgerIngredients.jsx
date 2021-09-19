import React, { useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorStyles from './BurgerIngredients.module.css';
import { IngredientBlock } from './IngredientBlock';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { IngredientDetails } from '../IngredientDetails';

export const BurgerIngredients = ({ data = [] }) => {
  const [isModal, setIsModal] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({})
  const [currentTab, setCurrentTab] = React.useState('one');

  const setModalProps = (props) => {
    setCurrentIngredient(props)
  };
  
  const closeModal = () =>  setIsModal(false)

  const sortBuns = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
  const sortMain = useMemo(() => data.filter(item => item.type === 'main'), [data]);
  const sortSause = useMemo(() => data.filter(item => item.type === 'sauce'), [data]);

  return (
    <>
      <section className={ConstructorStyles.burgerConstructor}>
        <h2 className={`${ConstructorStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
        <div className={`${ConstructorStyles.tabs}`}>
          <Tab value="one" active={currentTab === 'one'} onClick={setCurrentTab}>
            Булки
          </Tab>
          <Tab value="two" active={currentTab === 'two'} onClick={setCurrentTab}>
            Соусы
          </Tab>
          <Tab value="three" active={currentTab === 'three'} onClick={setCurrentTab}>
            Начинки
          </Tab>
        </div>
        <main className={`${ConstructorStyles.main} custom-scroll`}>
          <IngredientBlock title="Булки" list={sortBuns} onClick={setIsModal} setModalDate={setModalProps} />
          <IngredientBlock title="Соусы" list={sortSause} onClick={setIsModal} setModalDate={setModalProps} />
          <IngredientBlock title="Начинки" list={sortMain} onClick={setIsModal} setModalDate={setModalProps} />
        </main>
      </section>
      {isModal && (
        <Modal onClose={closeModal} title={'Детали ингредиента'}>
          <IngredientDetails data={currentIngredient} />
        </Modal>
      )}
    </>
  );
};

const arrayData = PropTypes.shape({
  image: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number,
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(arrayData),
};
