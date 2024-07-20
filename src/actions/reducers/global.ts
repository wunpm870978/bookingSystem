import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  lang: string
}

const globalState: GlobalState = {
  lang: 'en'
}

const globalReducer = createSlice({
  name: 'global',
  initialState: globalState,
  reducers: {
    updateLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
})

export const { updateLang } = globalReducer.actions;
export default globalReducer.reducer;