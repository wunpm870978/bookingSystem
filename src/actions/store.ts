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

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']