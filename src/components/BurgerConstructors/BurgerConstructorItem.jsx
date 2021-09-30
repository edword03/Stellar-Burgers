import React from 'react';
import BurgerIngredientStyles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

export const BurgerConstructorItem = React.forwardRef((props, ref) => {
  const { children, type, typeItem, name, image, price, isLocked, onRemove, _id, move, index, itemId } =
    props;
  const itemRef = React.useRef(null);
  const [, dropRef] = useDrop({
    accept: type !== 'bun' ? 'ingredient' : '',
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
      
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();
     
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);
      item.index = hoverIndex
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
      style={{ opacity, }}>
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
});

BurgerConstructorItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  isLocked: PropTypes.bool,
  type: PropTypes.string,
  typeItem: PropTypes.string,
  children: PropTypes.node,
  onRemove: PropTypes.func,
  _id: PropTypes.string,
  move: PropTypes.func,
  index: PropTypes.number
};
