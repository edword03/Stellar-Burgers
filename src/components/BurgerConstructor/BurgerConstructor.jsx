import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorStyles from './burger-constructor.module.css';
import { bunsList, sauceList } from '../../utils/constructor';
import { ConstructorBlock } from './constructor-block';

export const BurgerConstructor = () => {
  const [currentTab, setCurrentTab] = React.useState('one');

  return (
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
        <ConstructorBlock title="Булки" list={bunsList} />
        <ConstructorBlock title="Соусы" list={sauceList} />
      </main>
    </section>
  );
};

