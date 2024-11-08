import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import orderSlice from "../features/order/orderSlice";
import modalSlice from "../features/modal/modalSlice";
import settingsSlice from "../features/settings/settingsSlice";
import tabsSlice from "../features/tab/tabSlice";

import globalLoadingSlice from "../features/globalLoading/globalLoadingSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    order: orderSlice,
    modal: modalSlice,
    settings: settingsSlice,
    globalLoading: globalLoadingSlice,
tabs: tabsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
