import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TSortType = {
  name: string;
  sortProperty: string;
}

export interface IFilterSliceState {
  searchValue?: string;
  categoryId: number;
  sort: TSortType;
  order: string;
  currentPage: number;
};

const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  order: 'desc',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSortType>) {
      state.sort = action.payload;
    },
    setSortOrder(state, action: PayloadAction<string>) {
      state.order = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.sort = action.payload.sort;
      state.order = action.payload.order;
      state.currentPage = action.payload.currentPage;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setSearchValue,
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSortOrder,
} = filterSlice.actions;

export default filterSlice.reducer;
