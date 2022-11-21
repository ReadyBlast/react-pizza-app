import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type TPizzaDataType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

enum eStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: TPizzaDataType[];
  status: eStatus;
}

interface IAsyncThunkParams {
  category: string;
  currentPage: number;
  orderBy: string;
  search: string;
  sortProperty: string;
};

export const fetchItems = createAsyncThunk(
  'pizzas/fetchItemsStatus',
  async (params: IAsyncThunkParams) => {
    const { category, currentPage, orderBy, search, sortProperty } = params;
    const { data } = await axios.get<TPizzaDataType[]>(
      `https://633c6b29f11701a65f75e6dc.mockapi.io/items?p=${currentPage}&l=4${category}&sortBy=${sortProperty}${orderBy}${search}`
    );
    return data;
  }
);

const initialState: IPizzaSliceState = {
  items: [],
  status: eStatus.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaDataType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = eStatus.LOADING;
      state.items = [];
    });

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = eStatus.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(fetchItems.rejected, (state) => {
      state.status = eStatus.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
