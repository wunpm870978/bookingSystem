import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import API from 'services/API';

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
  access_token?: string | null,
  refresh_token?: string | null,
}

const userState: UserState = {
  user: null,
  access_token: null,
  refresh_token: null,
}

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await API.auth.logout();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const userReducer = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    updateUser(state, action: PayloadAction<UserObj>) {
      state.user = action.payload;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    login(state, action: PayloadAction<UserState>) {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('access_token', access_token || '');
      sessionStorage.setItem('refresh_token', refresh_token || '');
    },
    clearUser(state) {
      state.user = null;
      sessionStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      sessionStorage.clear();
    });
    builder.addCase(logout.rejected, (state) => {
      state.user = null;
      sessionStorage.clear();
    });
  },
})

export const { updateUser, login, clearUser } = userReducer.actions;
export default userReducer.reducer;