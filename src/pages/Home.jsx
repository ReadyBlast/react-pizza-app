import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://633c6b29f11701a65f75e6dc.mockapi.io/items?p=${currentPage}&l=4&${category}&sortBy=${sort.sortProperty}&order=${sort.order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sort, search, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => dispatch(setCategoryId(i))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onPageChange={(number) => dispatch(setCurrentPage(number))} />
    </div>
  );
};

export default Home;
