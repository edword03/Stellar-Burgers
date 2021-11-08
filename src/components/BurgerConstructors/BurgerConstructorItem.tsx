import React from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

interface IProps {
  children: React.ReactNode;
  type: string;
  typeItem?: 'bottom' | 'top' | undefined;
  name: string;
  image: string;
  price: number;
  isLocked: boolean;
  onRemove: (value: string) => void;
  _id: string;
  move: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  itemId: string;
}

export const BurgerConstructorItem: React.FC<IProps> = ({
  children,
  type,
  typeItem,
  name,
  image,
  price,
  isLocked,
  onRemove,
  _id,
  move,
  index,
  itemId,
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const [, dropRef] = useDrop({
    accept: type !== 'bun' ? 'ingredient' : '',
    hover: (item: {index: number}, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = itemRef.current?.getBoundingClientRect();

      const hoverMiddleY = hoverBoundingRect
        ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        : 0;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY =
        clientOffset && hoverBoundingRect ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, dragItem] = useDrag({
    type: type !== 'bun' ? 'ingredient' : '',
    item: () => {
      return { _id, index };
    },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });
  dragItem(dropRef(itemRef));
  const opacity = isDrag ? 0 : 1;

  return (
    <article
      className={`${BurgerIngredientStyles.burgerItem} ${BurgerIngredientStyles.burgerBun} ${
        typeItem === 'top' ? 'mb-4' : typeItem === 'bottom' ? 'mt-4' : ''
      }`}
      ref={itemRef}
      style={{ opacity }}>
      {children ? children : <div style={{ width: 24, height: 24 }}></div>}
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        type={typeItem}
        isLocked={isLocked}
        handleClose={() => onRemove(itemId)}
      />
    </article>
  );
};
