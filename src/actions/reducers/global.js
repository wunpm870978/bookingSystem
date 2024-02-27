import { createSlice } from '@reduxjs/toolkit';

const globalReducer = createSlice({
  name: 'global',
  initialState: {
    lang: 'en',
  },
  reducers: {
    updateLang(state, action) {
      console.log(action)
      state.lang = action.payload;
    },
  },
})

export const { updateLang } = globalReducer.actions;
export default globalReducer.reducer;