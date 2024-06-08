import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    // user: {
    //   email: 'asd',
    //   name: 'mlw'
    // },
    user: {},
    role: null,
    access_token: null,
    refresh_token: null,
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = {};
    },
  },
})

export const { updateUser, logout } = userReducer.actions;
export default userReducer.reducer;