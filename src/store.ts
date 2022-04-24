import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './types';

const initialState: State = {
  transactions: {},
  tasks: []
};

export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<State>>) => ({ ...state, ...action.payload }),
    // TODO: Write this reducer
    addTransactions: (state, action: PayloadAction<Partial<State>>) => {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          ...action.payload.transactions
        }
      }
    },
    removeTransactions: (state, action: PayloadAction<Partial<State>>) => {
      return {
        ...state,
        transactions: {}
      }
    },

    deleteTransaction:(state, action:PayloadAction<Partial<State>>) => {
      return {
        ...state,
        transactions: {
          ...action.payload.transactions
        }
      }
    }
  }
});

const store = configureStore({
  reducer,
  devTools: true
});

export default store;

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
