import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IGlobalLoading {
 globalLoadingStatus:boolean;
}

const initialState: IGlobalLoading = {
  globalLoadingStatus:false
};

export const globalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState,

  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoadingStatus = action.payload;
    },

  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
