import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFilter,
  setSort,
  setSortOrder,
  TSortType,
} from '../redux/slices/filterSlice';
import { useAppDispatch } from '../redux/store';

type SortProps = {
  order: string;
}

export const sortList: TSortType[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const Sort: React.FC<SortProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const { sort } = useSelector(selectFilter);

  const sortRef = useRef<HTMLDivElement>(null);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const popupOpenHadler = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[]
      };

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsPopupVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <button
          className={order === 'desc' ? 'active' : ''}
          onClick={() => dispatch(setSortOrder('desc'))}
        >
          ↓
        </button>
        <button
          className={order === 'asc' ? 'active' : ''}
          onClick={() => dispatch(setSortOrder('asc'))}
        >
          ↑
        </button>
        <b>Сортировка по:</b>
        <span onClick={popupOpenHadler}>{sort.name}</span>
      </div>
      {isPopupVisible && (
        <div className="sort__popup">
          <ul onClick={popupOpenHadler}>
            {sortList.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => dispatch(setSort(obj))}
                  className={
                    sort.sortProperty === obj.sortProperty ? 'active' : ''
                  }
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort
