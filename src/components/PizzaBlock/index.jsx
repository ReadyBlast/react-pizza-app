import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const typeNames = ['Тонкое', 'Традиционное'];

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const cartItem = useSelector((state) =>
    state.cart.items.find((obj) => obj.id === id)
  );
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedItems = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIndex) => (
              <li
                key={typeIndex}
                onClick={() => setActiveType(typeIndex)}
                className={activeType === typeIndex ? 'active' : ''}
              >
                {typeNames[typeIndex]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((value, index) => (
              <li
                key={value}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? 'active' : ''}
              >
                {value} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <span>Добавить</span>
            {addedItems > 0 && <i>{addedItems}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
