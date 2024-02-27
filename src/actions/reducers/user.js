import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
  name: 'user',
  initialState: {
    user: {},
    role: null,
    access_token: null,
    refresh_token: null,
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
})

export const { updateUser } = userReducer.actions;
export default userReducer.reducer;