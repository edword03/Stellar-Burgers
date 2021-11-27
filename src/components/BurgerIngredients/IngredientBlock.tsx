import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './BurgerIngredients.module.css';
import { BurgerCard } from './BurgerCard';

interface IIngredientBlock {
  list: Array<any>;
  title: string;
  id: string;
  test: string
}

export const IngredientBlock = React.forwardRef<HTMLDivElement, IIngredientBlock>(
  ({ list = [], title, id, test }, ref) => {
    const location = useLocation();

    return (
      <div className={`mt-10 mb-10`} id={test}>
        <h3 className={`mb-6 text text_type_main-medium`} id={id} ref={ref}>
          {title}
        </h3>
        <div className={`pl-4 pr-4 ${styles.col}`}>
          {list &&
            list.map((list: any) => (
              <Link
                key={list._id}
                to={{
                  pathname: `/ingredients/${list._id}`,
                  state: { ingredientModal: location },
                }}>
                <BurgerCard {...list} />
              </Link>
            ))}
        </div>
      </div>
    );
  },
);
