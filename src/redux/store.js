// import { transactionsSlice } from "./transactionsSlice";
import transactionsReducer from './transactionsSlice';
import userSlice from './userSlice';
import goatReducer from './goatSlice';
import planReducer from './planSlice';
import billReducer from './billSlice';

import { configureStore } from "@reduxjs/toolkit";
import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices({
  transactions: transactionsReducer,
  users: userSlice,
  goats: goatReducer,
  plans: planReducer,
  bills: billReducer
});

export const store = configureStore({
  reducer: rootReducer,
});