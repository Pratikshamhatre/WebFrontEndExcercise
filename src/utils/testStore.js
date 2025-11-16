import { configureStore } from "@reduxjs/toolkit";
import campaignsReducer from "../store/campaignsSlice";

export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      campaigns: campaignsReducer,
    },
    preloadedState,
  });
}
