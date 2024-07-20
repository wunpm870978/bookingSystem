import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: object,
  role?: number | null,
  access_token?: string | null,
  refresh_token?: string | null,
}

const userState: UserState = {
  user: {},
  // role: null,
  // access_token: null,
  // refresh_token: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateUser(state, action: PayloadAction<object>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = {};
      state.role = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
})

export const { updateUser, logout } = userReducer.actions;
export default userReducer.reducer;