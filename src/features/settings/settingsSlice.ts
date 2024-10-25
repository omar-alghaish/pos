// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface IApperance {
//   theme: "dark" | "light";
//   lightBrandColor: string;
//   darkBrandColor: string;
// }

// export interface ISettingsState {
//   apperance: IApperance;
// }

// const initialState: ISettingsState = {
//   apperance: {
//     theme: "dark",
//     lightBrandColor: "#ff0000",
//     darkBrandColor: "#00ff00",
//   },
// };

// export const settingsSlice = createSlice({
//   name: "settings",
//   initialState,

//   reducers: {
//     setApperance: (state, action: PayloadAction<IApperance>) => {
//       state.apperance = action.payload;
//     },
//   },
// });

// export const { setApperance } = settingsSlice.actions;

// export default settingsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IApperance {
  theme: "dark" | "light";
  lightBrandColor: string;
  darkBrandColor: string;
}

export interface ISettingsState {
  apperance: IApperance;
}

// Helper function to load settings from localStorage
const loadSettingsFromLocalStorage = (): IApperance => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  // Default settings if not found in localStorage
  return {
    theme: "light",
    lightBrandColor: "#87cefa",
    darkBrandColor: "#ff4500",
  };
};

// Helper function to save settings to localStorage
const saveSettingsToLocalStorage = (settings: IApperance) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const initialState: ISettingsState = {
  apperance: loadSettingsFromLocalStorage(),
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setApperance: (state, action: PayloadAction<IApperance>) => {
      state.apperance = action.payload;
      saveSettingsToLocalStorage(state.apperance); // Save all settings to localStorage
      document.body.className = state.apperance.theme; // Apply theme class to body
    },
    toggleTheme: (state) => {
      state.apperance.theme =
        state.apperance.theme === "light" ? "dark" : "light";
      saveSettingsToLocalStorage(state.apperance); // Save all settings to localStorage
      document.body.className = state.apperance.theme; // Apply theme class to body
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.apperance.theme = action.payload;
      saveSettingsToLocalStorage(state.apperance); // Save all settings to localStorage
      document.body.className = action.payload; // Apply theme class to body
    },
  },
});

export const { setApperance, toggleTheme, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
