import { createSlice } from '@reduxjs/toolkit';
import { isArray } from '../../../../common';

const initialState = {
  touches: {},
  errors: {},
};

const productFormErrorsSlice = createSlice({
  name: 'productFormErrors',
  initialState: initialState,
  reducers: {
    setTouch: (state, action) => {
      state.touches[action.payload] = true;
    },
    setTouches: (state, action) => {
      if (!isArray(action.payload)) { return; }

      for (const errorFieldName of action.payload) {
        state.touches[errorFieldName] = true;
      }
    },
    clearTouches: (state, action) => {
      state.touches = {};
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearErrors: (state, action) => {
      state.errors = {};
    },
    clear: (state, action) => {
      state.touches = {};
      state.errors = {};
    },
  },
});

export const productFormErrorsActions = productFormErrorsSlice.actions;
export const productFormErrorsReducerPath = productFormErrorsSlice.reducerPath;
export const productFormErrorsReducer = productFormErrorsSlice.reducer;
