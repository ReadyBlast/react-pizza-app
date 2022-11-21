import React, { useRef } from 'react';
import { useEffect } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import {
  IFilterSliceState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { fetchItems, selectPizzas } from '../redux/slices/pizzasSlice';
import ErrorPage from '../components/ErrorPage';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { items, status } = useSelector(selectPizzas);
  const { categoryId, sort, order, currentPage, searchValue } =
    useSelector(selectFilter);
  const sortProperty = sort.sortProperty;

  const category = categoryId > 0 ? `&category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  const orderBy = `&order=${order}`;

  const onChangeCategory = useCallback(
    (i: number) => dispatch(setCategoryId(i)),
    [dispatch]
  );

  const onPageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = useCallback(async () => {
    dispatch(
      fetchItems({ category, currentPage, orderBy, search, sortProperty })
    );
  }, [dispatch, category, currentPage, orderBy, search, sortProperty]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, currentPage, order, sort, getPizzas]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty,
          categoryId,
          currentPage,
          order,
        },
        {
          addQueryPrefix: true,
        }
      );

      navigate(queryString);
    }

    isMounted.current = true;
  }, [categoryId, sortProperty, order, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      }) as unknown as { sortProperty: string } & IFilterSliceState;

      const sort = sortList.find((obj) => {
        return obj.sortProperty === params.sortProperty;
      });

      if (sort !== undefined) {
        dispatch(
          setFilters({
            ...params,
            sort,
          })
        );
      }

      isSearch.current = true;
    }
  }, [dispatch]);

  const pizzasArr = items.map((obj: any) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort order={order} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <ErrorPage />
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzasArr}
        </div>
      )}

      <Pagination currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
};

export default Home;
