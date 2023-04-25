import { createSlice } from '@reduxjs/toolkit';
import initialState from './rootInitialState';

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    handleSaveUsername: (state, action) => {
      state.isSaveUsername = action.payload;
    },
    handleKeepLogin: (state, action) => {
      state.isKeepLogin = action.payload;
    },
    handleLogin: (state, action) => {
      state.user = action.payload
    },
    handleLogout: (state) => {
      state.user = {}
    },
    
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { handleSaveUsername, handleKeepLogin,handleLogin, handleLogout } = rootSlice.actions;


export default rootSlice.reducer;
