import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorStyles from './BurgerIngredients.module.css';
import { IngredientBlock } from './IngredientBlock';
import { getBuns, getMain, getSauce } from '../../services/selectors';

export const BurgerIngredients = () => {
  const { ingredientsRequest, ingredientsFaled, ingredientsSuccess } = useSelector(
    store => store.ingredients,
  );
  const buns = useSelector(getBuns);
  const sauce = useSelector(getSauce);
  const mainIngredients = useSelector(getMain);

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const mainBlock = useRef(null);

  const [currentTab, setCurrentTab] = React.useState('one');

  function handleTabs() {
    const topDivFrame = mainBlock.current.offsetTop;
    const bunsClientRect = bunRef.current.getBoundingClientRect().top;
    const sauceClientRect = sauceRef.current.getBoundingClientRect().top;
    const mainClientRect = mainRef.current.getBoundingClientRect().top;

    if (topDivFrame >= bunsClientRect && topDivFrame <= sauceClientRect) {
      setCurrentTab('one');
    } else if (topDivFrame >= sauceClientRect - 150 && topDivFrame <= mainClientRect) {
      setCurrentTab('two');
    } else if (topDivFrame >= mainClientRect) {
      setCurrentTab('three');
    }
  }

  const scrollToBlock = (value, scroll) => {
    setCurrentTab(value);
    mainBlock.current.scrollTo(0, scroll);
  };


  return (
    <>
      <section className={ConstructorStyles.burgerConstructor}>
        <h2 className={`${ConstructorStyles.title} mt-10 mb-5`}>Соберите бургер</h2>
        <div className={`${ConstructorStyles.tabs}`}>
          <Tab value="one" active={currentTab === 'one'} onClick={() => scrollToBlock('one', 0)}>
            Булки
          </Tab>
          <Tab value="two" active={currentTab === 'two'} onClick={() => scrollToBlock('two', 350)}>
            Соусы
          </Tab>
          <Tab
            value="three"
            active={currentTab === 'three'}
            onClick={() => scrollToBlock('three', 850)}>
            Начинки
          </Tab>
        </div>
        <main
          className={`${ConstructorStyles.main} custom-scroll`}
          onScroll={handleTabs}
          ref={mainBlock}>
          {ingredientsRequest ? <p>Загрузка</p> : null}
          {!ingredientsFaled || ingredientsSuccess ? (
            <>
              <IngredientBlock id={'buns'} title="Булки" list={buns} ref={bunRef} />
              <IngredientBlock id="sauce" title="Соусы" list={sauce} ref={sauceRef} />
              <IngredientBlock id="main" title="Начинки" list={mainIngredients} ref={mainRef} />
            </>
          ) : (
            <p>Ошибка</p>
          )}
        </main>
      </section>
    </>
  );
};
