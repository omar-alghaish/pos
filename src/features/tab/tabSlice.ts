// tabsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tab {
  id: string;
  title: string;
  component: React.ReactNode;
  path: string;
  data?: any; // Use this for saving tab-specific state
}

interface TabsState {
  openTabs: Tab[];
  activeTabId: string | null;
}

const initialState: TabsState = {
  openTabs: [],
  activeTabId: null,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    openTab(state, action: PayloadAction<Tab>) {
      const exists = state.openTabs.find((tab) => tab.path === action.payload.path);
      if (!exists) {
        state.openTabs.push(action.payload);
      }
      state.activeTabId = action.payload.id;
    },
    closeTab(state, action: PayloadAction<string>) {
      state.openTabs = state.openTabs.filter((tab) => tab.id !== action.payload);
      if (state.activeTabId === action.payload) {
        state.activeTabId = state.openTabs.length > 0 ? state.openTabs[0].id : null;
      }
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTabId = action.payload;
    },
    updateTabData(state, action: PayloadAction<{ id: string; data: any }>) {
      const tab = state.openTabs.find((tab) => tab.id === action.payload.id);
      if (tab) {
        tab.data = action.payload.data;
      }
    },
  },
});

export const { openTab, closeTab, setActiveTab, updateTabData } = tabsSlice.actions;
export default tabsSlice.reducer;
