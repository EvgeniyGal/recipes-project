import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,

  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    updateCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories, updateCategories } = categoriesSlice.actions;
