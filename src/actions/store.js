import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './reducers/global';
import userReducer from './reducers/user';

export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    global: globalReducer,
    user: userReducer
  }
})