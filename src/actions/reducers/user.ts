import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserObj {
  shop_id: string,
  is_active: boolean,
  username: string | null,
  email: string,
  created_at: string | Date | null,
  role?: number | string | null,
}

interface UserState {
  user: UserObj | null,
  access_token: string | null,
  refresh_token: string | null,
}

const userState: UserState = {
  user: null,
  access_token: null,
  refresh_token: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateUser(state, action: PayloadAction<UserObj>) {
      state.user = action.payload;
    },
    login(state, action: PayloadAction<UserState>) {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('access_token', access_token || '');
      sessionStorage.setItem('refresh_token', refresh_token || '');
    },
    logout(state) {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      sessionStorage.clear();
    },
  },
})

export const { updateUser, logout, login } = userReducer.actions;
export default userReducer.reducer;