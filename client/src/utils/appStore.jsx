import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const appStore = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default appStore;
