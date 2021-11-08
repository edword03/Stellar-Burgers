import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorStyles from './BurgerIngredients.module.css';
import { IngredientBlock } from './IngredientBlock';
import { getBuns, getMain, getSauce } from '../../services/selectors';

export const BurgerIngredients = () => {
  const { ingredientsRequest, ingredientsFaled, ingredientsSuccess } = useSelector(
    (store: any) => store.ingredients,
  );
  const buns = useSelector(getBuns);
  const sauce = useSelector(getSauce);
  const mainIngredients = useSelector(getMain);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const mainBlock = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = React.useState<string>('one');

  function handleTabs(): void {
    const topDivFrame = mainBlock.current ? mainBlock.current.offsetTop : 0;
    const bunsClientRect = bunRef.current ? bunRef.current.getBoundingClientRect().top : 0;
    const sauceClientRect = sauceRef.current ? sauceRef.current.getBoundingClientRect().top : 0;
    const mainClientRect = mainRef.current ? mainRef.current.getBoundingClientRect().top : 0;

    if (topDivFrame >= bunsClientRect && topDivFrame <= sauceClientRect) {
      setCurrentTab('one');
    } else if (topDivFrame >= sauceClientRect - 150 && topDivFrame <= mainClientRect) {
      setCurrentTab('two');
    } else if (topDivFrame >= mainClientRect) {
      setCurrentTab('three');
    }
  }

  const scrollToBlock = (value: string, scroll: number): void => {
    setCurrentTab(value);
    mainBlock.current && mainBlock.current.scrollTo(0, scroll);
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
              <IngredientBlock id="buns" title="Булки" list={buns} ref={bunRef} />
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
