import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IModalState {
  activeModal?: string;
  activePage?: string;
}

const initialState: IModalState = {
  activeModal: "",
  activePage: "home",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    setActiveModal: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActiveModal, setActivePage } = modalSlice.actions;

export default modalSlice.reducer;
