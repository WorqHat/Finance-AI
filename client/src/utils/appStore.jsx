import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import transactionSlice from "./transactionSlice";
import chatbotSlice from "./chatbotSlice";

const appStore = configureStore({
  reducer: {
    auth: authSlice,
    transaction: transactionSlice,
    chatbot: chatbotSlice,
  },
});

export default appStore;
