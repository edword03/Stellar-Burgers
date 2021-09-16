import React, { useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorStyles from './BurgerIngredients.module.css';
import { IngredientBlock } from './IngredientBlock';
import PropTypes from 'prop-types'

export const BurgerIngredients = ({ data = [] }) => {
  const [currentTab, setCurrentTab] = React.useState('one');

  const sortBuns = useMemo(() => data.filter(item => item.type === 'bun'), [data])
  const sortMain = useMemo(() => data.filter(item => item.type === 'main'), [data])
  const sortSause = useMemo(() => data.filter(item => item.type === 'sauce'), [data])
 
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
        <IngredientBlock title="Булки" list={sortBuns} />
        <IngredientBlock title="Соусы" list={sortSause} />
        <IngredientBlock title="Начинки" list={sortMain} />
      </main>
    </section>
  );
};

const arrayData = PropTypes.shape({
  image: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  price: PropTypes.number
})

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(arrayData)
}