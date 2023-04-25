import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { combineReducers } from 'redux'

export const store = configureStore({
  reducer: rootReducer,
})
