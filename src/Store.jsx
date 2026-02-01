import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Features/Themes/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});